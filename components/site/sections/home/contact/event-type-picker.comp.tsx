"use client";

import { useState } from "react";
import type { EventType, EventTypeOption } from "@/constants/contact.const";
import "./event-type-picker.comp.css";

interface EventTypePickerProps {
  options: readonly EventTypeOption[];
  error?: string;
}

// A row of radio buttons drawn as chips. Real radios (visually hidden) so the
// value travels with the form and the arrow keys move between options.
export function EventTypePicker({ options, error }: EventTypePickerProps) {
  const [selected, setSelected] = useState<EventType>(options[0]?.value ?? "concierto");

  return (
    <fieldset className="event-type-picker">
      <legend className="event-type-picker__legend">Tipo de evento</legend>
      <div className="event-type-picker__options">
        {options.map((option) => (
          <label
            key={option.value}
            className={`event-type-picker__chip${selected === option.value ? " event-type-picker__chip_selected" : ""}`}
          >
            <input
              type="radio"
              name="eventType"
              value={option.value}
              checked={selected === option.value}
              onChange={() => setSelected(option.value)}
              className="event-type-picker__input"
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && <span className="event-type-picker__error">{error}</span>}
    </fieldset>
  );
}
