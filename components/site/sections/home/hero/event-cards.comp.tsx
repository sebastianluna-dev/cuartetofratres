"use client";

import { useState } from "react";
import type { EventContent } from "@/services/events/events.types";
import { EventCard } from "./event-card.comp";
import { EventDialog } from "./event-dialog.comp";
import "./event-cards.comp.css";

interface EventCardsProps {
  events: readonly EventContent[];
  /** Id of the heading that names the list. */
  labelledBy: string;
}

// The list of dates. A client component so it can own which card is open;
// the hero itself stays a Server Component and passes plain data down. One
// dialog for all the cards: only one date can be open at a time.
export function EventCards({ events, labelledBy }: EventCardsProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openEvent = events.find((event) => event.id === openId) ?? null;

  return (
    <>
      <ul className="event-cards" aria-labelledby={labelledBy}>
        {events.map((event) => (
          <li key={event.id} className="event-cards__item">
            <EventCard event={event} onOpen={() => setOpenId(event.id)} />
          </li>
        ))}
      </ul>
      <EventDialog event={openEvent} onClose={() => setOpenId(null)} />
    </>
  );
}
