/**
 * Given name plus first surname, the way a Mexican name is shortened:
 * "Jesús Guadalupe Medina Corrales" → "Jesús Medina". With two surnames the
 * first one is the second-to-last word; with fewer than three words there is
 * nothing to drop and the name comes back as it is.
 */
export function shortenName(fullName: string): string {
  const words = fullName.trim().split(/\s+/).filter(Boolean);
  if (words.length < 3) return words.join(" ");
  return `${words[0]} ${words[words.length - 2]}`;
}
