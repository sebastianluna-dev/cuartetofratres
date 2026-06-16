import { UPCOMING_EVENTS } from "@/constants/events.const";
import { selectUpcoming, todayIso } from "@/lib/upcoming-events";
import { getCatalog } from "@/services/shared/read-cms";
import { mapDefaultEvent, mapEvent } from "./events.mapper";
import type { EventContent } from "./events.types";

/**
 * The next `limit` concerts, oldest first; those already past are left out.
 * The constants only stand in while the collection is EMPTY: once the
 * quartet has dates in the CMS, hiding every one of them must show nothing,
 * not the launch examples.
 */
export async function getUpcomingEvents(limit: number): Promise<EventContent[]> {
  const { events } = await getCatalog();
  const source =
    events.length > 0
      ? events.map(mapEvent).filter((event): event is EventContent => event !== null)
      : UPCOMING_EVENTS.map(mapDefaultEvent);
  return selectUpcoming(source, todayIso()).slice(0, limit);
}
