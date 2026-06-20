import "./load-env.mts";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { GlobalSlug, Payload } from "payload";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ABOUT_DEFAULTS } from "@/constants/about.const";
import { CONTACT_SECTION_DEFAULTS } from "@/constants/contact.const";
import { UPCOMING_EVENTS } from "@/constants/events.const";
import { HERO_DEFAULTS } from "@/constants/hero.const";
import { MEMBERS } from "@/constants/members.const";
import { CATEGORIES, REPERTOIRE_SECTION_DEFAULTS, TRACKS } from "@/constants/repertoire.const";
import { CONTACT_EMAIL, PHOTO_CREDIT, SITE_LOCATION, SITE_LOCATION_FULL, SITE_TAGLINE } from "@/constants/site.const";

// Loads the CMS with the site's launch content (`npm run cms:seed`): the
// photos from public/images as Media, the four musicians, the two dates, the
// four works and every Global's texts. Idempotent: a row that already exists
// (same name/title) is left alone and a Global is only written while it is
// still empty, so re-running never duplicates and never overwrites what an
// editor changed in /admin.
//
// Run through scripts/alias-loader.mjs:
//   node --import ./scripts/alias-loader.mjs scripts/seed-cms.mts

const IMAGES_DIR = path.resolve(process.cwd(), "public/images");
const MIME_BY_EXT: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png" };

async function uploadImage(payload: Payload, src: string, alt: string): Promise<number> {
  const filename = path.basename(src);
  const existing = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1 });
  const found = existing.docs[0];
  if (found) return found.id;

  const data = await readFile(path.join(IMAGES_DIR, filename));
  const created = await payload.create({
    collection: "media",
    data: { alt },
    // Payload renames an upload whose name is already on the local disk, even
    // when it goes to Vercel Blob: seeding production from a machine with its
    // own media/ would store "hero-1.jpg". The lookup above already rules out
    // a real duplicate.
    overwriteExistingFiles: true,
    file: {
      data,
      name: filename,
      mimetype: MIME_BY_EXT[path.extname(filename)] ?? "application/octet-stream",
      size: data.byteLength,
    },
  });
  console.log(`media    ${filename}`);
  return created.id;
}

async function seedMembers(payload: Payload) {
  for (const [index, member] of MEMBERS.entries()) {
    const existing = await payload.find({ collection: "members", where: { name: { equals: member.name } }, limit: 1 });
    if (existing.docs.length > 0) continue;
    const photo = await uploadImage(payload, member.photo.src, member.photo.alt);
    await payload.create({
      collection: "members",
      data: {
        order: index + 1,
        name: member.name,
        instrument: member.instrument,
        shortName: member.shortName,
        bio: member.bio,
        photo,
        photoPosition: member.photo.position,
      },
    });
    console.log(`member   ${member.name}`);
  }
}

async function seedEvents(payload: Payload) {
  for (const event of UPCOMING_EVENTS) {
    const existing = await payload.find({ collection: "events", where: { title: { equals: event.title } }, limit: 1 });
    if (existing.docs.length > 0) continue;
    const image = await uploadImage(payload, event.image.src, event.image.alt);
    await payload.create({
      collection: "events",
      data: {
        title: event.title,
        date: `${event.date}T12:00:00.000Z`,
        time: event.time,
        city: event.city,
        image,
        imagePosition: event.image.position,
        description: event.description,
        program: event.program?.map((item) => ({ title: item.title, composer: item.composer })),
        venue: event.venue,
        tickets: event.tickets,
      },
    });
    console.log(`event    ${event.title}`);
  }
}

/** Seed id → CMS id, so the tracks can point at their category. */
async function seedCategories(payload: Payload): Promise<Map<string, number>> {
  const ids = new Map<string, number>();
  for (const [index, category] of CATEGORIES.entries()) {
    const existing = await payload.find({
      collection: "categories",
      where: { label: { equals: category.label } },
      limit: 1,
    });
    const found = existing.docs[0];
    if (found) {
      ids.set(category.id, found.id);
      continue;
    }
    const created = await payload.create({
      collection: "categories",
      data: { order: index + 1, label: category.label, shortLabel: category.shortLabel },
    });
    ids.set(category.id, created.id);
    console.log(`category ${category.label}`);
  }
  return ids;
}

