import type { Event } from "@/payload-types";
import { buildMapsUrl } from "@/lib/build-maps-url";
import { mapContentImage } from "@/services/shared/map-content-image";
import type { EventContent, EventProgramItem, EventTicketPrice } from "./events.types";

/** Payload stores dates as ISO timestamps; the site only cares about the day. */
export function isoDay(value: string): string {
  return value.slice(0, 10);
}

function orNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function mapProgram(program: Event["program"]): EventProgramItem[] {
  return (program ?? []).map((item) => ({ title: item.title, composer: orNull(item.composer) }));
}

function mapPrices(prices: NonNullable<Event["tickets"]>["prices"]): EventTicketPrice[] {
  return (prices ?? []).map((price) => ({ amount: price.amount, label: orNull(price.label) }));
}

/** The editor's link wins; otherwise a Maps search, but only when there is a venue to search for. */
function resolveMapsUrl(venue: Event["venue"], city: string): string | null {
  const explicit = orNull(venue?.mapsUrl);
  if (explicit) return explicit;
  const name = orNull(venue?.name);
  const address = orNull(venue?.address);
  if (!name && !address) return null;
  return buildMapsUrl([name, address, city]);
}

/** `null` for a date the site must not show: unpublished, or without a usable photo. */
export function mapEvent(event: Event): EventContent | null {
  if (event.published === false) return null;
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
    description: orNull(event.description),
    program: mapProgram(event.program),
    venueName: orNull(event.venue?.name),
    venueAddress: orNull(event.venue?.address),
    mapsUrl: resolveMapsUrl(event.venue, event.city),
    ticketsUrl: orNull(event.tickets?.url),
    ticketPrices: mapPrices(event.tickets?.prices),
  };
}
