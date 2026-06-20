"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { EVENT_DIALOG_LABELS } from "@/constants/events.const";
import { formatEventDateLong } from "@/lib/format-event-date";
import type { EventContent } from "@/services/events/events.types";
import "./event-dialog.comp.css";

interface EventDialogProps {
  /** The date to show; `null` keeps the dialog closed. */
  event: EventContent | null;
  onClose: () => void;
}

const TITLE_ID = "detalle-presentacion-titulo";

// Native <dialog> opened with `showModal()`: the browser gives the focus trap,
// Escape, the top layer and the focus return for free. Closing by any means
/** Height of the photo column on desktop (a 920px box at 3:2) and on the phone; the same numbers as the stylesheet. */
const MEDIA_HEIGHT = 613;
const MEDIA_WIDTH = 345;
const MEDIA_HEIGHT_PHONE = 240;
const PHONE_WIDTH = 430;
/** The launch photos are 16:9; a CMS upload brings its own size. */
const DEFAULT_RATIO = 16 / 9;

// The column is a tall portrait and most photos are wide, so `cover` draws
// them at the column's height and crops the sides: next/image must request
// that drawn width, not the column's, or it serves a small file and the
// screen stretches it.
function photoSizes(width?: number, height?: number): string {
  const ratio = width && height ? width / height : DEFAULT_RATIO;
  const phone = Math.ceil(Math.max(PHONE_WIDTH, MEDIA_HEIGHT_PHONE * ratio));
  const desktop = Math.ceil(Math.max(MEDIA_WIDTH, MEDIA_HEIGHT * ratio));
  return `(max-width: 767px) ${phone}px, ${desktop}px`;
}

// (Escape, the button, the backdrop) fires `onClose`, which clears the open
// event in the parent.
export function EventDialog({ event, onClose }: EventDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (event && !dialog.open) dialog.showModal();
    if (!event && dialog.open) dialog.close();
  }, [event]);

  // The page must not scroll under the modal; the top layer does not stop it.
  useEffect(() => {
    if (!event) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [event]);

  const close = () => ref.current?.close();
  const hasPrices = (event?.ticketPrices.length ?? 0) > 0;
  const hasVenue = Boolean(event?.venueName || event?.venueAddress);

  return (
    <dialog
      ref={ref}
      className="event-dialog"
      aria-labelledby={TITLE_ID}
      onClose={onClose}
      // The panel fills the dialog, so a click that lands on the dialog itself
      // can only have come from the backdrop.
      onClick={(clickEvent) => {
        if (clickEvent.target === clickEvent.currentTarget) close();
      }}
    >
      {event && (
        <div className="event-dialog__panel">
          <button type="button" className="event-dialog__close" aria-label={EVENT_DIALOG_LABELS.close} onClick={close}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <div className="event-dialog__media grain">
            <Image
              src={event.image.src}
              alt={event.image.alt}
              fill
              sizes={photoSizes(event.image.width, event.image.height)}
              quality={100}
              className="event-dialog__photo"
              style={{ objectPosition: event.imagePosition }}
            />
          </div>

          <div className="event-dialog__body">
            <p className="event-dialog__band">
              <time dateTime={event.date}>{formatEventDateLong(event.date)}</time> · {event.time}
            </p>
            <h2 id={TITLE_ID} className="event-dialog__title">
              {event.title}
            </h2>
            {event.description && <p className="event-dialog__description">{event.description}</p>}

            {(hasVenue || hasPrices) && (
              <div className="event-dialog__facts">
                {hasVenue && (
                  <section className="event-dialog__fact" aria-label={EVENT_DIALOG_LABELS.venue}>
                    <h3 className="event-dialog__block-label">{EVENT_DIALOG_LABELS.venue}</h3>
                    <div className="event-dialog__fact-body">
                      {event.venueName && <p className="event-dialog__fact-main">{event.venueName}</p>}
                      {event.venueAddress && <p className="event-dialog__fact-detail">{event.venueAddress}</p>}
                      {event.mapsUrl && (
                        <a
                          href={event.mapsUrl}
                          className="event-dialog__link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {EVENT_DIALOG_LABELS.directions}
                        </a>
                      )}
                    </div>
                  </section>
                )}
                {hasPrices && (
                  <section className="event-dialog__fact" aria-label={EVENT_DIALOG_LABELS.ticketsHeading}>
                    <h3 className="event-dialog__block-label">{EVENT_DIALOG_LABELS.ticketsHeading}</h3>
                    {/* One line that wraps: amount, who it is for, a dot, the next one. */}
                    <ul className="event-dialog__prices">
                      {event.ticketPrices.map((price, index) => (
                        <li key={`${price.amount}-${index}`} className="event-dialog__price">
                          <span className="event-dialog__price-amount">{price.amount}</span>
                          {price.label && <span className="event-dialog__price-label">{price.label}</span>}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}

            {event.program.length > 0 && (
              <section className="event-dialog__block" aria-label={EVENT_DIALOG_LABELS.program}>
                <h3 className="event-dialog__block-label">{EVENT_DIALOG_LABELS.program}</h3>
                <ol className="event-dialog__program">
                  {event.program.map((item, index) => (
                    <li key={`${item.title}-${index}`} className="event-dialog__program-item">
                      <span className="event-dialog__program-title">{item.title}</span>
                      {item.composer && <span className="event-dialog__program-composer">{item.composer}</span>}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <div className="event-dialog__actions">
              {event.ticketsUrl ? (
                <a
                  href={event.ticketsUrl}
                  className="button button_variant_outline-ivory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {EVENT_DIALOG_LABELS.tickets}
                </a>
              ) : (
                <Link href="#contacto" className="button button_variant_outline-ivory" onClick={close}>
                  {EVENT_DIALOG_LABELS.inquire}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
