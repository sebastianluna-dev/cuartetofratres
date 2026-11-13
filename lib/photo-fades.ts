import type { PhotoFades } from "@/constants/member-photos.const";

/**
 * The fades of a cut-out as the custom properties its frame's mask reads
 * (`--fade-left`, `--fade-right`, `--fade-bottom`, in percent). An edge the
 * photo does not cut gets 0%: no fade.
 */
export function photoFadeStyle(fades: PhotoFades): Record<string, string> {
  return {
    "--fade-left": `${fades.left ?? 0}%`,
    "--fade-right": `${fades.right ?? 0}%`,
    "--fade-bottom": `${fades.bottom ?? 0}%`,
  };
}
