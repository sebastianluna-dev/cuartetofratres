// Next Data Cache tags for what is read from the CMS.
//
// The services set them when caching with `unstable_cache` and the Globals'
// and collections' hooks expire them on save in Payload, so a change in the
// CMS is seen on the next visit without waiting for any deadline.
// Without "server-only": they are imported by Payload's hooks, which run inside
// its API and not inside a React render.

export const CACHE_TAGS = {
  /** Every Global of the page (hero, about, members, repertoire, contact) and the site settings. */
  site: "site-globals",
  /** The `members`, `events` and `tracks` collections. */
  catalog: "site-catalog",
} as const;
