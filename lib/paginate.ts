/** How many pages `total` items fill, `size` to a page; at least one, even when empty. */
export function pageCount(total: number, size: number): number {
  if (size <= 0) return 1;
  return Math.max(1, Math.ceil(total / size));
}

/**
 * The items of page `page` (0-based), `size` to a page. A page past the end
 * gives the last one and a negative page the first, so a list that shrank
 * under the visitor never shows an empty page.
 */
export function pageItems<T>(items: readonly T[], page: number, size: number): T[] {
  if (size <= 0) return [...items];
  const last = pageCount(items.length, size) - 1;
  const clamped = Math.min(Math.max(page, 0), last);
  return items.slice(clamped * size, clamped * size + size);
}
