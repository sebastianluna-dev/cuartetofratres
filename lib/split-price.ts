/**
 * "$250 general · $150 estudiantes" → ["$250 general", "$150 estudiantes"].
 * Editors type the price as one line separated by middle dots, slashes or
 * pipes; the dialog shows the first tier large and the rest under it.
 */
export function splitPrice(price: string): string[] {
  return price
    .split(/\s*[·|/]\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
}
