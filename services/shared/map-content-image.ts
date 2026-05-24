import type { Media } from "@/payload-types";
import type { ContentImage } from "./content-image.types";

/**
 * An `upload` field arrives as the populated Media document (depth ≥ 1) or as
 * its id (depth 0, or a relation that no longer exists). Only a document with
 * a URL is usable; anything else is `null` and the caller decides its fallback.
 */
export function mapContentImage(value: number | Media | null | undefined): ContentImage | null {
  if (!value || typeof value === "number" || !value.url) return null;
  return {
    src: value.url,
    alt: value.alt,
    width: value.width ?? undefined,
    height: value.height ?? undefined,
  };
}
