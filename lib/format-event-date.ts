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

const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
] as const;

/** "2026-10-24" → "24 de octubre de 2026", for `aria-label`s and `<time>` text. */
export function formatEventDateLong(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) throw new Error(`Fecha inválida: "${isoDate}" (se esperaba AAAA-MM-DD)`);
  const [, year, month, day] = match;
  const monthName = MONTHS_ES[Number(month) - 1];
  if (!monthName) throw new Error(`Mes fuera de rango en "${isoDate}"`);
  return `${Number(day)} de ${monthName} de ${year}`;
}
