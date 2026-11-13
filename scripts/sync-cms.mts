import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseEnv } from "node:util";
import { GLOBAL_SLUGS, resolveRefs, sameContent, type CmsBundle, type Ref } from "@/lib/cms-bundle";

// Writes cms-export/ (made by `npm run cms:export` from the local CMS) into
// the database named in .env.prod-sync — production — so its content matches
// the local one. Matches rows by a stable key, never by id: images and
// recordings by file name, categories by label, works and dates by title,
// musicians by desk order. Uploads missing on the other side are uploaded
// (to Vercel Blob when its token is set). Before writing, every collection
// and Global it touches is saved to cms-export/backup-<time>.json.
//
// Only reads .env.prod-sync, never .env.local, and refuses localhost, so it
// cannot be pointed at the local database by mistake. Make that file with
//   npx vercel env pull .env.prod-sync --environment=production
// (a name Next does not load on its own), then:
//   npm run cms:sync -- --dry-run     lists what would change, writes nothing
//   npm run cms:sync                  applies it
// and delete .env.prod-sync afterwards.

const DRY_RUN = process.argv.includes("--dry-run");
const ROOT = process.cwd();
const EXPORT_DIR = path.join(ROOT, "cms-export");
const FILES_DIR = path.join(EXPORT_DIR, "files");

// --- The target's environment, from .env.prod-sync only. --------------------
const envText = await readFile(path.join(ROOT, ".env.prod-sync"), "utf8").catch(() => null);
if (envText === null) {
  console.error("Missing .env.prod-sync. Run: npx vercel env pull .env.prod-sync --environment=production");
  process.exit(1);
}
const env = parseEnv(envText);
const databaseUri =
  env.DATABASE_URI ||
  env.CUARTETO_FRATRES_DATABASE_POSTGRES_URL ||
  Object.entries(env).find(([key, value]) => key.endsWith("_POSTGRES_URL") && value)?.[1] ||
  env.POSTGRES_URL ||
  env.DATABASE_URL;
if (!databaseUri) {
  console.error("No database URL in .env.prod-sync (DATABASE_URI or *_POSTGRES_URL).");
  process.exit(1);
}
const host = new URL(databaseUri).hostname;
// CMS_SYNC_REHEARSAL=1 in the file allows a local database and no Blob token:
// only for rehearsing the sync against a throwaway copy, never in production.
const rehearsal = env.CMS_SYNC_REHEARSAL === "1";
if (!rehearsal && (host === "localhost" || host === "127.0.0.1")) {
  console.error("cms:sync writes into production; .env.prod-sync points at localhost.");
  process.exit(1);
}
if (!rehearsal && !env.BLOB_READ_WRITE_TOKEN) {
  console.error("No BLOB_READ_WRITE_TOKEN in .env.prod-sync: the images and recordings would not reach Vercel Blob.");
  process.exit(1);
}
// Set before payload.config.ts is evaluated: it reads process.env on import.
process.env.DATABASE_URI = databaseUri;
if (env.BLOB_READ_WRITE_TOKEN) process.env.BLOB_READ_WRITE_TOKEN = env.BLOB_READ_WRITE_TOKEN;
else delete process.env.BLOB_READ_WRITE_TOKEN;
process.env.PAYLOAD_SECRET = env.PAYLOAD_SECRET || process.env.PAYLOAD_SECRET || "sync-only";
delete process.env.CUARTETO_FRATRES_DATABASE_POSTGRES_URL;

const { getPayload } = await import("payload");
const { default: configPromise } = await import("@payload-config");
const payload = await getPayload({ config: configPromise });

const bundle = JSON.parse(await readFile(path.join(EXPORT_DIR, "content.json"), "utf8")) as CmsBundle;
console.log(`${DRY_RUN ? "[dry run] " : ""}Syncing the export of ${bundle.exportedAt} into ${host}\n`);

type Collection = "media" | "audio" | "categories" | "tracks" | "members" | "events";
const all = async (collection: Collection) =>
  (await payload.find({ collection, depth: 0, limit: 1000, pagination: false })).docs as unknown as Record<
    string,
    unknown
  >[];

