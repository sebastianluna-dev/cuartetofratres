/**
 * Google Maps search link for a venue, from whichever parts are known
 * (venue name, address, city). `null` when there is nothing to search for,
 * so the caller can hide the "Cómo llegar" link instead of pointing nowhere.
 */
export function buildMapsUrl(parts: ReadonlyArray<string | null | undefined>): string | null {
  const query = parts
    .map((part) => part?.trim() ?? "")
    .filter(Boolean)
    .join(", ");
  if (!query) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
