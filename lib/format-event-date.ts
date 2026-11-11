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

const MONTHS_SHORT_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"] as const;
const WEEKDAYS_SHORT_ES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] as const;

export interface EventPosterDate {
  /** Day of the month with its zero: "08". */
  day: string;
  /** "Nov". */
  month: string;
  /** "Dom". */
  weekday: string;
}

/**
 * "2026-11-08" → day "08", month "Nov", weekday "Dom": the pieces a poster
 * sets apart. The weekday is worked out in UTC from the three numbers, so it
 * does not depend on the server's time zone either.
 */
export function formatEventPosterDate(isoDate: string): EventPosterDate {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) throw new Error(`Fecha inválida: "${isoDate}" (se esperaba AAAA-MM-DD)`);
  const [, year, month, day] = match;
  const monthName = MONTHS_SHORT_ES[Number(month) - 1];
  if (!monthName) throw new Error(`Mes fuera de rango en "${isoDate}"`);
  const weekday = WEEKDAYS_SHORT_ES[new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))).getUTCDay()];
  if (!day || !weekday) throw new Error(`Fecha inválida: "${isoDate}"`);
  return { day, month: monthName, weekday };
}
