/**
 * A name as a piece of URL: lower case, no accents, words joined by hyphens.
 * "José Sánchez" → "jose-sanchez". Anything that is not a letter or a digit
 * separates words; the ends are trimmed.
 */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
