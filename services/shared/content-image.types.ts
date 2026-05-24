/** An image ready for `next/image`: a Media upload from the CMS or a file under public/. */
export interface ContentImage {
  src: string;
  alt: string;
  /** Intrinsic size when known (CMS uploads carry it; the fallback files do not need it: they are rendered with `fill`). */
  width?: number;
  height?: number;
}
