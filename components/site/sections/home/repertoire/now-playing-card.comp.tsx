"use client";

import Image from "next/image";
import { forwardRef } from "react";
import { PLAYER_COPY, RECORD_PHOTO } from "@/constants/repertoire.const";
import { formatTrackTime } from "@/lib/format-track-time";
import type { TrackContent } from "@/services/repertoire/repertoire.types";
import { LineProgress } from "./line-progress.comp";
import "./now-playing-card.comp.css";

interface NowPlayingCardProps {
  track: TrackContent;
  playing: boolean;
  elapsed: number;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (fraction: number) => void;
}

// The selected work as a record on the paper, with no card around it: the
// quartet's photo (`RECORD_PHOTO`) cut into a disc that turns while the work plays and stops
// on pause, then the category, the title, the composer, a thin progress line,
// the clocks and the transport in words. Nothing here starts on its own: the
// visitor presses play. The ref lets the player watch when it scrolls away.
export const NowPlayingCard = forwardRef<HTMLDivElement, NowPlayingCardProps>(function NowPlayingCard(
  { track, playing, elapsed, onTogglePlay, onPrevious, onNext, onSeek },
  ref,
) {
  const fraction = track.durationSeconds > 0 ? elapsed / track.durationSeconds : 0;

  return (
    <div ref={ref} className={`now-playing${playing ? " now-playing_playing" : ""}`}>
      <div className="now-playing__disc" aria-hidden="true">
        <div className="now-playing__spin">
          <Image className="now-playing__photo" src={RECORD_PHOTO} alt="" fill sizes="250px" />
          <span className="now-playing__grooves" />
        </div>
        <span className="now-playing__label">
          <span className="now-playing__hole" />
        </span>
      </div>

      {track.categoryLabel && <p className="now-playing__category">{track.categoryLabel}</p>}
      <p className="now-playing__title">{track.title}</p>
      <p className="now-playing__composer">{track.composer}</p>

      <div className="now-playing__progress">
        <LineProgress fraction={fraction} onSeek={onSeek} />
        <div className="now-playing__clocks">
          <span>{formatTrackTime(elapsed)}</span>
          <span>−{formatTrackTime(track.durationSeconds - elapsed)}</span>
        </div>
      </div>

      <div className="now-playing__transport">
        <button type="button" className="now-playing__step" aria-label={PLAYER_COPY.previous} onClick={onPrevious}>
          {PLAYER_COPY.previousLabel}
        </button>
        <span className="now-playing__dot" aria-hidden="true">
          ·
        </span>
        <button
          type="button"
          className="now-playing__step now-playing__step_main"
          aria-label={PLAYER_COPY.toggle}
          aria-pressed={playing}
          onClick={onTogglePlay}
        >
          {playing ? PLAYER_COPY.pause : PLAYER_COPY.play}
        </button>
        <span className="now-playing__dot" aria-hidden="true">
          ·
        </span>
        <button type="button" className="now-playing__step" aria-label={PLAYER_COPY.next} onClick={onNext}>
          {PLAYER_COPY.nextLabel}
        </button>
      </div>
    </div>
  );
});
