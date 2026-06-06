"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <div className="event-dialog__media">
            <Image
              src={event.image.src}
              alt={event.image.alt}
              fill
              sizes="(max-width: 767px) 100vw, 300px"
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
            <p className="event-dialog__city">{event.city}</p>
          </div>
        </div>
      )}
    </dialog>
  );
}
