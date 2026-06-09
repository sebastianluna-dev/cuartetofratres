interface Categorised {
  /** `null` when the track's category was deleted: it only shows under "Todo". */
  categoryId: string | null;
}

/** `null` is the "Todo" filter and returns every track. */
export function filterRepertoire<T extends Categorised>(tracks: readonly T[], categoryId: string | null): T[] {
  if (categoryId === null) return [...tracks];
  return tracks.filter((track) => track.categoryId === categoryId);
}
