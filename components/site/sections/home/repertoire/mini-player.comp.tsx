"use client";

import { useEffect, useRef } from "react";
import { PLAYER_COPY } from "@/constants/repertoire.const";
import { formatTrackTime } from "@/lib/format-track-time";
import type { TrackContent } from "@/services/repertoire/repertoire.types";
import { MarqueeTitle } from "./marquee-title.comp";
import { StaffProgress } from "./staff-progress.comp";
import { TransportControls } from "./transport-controls.comp";
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

/** Read by the footer (footer.section.css) to keep its content above the bar. */
const HEIGHT_VAR = "--mini-player-height";

// The bar pinned to the bottom of the screen while a track plays and the
// card has scrolled away: the visitor can keep reading and still pause,
// skip or seek. Slides up when it appears and down when it leaves. While it
// is mounted it publishes its height on <body>, so the footer can pad itself
// and nothing ends up covered at the end of the page.
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

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const publish = () => document.body.style.setProperty(HEIGHT_VAR, `${element.offsetHeight}px`);
    publish();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(publish);
    observer?.observe(element);
    return () => {
      observer?.disconnect();
      document.body.style.removeProperty(HEIGHT_VAR);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={["mini-player ink-grain", leaving && "mini-player_leaving"].filter(Boolean).join(" ")}
      role="region"
      aria-label={PLAYER_COPY.playingStatus}
    >
      <div className="mini-player__inner">
        <div className="mini-player__work">
          <span className="mini-player__status">{playing ? PLAYER_COPY.playingStatus : PLAYER_COPY.pausedStatus}</span>
          <MarqueeTitle text={track.title} as="span" className="mini-player__title" />
          <span className="mini-player__composer">{track.composer}</span>
        </div>
        <TransportControls
          playing={playing}
          onPrevious={onPrevious}
          onToggle={onTogglePlay}
          onNext={onNext}
          size="compact"
        />
        <div className="mini-player__progress">
          <span className="mini-player__clock">{formatTrackTime(elapsed)}</span>
          <StaffProgress fraction={fraction} onSeek={onSeek} />
          <span className="mini-player__clock">−{formatTrackTime(track.durationSeconds - elapsed)}</span>
        </div>
      </div>
    </div>
  );
}
