import "./load-env.mts";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Payload } from "payload";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ABOUT_DEFAULTS } from "@/constants/about.const";
import { CONTACT_SECTION_DEFAULTS } from "@/constants/contact.const";
import { UPCOMING_EVENTS } from "@/constants/events.const";
import { HERO_DEFAULTS } from "@/constants/hero.const";
import { MEMBERS, MEMBERS_SECTION_DEFAULTS } from "@/constants/members.const";
import { REPERTOIRE_SECTION_DEFAULTS, TRACKS } from "@/constants/repertoire.const";
import { CONTACT_EMAIL, PHOTO_CREDIT, SITE_LOCATION, SITE_LOCATION_FULL, SITE_TAGLINE } from "@/constants/site.const";

// Loads the CMS with the site's launch content (`npm run cms:seed`): the
// photos from public/images as Media, the four musicians, the two dates, the
// four works and every Global's texts. Idempotent on the collections: a row
// that already exists (same name/title) is left alone, so re-running never
// duplicates; the Globals are always rewritten because they are the seed's
// source of truth until an editor changes them in /admin.
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
        short: member.short,
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
      },
    });
    console.log(`event    ${event.title}`);
  }
}

async function seedTracks(payload: Payload) {
  for (const [index, track] of TRACKS.entries()) {
    const existing = await payload.find({ collection: "tracks", where: { title: { equals: track.title } }, limit: 1 });
    if (existing.docs.length > 0) continue;
    await payload.create({
      collection: "tracks",
      data: {
        order: index + 1,
        title: track.title,
        composer: track.composer,
        category: track.category,
        durationSeconds: track.durationSeconds,
      },
    });
    console.log(`track    ${track.title}`);
  }
}

async function seedGlobals(payload: Payload) {
  const heroImage = await uploadImage(payload, HERO_DEFAULTS.image.src, HERO_DEFAULTS.image.alt);
  await payload.updateGlobal({
    slug: "hero",
    data: {
      title: HERO_DEFAULTS.title,
      lead: HERO_DEFAULTS.lead,
      image: heroImage,
      imagePosition: HERO_DEFAULTS.image.position,
      listenLabel: HERO_DEFAULTS.listenLabel,
    },
  });

  const aboutPhoto = await uploadImage(payload, ABOUT_DEFAULTS.photo.src, ABOUT_DEFAULTS.photo.alt);
  await payload.updateGlobal({
    slug: "about",
    data: {
      eyebrow: ABOUT_DEFAULTS.eyebrow,
      title: ABOUT_DEFAULTS.title,
      lead: ABOUT_DEFAULTS.lead,
      pillars: ABOUT_DEFAULTS.pillars.map((pillar) => ({ title: pillar.title, text: pillar.text })),
      photo: aboutPhoto,
      photoCaption: ABOUT_DEFAULTS.photoCaption,
    },
  });

  await payload.updateGlobal({ slug: "members-section", data: { ...MEMBERS_SECTION_DEFAULTS } });
  await payload.updateGlobal({
    slug: "repertoire-section",
    data: {
      title: REPERTOIRE_SECTION_DEFAULTS.title,
      note: REPERTOIRE_SECTION_DEFAULTS.note,
      playerNote: REPERTOIRE_SECTION_DEFAULTS.playerNote,
      emptyState: { ...REPERTOIRE_SECTION_DEFAULTS.emptyState },
    },
  });
  await payload.updateGlobal({ slug: "contact-section", data: { ...CONTACT_SECTION_DEFAULTS } });
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
  console.log("globals  hero, about, members-section, repertoire-section, contact-section, site-settings");
}

async function main() {
  const payload = await getPayload({ config: await configPromise });
  await seedMembers(payload);
  await seedEvents(payload);
  await seedTracks(payload);
  await seedGlobals(payload);
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
