"use client";

import { useState } from "react";
import { ArrowIcon } from "@/components/site/shared/arrow-icon.comp";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { SHOWS_COPY } from "@/constants/events.const";
import { CONTACT_ANCHOR } from "@/constants/navigation.const";
import { composerSurnames } from "@/lib/composer-surnames";
import { formatEventDateLong, formatEventPosterDate } from "@/lib/format-event-date";
import { splitPosterTitle } from "@/lib/split-poster-title";
import type { EventContent } from "@/services/events/events.types";
import { EventDialog } from "./event-dialog.comp";
import { Poster } from "./poster.comp";
import "./show-posters.comp.css";

interface ShowPostersProps {
  events: readonly EventContent[];
  /** Where the quartet is based, for the poster shown while no date is published. */
  location: string;
  /** Id of the heading that names the list. */
  labelledBy: string;
}

// The row of posters. A Client Component so it can own which date is open;
// one dialog for all the posters, since only one can be open at a time.
export function ShowPosters({ events, location, labelledBy }: ShowPostersProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openEvent = events.find((event) => event.id === openId) ?? null;
  const { invitation, pending } = SHOWS_COPY;

  return (
    <>
      <ul className="show-posters" aria-labelledby={labelledBy}>
        {events.map((event) => {
          const date = formatEventPosterDate(event.date);
          return (
            <li key={event.id} className="show-posters__item">
              <Reveal>
                <Poster
                  palette="graphite"
                  top={
                    <time dateTime={event.date} aria-label={formatEventDateLong(event.date)}>
                      {date.day}
                    </time>
                  }
                  topNote={`${date.month} · ${date.weekday}`}
                  side={event.city.split(",")[0] ?? event.city}
                  title={splitPosterTitle(event.title)}
                  where={`${event.city} | ${event.time} h`}
                  note={composerSurnames(event.program)}
                  photo={{ src: event.image.src, position: event.imagePosition }}
                  action={
                    <button
                      type="button"
                      className="poster__action"
                      aria-haspopup="dialog"
                      onClick={() => setOpenId(event.id)}
                    >
                      {SHOWS_COPY.program}
                      <ArrowIcon direction="up-right" className="poster__action-icon" />
                    </button>
                  }
                />
              </Reveal>
            </li>
          );
        })}

        {events.length === 0 && (
          <li className="show-posters__item">
            <Reveal>
              <Poster
                palette="graphite"
                top={pending.top}
                topNote={pending.topNote}
                side={location.split(",")[0] ?? location}
                title={splitPosterTitle(pending.title)}
                where={location}
                note={null}
              />
            </Reveal>
          </li>
        )}

        <li className="show-posters__item">
          <Reveal>
            <Poster
              palette="lime"
              top={invitation.top}
              topNote={invitation.topNote}
              side={invitation.side}
              title={splitPosterTitle(invitation.title)}
              where={invitation.where}
              note={invitation.note}
              action={
                <a href={CONTACT_ANCHOR} className="poster__action">
                  {invitation.action}
                  <ArrowIcon className="poster__action-icon" />
                </a>
              }
            />
          </Reveal>
        </li>
      </ul>
      <EventDialog event={openEvent} onClose={() => setOpenId(null)} />
    </>
  );
}
