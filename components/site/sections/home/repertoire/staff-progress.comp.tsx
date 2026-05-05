"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import "./staff-progress.comp.css";

interface StaffProgressProps {
  /** 0–1. */
  fraction: number;
  onSeek: (fraction: number) => void;
}

const KEY_STEP = 0.05;

// Progress bar drawn as four staff lines: the played part in lime, the rest
// in a faint ivory, and a double bar as the playhead. Click to seek; with the
// keyboard it is a slider (arrows move 5 %, Home/End jump).
export function StaffProgress({ fraction, onSeek }: StaffProgressProps) {
  const percent = Math.round(Math.min(1, Math.max(0, fraction)) * 1000) / 10;

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    onSeek((event.clientX - rect.left) / rect.width);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") onSeek(fraction + KEY_STEP);
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") onSeek(fraction - KEY_STEP);
    else if (event.key === "Home") onSeek(0);
    else if (event.key === "End") onSeek(1);
    else return;
    event.preventDefault();
  };

  return (
    <div
      className="staff-progress"
      role="slider"
      tabIndex={0}
      aria-label="Posición en la pista"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <span className="staff-progress__played" style={{ width: `${percent}%` }} />
      <span className="staff-progress__head" style={{ left: `${percent}%` }} />
      <span className="staff-progress__head staff-progress__head_second" style={{ left: `${percent}%` }} />
    </div>
  );
}
