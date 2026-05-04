import type { RepertoireCategory, Track } from "@/constants/repertoire.const";

/** `null` is the "Todo" filter and returns every track. */
export function filterRepertoire(tracks: readonly Track[], category: RepertoireCategory | null): Track[] {
  if (category === null) return [...tracks];
  return tracks.filter((track) => track.category === category);
}
