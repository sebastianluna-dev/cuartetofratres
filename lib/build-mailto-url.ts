/**
 * `mailto:` with an optional subject. `encodeURIComponent` turns spaces into
 * "%20", which mail clients read fine; "+" would arrive literally.
 */
export function buildMailtoUrl(email: string, subject?: string): string {
  if (!subject) return `mailto:${email}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
