import Image from "next/image";
import { formatEventDate, formatEventDateLong } from "@/lib/format-event-date";
import type { EventContent } from "@/services/events/events.types";
import "./event-card.comp.css";

interface EventCardProps {
  event: EventContent;
  /** Opens the detail window of this date. */
  onOpen: () => void;
}

/** Card heights from event-card.comp.css: 334px, and 240px under 480px wide. */
const CARD_HEIGHT = 334;
const CARD_HEIGHT_SMALL = 240;
/** The launch photos are 16:9; a CMS upload brings its own size. */
const DEFAULT_RATIO = 16 / 9;

// Tall card with the date as a lime band on top and the title at the foot.
// The whole card is a button that opens the detail window.
export function EventCard({ event, onOpen }: EventCardProps) {
  // The card is tall and the photo wide, so `cover` draws it at the card's
  // height and crops the sides: next/image must request that drawn width, not
  // the card's, or it serves a thumbnail and the screen stretches it.
  const { width, height } = event.image;
  const ratio = width && height ? width / height : DEFAULT_RATIO;
  const sizes = `(max-width: 479px) ${Math.ceil(CARD_HEIGHT_SMALL * ratio)}px, ${Math.ceil(CARD_HEIGHT * ratio)}px`;

  return (
    <button type="button" className="event-card grain" aria-haspopup="dialog" onClick={onOpen}>
      <Image
        src={event.image.src}
        alt=""
        fill
        sizes={sizes}
        className="event-card__photo"
        style={{ objectPosition: event.imagePosition }}
      />
      <span className="event-card__band">
        <time className="event-card__day" dateTime={event.date} aria-label={formatEventDateLong(event.date)}>
          {formatEventDate(event.date)}
        </time>
        <span className="event-card__time">{event.time}</span>
      </span>
      <span className="event-card__shade" />
      <span className="event-card__foot">
        <span className="event-card__title">{event.title}</span>
        <span className="event-card__city">{event.city}</span>
      </span>
    </button>
  );
}
