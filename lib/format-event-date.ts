/**
 * "2026-10-24" → "24/10". The hero's event cards show day and month only; the
 * year is implied by "próximas presentaciones". Parsed by hand so the result
 * does not depend on the server's time zone (a `Date` would shift the day).
 */
export function formatEventDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) throw new Error(`Fecha inválida: "${isoDate}" (se esperaba AAAA-MM-DD)`);
  const [, , month, day] = match;
  return `${day}/${month}`;
}
