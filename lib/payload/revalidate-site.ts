import { revalidatePath, revalidateTag } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";
import { CACHE_TAGS } from "@/lib/payload/cache-tags";

// First the cached data expires (unstable_cache in services/) and then the
// route. `{ expire: 0 }` is the way to expire instantly from a route handler
// — these hooks run inside Payload's API —; with "max" the editor would see
// the old version once more after saving.
//
// The same hooks run when the seed (scripts/seed-cms.mts) writes through the
// local API, outside of Next: there is no cache to expire there and Next
// throws, so the failure is swallowed on purpose.
function expire(tag: string): void {
  try {
    revalidateTag(tag, { expire: 0 });
    revalidatePath("/");
  } catch {
    // Outside a Next request (scripts): nothing cached, nothing to do.
  }
}

/** For the Globals: the section texts and the site settings. */
export const revalidateSiteGlobals: GlobalAfterChangeHook = () => {
  expire(CACHE_TAGS.site);
};

/** For the `members`, `events` and `tracks` collections, on save and on delete. */
export const revalidateCatalog: CollectionAfterChangeHook = () => {
  expire(CACHE_TAGS.catalog);
};

export const revalidateCatalogAfterDelete: CollectionAfterDeleteHook = () => {
  expire(CACHE_TAGS.catalog);
};
