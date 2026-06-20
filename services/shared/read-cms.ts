import { unstable_cache } from "next/cache";
import { cache } from "react";
import { CACHE_TAGS } from "@/lib/payload/cache-tags";
import { getPayload } from "@/lib/payload/get-payload";

// The page is one logical document spread across six Globals and three
// collections. Every section calls its own service, but the underlying reads
// are deduplicated per request with React's cache() and kept BETWEEN requests
// by `unstable_cache`: the page is static and revalidated daily, and the
// Payload hooks (lib/payload/revalidate-site.ts) expire the tags on save, so
// an edit in the CMS is visible on the next visit.
const CACHE_REVALIDATE_SECONDS = 3600;

const readGlobals = unstable_cache(
  async () => {
    const payload = await getPayload();
    const [hero, about, repertoireSection, contactSection, siteSettings] = await Promise.all([
      payload.findGlobal({ slug: "hero" }),
      payload.findGlobal({ slug: "about" }),
      payload.findGlobal({ slug: "repertoire-section" }),
      payload.findGlobal({ slug: "contact-section" }),
      payload.findGlobal({ slug: "site-settings" }),
    ]);
    return { hero, about, repertoireSection, contactSection, siteSettings };
  },
  ["site-globals"],
  { tags: [CACHE_TAGS.site], revalidate: CACHE_REVALIDATE_SECONDS },
);

const readCatalog = unstable_cache(
  async () => {
    const payload = await getPayload();
    const [members, events, tracks, categories] = await Promise.all([
      payload.find({ collection: "members", sort: "order", limit: 20, pagination: false }),
      payload.find({ collection: "events", sort: "date", limit: 50, pagination: false }),
      payload.find({ collection: "tracks", sort: "order", limit: 100, pagination: false }),
      payload.find({ collection: "categories", sort: "order", limit: 10, pagination: false }),
    ]);
    return { members: members.docs, events: events.docs, tracks: tracks.docs, categories: categories.docs };
  },
  // "v2": the shape gained `categories`; a Data Cache entry written by the
  // previous deployment must not be served to the new code.
  ["site-catalog", "v2"],
  { tags: [CACHE_TAGS.catalog], revalidate: CACHE_REVALIDATE_SECONDS },
);

export const getGlobals = cache(readGlobals);
export const getCatalog = cache(readCatalog);
