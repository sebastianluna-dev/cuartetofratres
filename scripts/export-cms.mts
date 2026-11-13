import "./load-env.mts";
import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { GLOBAL_SLUGS, toBundleDoc, type CmsBundle } from "@/lib/cms-bundle";

// Exports the LOCAL CMS (the one in .env.local) to cms-export/: content.json
// with every Global, category, work, recording, musician and date, the uploads
// referenced by file name, and a copy of each referenced file in
// cms-export/files/. scripts/sync-cms.mts then writes that bundle into another
// database (production). Refuses to run against anything but localhost.
//
//   npm run cms:export

const OUT_DIR = path.resolve(process.cwd(), "cms-export");
const FILES_DIR = path.join(OUT_DIR, "files");

const uri = process.env.DATABASE_URI ?? "";
const host = (() => {
  try {
    return new URL(uri).hostname;
  } catch {
    return "";
  }
})();
if (host !== "localhost" && host !== "127.0.0.1") {
  console.error(`cms:export only reads the local database; DATABASE_URI points at «${host || "nothing"}».`);
  process.exit(1);
}

const payload = await getPayload({ config: configPromise });

const files = new Map<string, string>();
const remember = (collection: "media" | "audio", filename: string) => {
  const dir = collection === "media" ? "media" : "audio";
  files.set(filename, path.resolve(process.cwd(), dir, filename));
};

type Doc = Record<string, unknown> & { filename?: string };
const all = async (collection: "categories" | "audio" | "tracks" | "members" | "events" | "media") =>
  (await payload.find({ collection, depth: 1, limit: 500, pagination: false, sort: "id" })).docs as unknown as Doc[];

const media = await all("media");
const audio = await all("audio");
const bundle: CmsBundle = {
  exportedAt: new Date().toISOString(),
  media: media.map((doc) => {
    remember("media", doc.filename as string);
    return { filename: doc.filename as string, alt: (doc as { alt?: string }).alt ?? "" };
  }),
  audio: audio.map((doc) => {
    remember("audio", doc.filename as string);
    return {
      filename: doc.filename as string,
      title: (doc as { title?: string }).title ?? "",
      performer: (doc as { performer?: string | null }).performer ?? null,
    };
  }),
  categories: (await all("categories")).map((doc) => toBundleDoc(doc)),
  tracks: (await all("tracks")).map((doc) => toBundleDoc(doc)),
  members: (await all("members")).map((doc) => toBundleDoc(doc)),
  events: (await all("events")).map((doc) => toBundleDoc(doc)),
  globals: {},
};
for (const slug of GLOBAL_SLUGS) {
  bundle.globals[slug] = toBundleDoc(await payload.findGlobal({ slug, depth: 1 }));
}

await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(FILES_DIR, { recursive: true });
for (const [filename, source] of files) await copyFile(source, path.join(FILES_DIR, filename));
await writeFile(path.join(OUT_DIR, "content.json"), `${JSON.stringify(bundle, null, 2)}\n`);

console.log(
  `Exported to cms-export/: ${bundle.media.length} images, ${bundle.audio.length} recordings, ` +
    `${bundle.categories.length} categories, ${bundle.tracks.length} works, ${bundle.members.length} musicians, ` +
    `${bundle.events.length} dates and ${GLOBAL_SLUGS.length} Globals.`,
);
process.exit(0);