async function seedTracks(payload: Payload, categoryIds: Map<string, number>) {
  for (const [index, track] of TRACKS.entries()) {
    const existing = await payload.find({ collection: "tracks", where: { title: { equals: track.title } }, limit: 1 });
    if (existing.docs.length > 0) continue;
    const category = categoryIds.get(track.categoryId);
    if (!category) throw new Error(`La obra «${track.title}» apunta a una categoría desconocida: ${track.categoryId}`);
    await payload.create({
      collection: "tracks",
      data: {
        order: index + 1,
        title: track.title,
        composer: track.composer,
        category,
        durationSeconds: track.durationSeconds,
      },
    });
    console.log(`track    ${track.title}`);
  }
}

// A Global that nobody has saved comes back with its required fields empty;
// `field` is one without a default value (dotted for a field inside a group),
// so it tells "never saved" apart.
async function isEmptyGlobal(payload: Payload, slug: GlobalSlug, field: string): Promise<boolean> {
  const global = (await payload.findGlobal({ slug })) as unknown as Record<string, unknown>;
  const value = field
    .split(".")
    .reduce<unknown>((current, key) => (current as Record<string, unknown> | undefined)?.[key], global);
  return !value;
}

async function seedGlobals(payload: Payload) {
  const written: string[] = [];

  if (await isEmptyGlobal(payload, "hero", "title")) {
    const image = await uploadImage(payload, HERO_DEFAULTS.image.src, HERO_DEFAULTS.image.alt);
    await payload.updateGlobal({
      slug: "hero",
      data: {
        title: HERO_DEFAULTS.title,
        lead: HERO_DEFAULTS.lead,
        image,
        imagePosition: HERO_DEFAULTS.image.position,
        listenLabel: HERO_DEFAULTS.listenLabel,
        eventsHeading: HERO_DEFAULTS.eventsHeading,
      },
    });
    written.push("hero");
  }

  if (await isEmptyGlobal(payload, "about", "title")) {
    const photo = await uploadImage(payload, ABOUT_DEFAULTS.photo.src, ABOUT_DEFAULTS.photo.alt);
    await payload.updateGlobal({
      slug: "about",
      data: {
        title: ABOUT_DEFAULTS.title,
        lead: ABOUT_DEFAULTS.lead,
        photo,
      },
    });
    written.push("about");
  }

  if (await isEmptyGlobal(payload, "repertoire-section", "emptyState.text")) {
    await payload.updateGlobal({
      slug: "repertoire-section",
      data: {
        title: REPERTOIRE_SECTION_DEFAULTS.title,
        emptyState: { ...REPERTOIRE_SECTION_DEFAULTS.emptyState },
      },
    });
    written.push("repertoire-section");
  }

  if (await isEmptyGlobal(payload, "contact-section", "title")) {
    await payload.updateGlobal({ slug: "contact-section", data: { ...CONTACT_SECTION_DEFAULTS } });
    written.push("contact-section");
  }

  if (await isEmptyGlobal(payload, "site-settings", "email")) {
    await payload.updateGlobal({
      slug: "site-settings",
      data: {
        tagline: SITE_TAGLINE,
        email: CONTACT_EMAIL,
        location: SITE_LOCATION,
        locationFull: SITE_LOCATION_FULL,
        photoCredit: PHOTO_CREDIT,
      },
    });
    written.push("site-settings");
  }

  console.log(`globals  ${written.length > 0 ? written.join(", ") : "(ya tenían contenido)"}`);
}

async function main() {
  const payload = await getPayload({ config: await configPromise });
  await seedMembers(payload);
  await seedEvents(payload);
  await seedTracks(payload, await seedCategories(payload));
  await seedGlobals(payload);
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
