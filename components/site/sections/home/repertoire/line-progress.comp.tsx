"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { PLAYER_COPY } from "@/constants/repertoire.const";
import "./line-progress.comp.css";

interface LineProgressProps {
  /** 0–1. */
  fraction: number;
  onSeek: (fraction: number) => void;
  /** What a screen reader says for the position, e.g. «0:43 de 3:30». */
  valueText?: string;
}

const KEY_STEP = 0.05;

// A thin line that fills in ink as the work plays, with a dot as the
// playhead. Click to seek; with the keyboard it is a slider (arrows move 5 %,
// Home/End jump).
export function LineProgress({ fraction, onSeek, valueText }: LineProgressProps) {
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
      className="line-progress"
      role="slider"
      tabIndex={0}
      aria-label={PLAYER_COPY.position}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
      aria-valuetext={valueText}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <span className="line-progress__track">
        <span className="line-progress__played" style={{ width: `${percent}%` }} />
      </span>
      <span className="line-progress__dot" style={{ left: `${percent}%` }} />
    </div>
  );
}
