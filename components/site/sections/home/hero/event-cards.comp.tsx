"use client";

import type { EventContent } from "@/services/events/events.types";
import { EventCard } from "./event-card.comp";
import "./event-cards.comp.css";

interface EventCardsProps {
  events: readonly EventContent[];
  /** Id of the heading that names the list. */
  labelledBy: string;
}

// The list of dates. A client component so it can own which card is open;
// the hero itself stays a Server Component and passes plain data down.
export function EventCards({ events, labelledBy }: EventCardsProps) {
  return (
    <ul className="event-cards" aria-labelledby={labelledBy}>
      {events.map((event) => (
        <li key={event.id} className="event-cards__item">
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
}
