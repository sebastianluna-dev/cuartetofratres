import type { RepertoireCategory } from "@/constants/repertoire.const";

interface Categorised {
  category: RepertoireCategory;
}

/** `null` is the "Todo" filter and returns every track. */
export function filterRepertoire<T extends Categorised>(
  tracks: readonly T[],
  category: RepertoireCategory | null,
): T[] {
  if (category === null) return [...tracks];
  return tracks.filter((track) => track.category === category);
}
