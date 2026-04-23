import Image from "next/image";
import Link from "next/link";
import type { UpcomingEvent } from "@/constants/events.const";
import { formatEventDate, formatEventDateLong } from "@/lib/format-event-date";
import "./event-card.comp.css";

interface EventCardProps {
  event: UpcomingEvent;
}

// Tall card with the date as a lime band on top and the title at the foot.
// It links to the contact section: there is no ticketing yet.
export function EventCard({ event }: EventCardProps) {
  return (
    <Link href="#contacto" className="event-card">
      <Image
        src={event.image.src}
        alt=""
        fill
        sizes="188px"
        className="event-card__photo"
        style={{ objectPosition: event.image.position }}
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
    </Link>
  );
}
