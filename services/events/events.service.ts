import { selectUpcoming, todayIso } from "@/lib/upcoming-events";
import { getCatalog } from "@/services/shared/read-cms";
import { mapEvent } from "./events.mapper";
import type { EventContent } from "./events.types";

/**
 * The next `limit` published concerts, oldest first; those already past are
 * left out. There is no fallback on purpose: with nothing published the hero
 * shows no dates at all. `constants/events.const.ts` only feeds the seed.
 */
export async function getUpcomingEvents(limit: number): Promise<EventContent[]> {
  const { events } = await getCatalog();
  const published = events.map(mapEvent).filter((event): event is EventContent => event !== null);
  return selectUpcoming(published, todayIso()).slice(0, limit);
}
