// The shape of cms-export/content.json and the helpers both ends share
// scripts/export-cms.mts writes it from the local CMS, scripts/sync-cms.mts
// writes it into another one. Uploads and relations travel as references
// (`{ $media: "file.webp" }`, `{ $audio: "file.mp3" }`, `{ $category: "Bodas" }`),
// never as ids: the ids differ from one database to the other.

export const GLOBAL_SLUGS = ["about", "hero", "contact-section", "repertoire-section", "site-settings"] as const;
export type GlobalKey = (typeof GLOBAL_SLUGS)[number];

export interface CmsBundle {
  exportedAt: string;
  media: { filename: string; alt: string }[];
  audio: { filename: string; title: string; performer: string | null }[];
  categories: Record<string, unknown>[];
  tracks: Record<string, unknown>[];
  members: Record<string, unknown>[];
  events: Record<string, unknown>[];
  globals: Partial<Record<GlobalKey, Record<string, unknown>>>;
}

export type Ref = { $media: string } | { $audio: string } | { $category: string };

// Bookkeeping Payload adds to every document, which never travels.
const SKIP = new Set(["id", "createdAt", "updatedAt", "globalType", "_status", "sizes", "url", "thumbnailURL"]);

/** A document as it travels: no ids or timestamps, uploads and relations as references. */
export function toBundleDoc(doc: object): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, inner] of Object.entries(doc)) {
    if (SKIP.has(key)) continue;
    out[key] = toBundleValue(inner);
  }
  return out;
}

function toBundleValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(toBundleValue);
  if (value === null || typeof value !== "object") return value;
  const doc = value as Record<string, unknown>;
  if (typeof doc.filename === "string" && typeof doc.mimeType === "string") {
    return doc.mimeType.startsWith("audio/") ? { $audio: doc.filename } : { $media: doc.filename };
  }
  // A category, reached through a work's relation.
  if (typeof doc.label === "string" && "shortLabel" in doc && "order" in doc && "id" in doc) {
    return { $category: doc.label };
  }
  const out: Record<string, unknown> = {};
  for (const [key, inner] of Object.entries(doc)) {
    if (SKIP.has(key)) continue;
    out[key] = toBundleValue(inner);
  }
  return out;
}

/** Turns the references back into the target database's ids. */
export function resolveRefs(value: unknown, lookup: (ref: Ref) => number | null): unknown {
  if (Array.isArray(value)) return value.map((inner) => resolveRefs(inner, lookup));
  if (value === null || typeof value !== "object") return value;
  const doc = value as Record<string, unknown>;
  if ("$media" in doc || "$audio" in doc || "$category" in doc) return lookup(doc as Ref);
  const out: Record<string, unknown> = {};
  for (const [key, inner] of Object.entries(doc)) {
    // Array rows keep no id of their own: the target creates fresh ones.
    if (key === "id") continue;
    out[key] = resolveRefs(inner, lookup);
  }
  return out;
}

/** Compares two plain values, ignoring ids, timestamps and key order. */
export function sameContent(a: unknown, b: unknown): boolean {
  return stable(a) === stable(b);
}

function stable(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (value === null || typeof value !== "object") return JSON.stringify(value ?? null);
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([key, inner]) => !SKIP.has(key) && inner !== undefined)
    .sort(([x], [y]) => x.localeCompare(y));
  return `{${entries.map(([key, inner]) => `${JSON.stringify(key)}:${stable(inner)}`).join(",")}}`;
}