// --- Backup of what is about to change. -------------------------------------
if (!DRY_RUN) {
  const backup: Record<string, unknown> = { takenAt: new Date().toISOString(), host };
  for (const collection of ["media", "audio", "categories", "tracks", "members", "events"] as const) {
    backup[collection] = await all(collection);
  }
  for (const slug of GLOBAL_SLUGS) backup[slug] = await payload.findGlobal({ slug, depth: 0 });
  const file = path.join(EXPORT_DIR, `backup-${backup.takenAt as string}.json`.replaceAll(":", "-"));
  await writeFile(file, `${JSON.stringify(backup, null, 2)}\n`);
  console.log(`Backup of production saved to ${path.relative(ROOT, file)}\n`);
}

const report: string[] = [];
const note = (line: string) => {
  report.push(line);
  console.log(line);
};

// --- Uploads, by file name. --------------------------------------------------
const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg",
};
const ids = { media: new Map<string, number>(), audio: new Map<string, number>(), category: new Map<string, number>() };

async function syncUploads(collection: "media" | "audio", items: { filename: string }[], data: (i: number) => object) {
  const existing = new Map((await all(collection)).map((doc) => [doc.filename as string, doc.id as number]));
  for (const [index, item] of items.entries()) {
    const found = existing.get(item.filename);
    if (found) {
      ids[collection].set(item.filename, found);
      continue;
    }
    note(`+ ${collection}: upload ${item.filename}`);
    if (DRY_RUN) {
      ids[collection].set(item.filename, -1);
      continue;
    }
    const file = await readFile(path.join(FILES_DIR, item.filename));
    const created = await payload.create({
      collection,
      data: data(index) as never,
      overwriteExistingFiles: true,
      file: {
        data: file,
        name: item.filename,
        mimetype: MIME[path.extname(item.filename).toLowerCase()] ?? "application/octet-stream",
        size: file.byteLength,
      },
    });
    ids[collection].set(item.filename, created.id as number);
  }
}

await syncUploads("media", bundle.media, (i) => ({ alt: bundle.media[i]!.alt }));
await syncUploads("audio", bundle.audio, (i) => ({
  title: bundle.audio[i]!.title,
  performer: bundle.audio[i]!.performer,
}));

const lookup = (ref: Ref): number | null => {
  if ("$media" in ref) return ids.media.get(ref.$media) ?? null;
  if ("$audio" in ref) return ids.audio.get(ref.$audio) ?? null;
  return ids.category.get(ref.$category) ?? null;
};

// --- Rows, by a stable key. --------------------------------------------------
async function syncRows(
  collection: Exclude<Collection, "media" | "audio">,
  rows: Record<string, unknown>[],
  key: string,
) {
  const existing = await all(collection);
  for (const row of rows) {
    const data = resolveRefs(row, lookup) as Record<string, unknown>;
    const target = existing.find((doc) => doc[key] === row[key]);
    const label = `${collection} «${String(row[key])}»`;
    if (!target) {
      note(`+ ${label}: create`);
      if (!DRY_RUN) {
        const created = await payload.create({ collection, data: data as never });
        if (collection === "categories") ids.category.set(row.label as string, created.id as number);
      } else if (collection === "categories") ids.category.set(row.label as string, -1);
      continue;
    }
    if (collection === "categories") ids.category.set(row.label as string, target.id as number);
    const changed = Object.keys(data).filter((field) => !sameContent(data[field], target[field]));
    if (changed.length === 0) continue;
    note(`~ ${label}: ${changed.join(", ")}`);
    if (!DRY_RUN) await payload.update({ collection, id: target.id as number, data: data as never });
  }
}

await syncRows("categories", bundle.categories, "label");
await syncRows("tracks", bundle.tracks, "title");
await syncRows("members", bundle.members, "order");
await syncRows("events", bundle.events, "title");

// --- Globals. ----------------------------------------------------------------
for (const slug of GLOBAL_SLUGS) {
  const source = bundle.globals[slug];
  if (!source) continue;
  const data = resolveRefs(source, lookup) as Record<string, unknown>;
  const target = (await payload.findGlobal({ slug, depth: 0 })) as unknown as Record<string, unknown>;
  const changed = Object.keys(data).filter((field) => !sameContent(data[field], target[field]));
  if (changed.length === 0) continue;
  note(`~ global ${slug}: ${changed.join(", ")}`);
  if (!DRY_RUN) await payload.updateGlobal({ slug, data: data as never });
}

console.log(
  report.length === 0
    ? "\nNothing to change: production already matches the export."
    : `\n${report.length} change(s) ${DRY_RUN ? "would be made (dry run: nothing was written)" : "made"}.`,
);
process.exit(0);
