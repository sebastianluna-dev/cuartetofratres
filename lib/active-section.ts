/**
 * Which section the visitor is reading: the last one whose top edge has
 * crossed `line` (a height inside the viewport). `tops` are the sections' top
 * edges relative to the viewport, in page order; `null` is a section that is
 * not on the page. Returns -1 above the first section.
 */
export function activeSectionIndex(tops: readonly (number | null)[], line: number): number {
  let active = -1;
  tops.forEach((top, index) => {
    if (top !== null && top < line) active = index;
  });
  return active;
}
