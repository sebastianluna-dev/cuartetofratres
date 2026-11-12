/**
 * A text written in a textarea, split into paragraphs at its blank lines.
 * Single line breaks stay inside their paragraph; empty pieces are dropped.
 */
export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

/**
 * The start of a text, at most `max` characters, cut at a word and closed
 * with an ellipsis: the description of a page for search engines. A text that
 * already fits comes back whole.
 */
export function excerpt(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.]+$/, "")}…`;
}
