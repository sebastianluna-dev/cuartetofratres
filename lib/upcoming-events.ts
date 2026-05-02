import type { UpcomingEvent } from "@/constants/events.const";

/**
 * Keeps the events that have not happened yet, in date order. The comparison
 * is on the ISO string on purpose: "AAAA-MM-DD" sorts lexicographically, and
 * that avoids parsing dates in the server's time zone. `today` is injected so
 * it can be tested and so the static home page decides with the build date.
 */
export function selectUpcomingEvents(events: readonly UpcomingEvent[], today: string): UpcomingEvent[] {
  return events.filter((event) => event.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

/** Today's date in "AAAA-MM-DD", UTC. Good enough to hide a concert the day after it happened. */
export function todayIso(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}
