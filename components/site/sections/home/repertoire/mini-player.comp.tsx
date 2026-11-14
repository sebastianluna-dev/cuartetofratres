"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { PLAYER_COPY, RECORD_PHOTO } from "@/constants/repertoire.const";
import { useMiniPlayerCard } from "@/hooks/use-mini-player-card.hook";
import { grooveDrawing } from "@/lib/mini-player-card";
import { formatTrackPosition, formatTrackTime } from "@/lib/format-track-time";
import type { TrackContent } from "@/services/repertoire/repertoire.types";
import { LineProgress } from "./line-progress.comp";
import "./mini-player.comp.css";

interface MiniPlayerProps {
  track: TrackContent;
  playing: boolean;
  elapsed: number;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (fraction: number) => void;
  /** Plays the exit animation; the player unmounts it when that ends. */
  leaving?: boolean;
}

/** Read by the footer (footer.section.css) to keep its last line clear of the record. */
const HEIGHT_VAR = "--mini-player-height";

// The record of the card above, small, in the bottom-right corner while a
// work plays and the card has scrolled away. The record is the play/pause
// button and its grooves are the progress: the played part is a ring that
// widens from the edge towards the label. A paper card with the work, the
// clocks, the progress line and «Anterior · Siguiente» slides out to its left
// while the pointer or the keyboard focus is on the player, and stays while it
// is paused; on a touch screen the first tap on the record opens it
// (hooks/use-mini-player-card.hook.ts). While it is mounted it publishes how
// much of the bottom of the screen it takes, so the footer can pad itself.
export function MiniPlayer({
  track,
  playing,
  elapsed,
  onTogglePlay,
  onPrevious,
  onNext,
  onSeek,
  leaving = false,
}: MiniPlayerProps) {
  const fraction = track.durationSeconds > 0 ? elapsed / track.durationSeconds : 0;
  const ref = useRef<HTMLDivElement>(null);
  const cardId = useId();
  const card = useMiniPlayerCard(ref, playing, onTogglePlay);
  const grooves = grooveDrawing(fraction);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    // The record plus its gap to the bottom edge: read from the box and its
    // `bottom`, not from its position, which the entrance animation moves.
    const publish = () => {
      const gap = parseFloat(getComputedStyle(element).bottom) || 0;
      document.body.style.setProperty(HEIGHT_VAR, `${Math.round(element.offsetHeight + gap)}px`);
    };
    publish();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(publish);
    observer?.observe(element);
    return () => {
      observer?.disconnect();
      document.body.style.removeProperty(HEIGHT_VAR);
    };
  }, []);

  const classes = [
    "mini-player",
    playing && "mini-player_playing",
    card.open && "mini-player_open",
    leaving && "mini-player_leaving",
  ];

  return (
    <div
      ref={ref}
      className={classes.filter(Boolean).join(" ")}
      role="region"
      aria-label={PLAYER_COPY.playingStatus}
      {...card.rootHandlers}
    >
      <button
        type="button"
        className="mini-player__record"
        aria-label={card.recordOpens ? PLAYER_COPY.showWork : PLAYER_COPY.toggle}
        aria-pressed={card.recordOpens ? undefined : playing}
        aria-expanded={card.touch ? card.open : undefined}
        aria-controls={card.touch ? cardId : undefined}
        onClick={card.onRecordClick}
      >
        <span className="mini-player__disc" aria-hidden="true">
          <span className="mini-player__spin">
            <Image className="mini-player__photo" src={RECORD_PHOTO} alt="" fill sizes="152px" quality={90} />
            <span className="mini-player__texture" />
          </span>
          <svg className="mini-player__grooves" viewBox="0 0 100 100" focusable="false">
            {grooves.band && (
              <circle
                className="mini-player__band"
                cx="50"
                cy="50"
                r={grooves.band.radius}
                strokeWidth={grooves.band.width}
              />
            )}
            {grooves.grooves.map((radius) => (
              <circle key={radius} className="mini-player__groove" cx="50" cy="50" r={radius} />
            ))}
            <circle className="mini-player__needle" cx="50" cy="50" r={grooves.needle} />
            <circle className="mini-player__needle mini-player__needle_light" cx="50" cy="50" r={grooves.needle - 1} />
            <circle className="mini-player__tip" cx="50" cy={50 - grooves.needle} r="2" />
          </svg>
          <span className="mini-player__label">
            <span className="mini-player__glyph" />
          </span>
        </span>
      </button>

      <div id={cardId} className="mini-player__card">
        <span className="mini-player__status">{playing ? PLAYER_COPY.playingStatus : PLAYER_COPY.pausedStatus}</span>
        <p className="mini-player__title" title={track.title}>
          {track.title}
        </p>
        <span className="mini-player__composer">{track.composer}</span>
        <div className="mini-player__time">
          <span className="mini-player__clock">{formatTrackTime(elapsed)}</span>
          <LineProgress
            fraction={fraction}
            onSeek={onSeek}
            valueText={formatTrackPosition(elapsed, track.durationSeconds)}
          />
          <span className="mini-player__clock">−{formatTrackTime(track.durationSeconds - elapsed)}</span>
        </div>
        <div className="mini-player__transport">
          <button type="button" className="mini-player__step" aria-label={PLAYER_COPY.previous} onClick={onPrevious}>
            {PLAYER_COPY.previousLabel}
          </button>
          <span className="mini-player__dot" aria-hidden="true">
            ·
          </span>
          <button type="button" className="mini-player__step" aria-label={PLAYER_COPY.next} onClick={onNext}>
            {PLAYER_COPY.nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
