"use client";

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

// The bar pinned to the bottom of the screen while a track plays and the
// card has scrolled away: the visitor can keep reading and still pause,
// skip or seek. Slides up when it appears and down when it leaves.
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

  return (
    <div
      className={["mini-player", leaving && "mini-player_leaving"].filter(Boolean).join(" ")}
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
