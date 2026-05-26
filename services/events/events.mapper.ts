import type { Event } from "@/payload-types";
import type { UpcomingEvent } from "@/constants/events.const";
import { mapContentImage } from "@/services/shared/map-content-image";
import type { EventContent } from "./events.types";

/** Payload stores dates as ISO timestamps; the site only cares about the day. */
export function isoDay(value: string): string {
  return value.slice(0, 10);
}

export function mapEvent(event: Event): EventContent | null {
  const image = mapContentImage(event.image);
  if (!image) return null;
  return {
    id: String(event.id),
    title: event.title,
    date: isoDay(event.date),
    time: event.time,
    city: event.city,
    image,
    imagePosition: event.imagePosition || "50% 50%",
  };
}

/** The constants, in the same shape, for when the collection is still empty. */
export function mapDefaultEvent(event: UpcomingEvent): EventContent {
  return {
    id: event.id,
    title: event.title,
    date: event.date,
    time: event.time,
    city: event.city,
    image: { src: event.image.src, alt: event.image.alt },
    imagePosition: event.image.position,
  };
}
