"use client";

import Image from "next/image";
import { forwardRef } from "react";
import { formatTrackTime } from "@/lib/format-track-time";
import type { TrackContent } from "@/services/repertoire/repertoire.types";
import type { ContentImage } from "@/services/shared/content-image.types";
import { MarqueeTitle } from "./marquee-title.comp";
import { StaffProgress } from "./staff-progress.comp";
import { StaffTile } from "./staff-tile.comp";
import { TransportControls } from "./transport-controls.comp";
import "./now-playing-card.comp.css";

interface NowPlayingCardProps {
  track: TrackContent;
  cover: ContentImage;
  playing: boolean;
  elapsed: number;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (fraction: number) => void;
}

// The dark card with the selected work: the quartet's photo under a lime
// clef as the cover, scrolling title, composer
// and category, the staff-shaped progress, the clocks and the transport. The
// play button's pressed state says whether it is playing; no status line.
// Nothing here starts on its own: the visitor presses play. The ref lets the
// player watch when the card scrolls out of view.
export const NowPlayingCard = forwardRef<HTMLDivElement, NowPlayingCardProps>(function NowPlayingCard(
  { track, cover, playing, elapsed, onTogglePlay, onPrevious, onNext, onSeek },
  ref,
) {
  const fraction = track.durationSeconds > 0 ? elapsed / track.durationSeconds : 0;

  return (
    <div ref={ref} className="now-playing">
      <div className="now-playing__work">
        <div className="now-playing__cover">
          <Image className="now-playing__cover-photo" src={cover.src} alt="" fill sizes="192px" />
          <StaffTile kind="clef" place="cover" />
        </div>
        <MarqueeTitle text={track.title} className="now-playing__title" />
        <p className="now-playing__composer">{track.composer}</p>
        {track.categoryLabel && <p className="now-playing__category">{track.categoryLabel}</p>}
      </div>

      <div className="now-playing__controls">
        <StaffProgress fraction={fraction} onSeek={onSeek} />
        <div className="now-playing__clocks">
          <span>{formatTrackTime(elapsed)}</span>
          <span>−{formatTrackTime(track.durationSeconds - elapsed)}</span>
        </div>
        <TransportControls playing={playing} onPrevious={onPrevious} onToggle={onTogglePlay} onNext={onNext} />
      </div>
    </div>
  );
});
