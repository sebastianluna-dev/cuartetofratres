import { UPCOMING_EVENTS } from "@/constants/events.const";
import { selectUpcoming, todayIso } from "@/lib/upcoming-events";
import { getCatalog } from "@/services/shared/read-cms";
import { mapDefaultEvent, mapEvent } from "./events.mapper";
import type { EventContent } from "./events.types";

/** The next `limit` concerts, oldest first; those already past are left out. */
export async function getUpcomingEvents(limit: number): Promise<EventContent[]> {
  const { events } = await getCatalog();
  const mapped = events.map(mapEvent).filter((event): event is EventContent => event !== null);
  const source = mapped.length > 0 ? mapped : UPCOMING_EVENTS.map(mapDefaultEvent);
  return selectUpcoming(source, todayIso()).slice(0, limit);
}
