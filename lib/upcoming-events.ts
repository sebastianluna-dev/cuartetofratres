interface Dated {
  /** "AAAA-MM-DD". */
  date: string;
}

/**
 * Keeps the items whose date has not passed, oldest first. The comparison
 * is on the ISO string on purpose: "AAAA-MM-DD" sorts lexicographically, and
 * that avoids parsing dates in the server's time zone. `today` is injected so
 * it can be tested and so the static page decides with the build date.
 */
export function selectUpcoming<T extends Dated>(items: readonly T[], today: string): T[] {
  return items.filter((item) => item.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

/** Today's date in "AAAA-MM-DD", UTC. Good enough to hide a concert the day after it happened. */
export function todayIso(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}
