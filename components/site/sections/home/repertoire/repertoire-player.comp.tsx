"use client";

import { useState } from "react";
import { useInView } from "@/hooks/use-in-view.hook";
import { useSamplePlayer } from "@/hooks/use-sample-player.hook";
import { buildRepertoireFilters } from "@/lib/build-repertoire-filters";
import { filterRepertoire } from "@/lib/filter-repertoire";
import type { RepertoireContent } from "@/services/repertoire/repertoire.types";
import { MiniPlayer } from "./mini-player.comp";
import { NowPlayingCard } from "./now-playing-card.comp";
import { RepertoireFilters } from "./repertoire-filters.comp";
import { TrackList } from "./track-list.comp";
import "./repertoire-player.comp.css";

interface RepertoirePlayerProps {
  content: RepertoireContent;
}

/** The card counts as gone once its bottom 80 px have left the screen. */
const CARD_MARGIN = "0px 0px -80px 0px";

// Owns the two pieces of state of the section: which filter is active and
// what the player is doing. The filter only hides rows: the selected track
// stays selected (and keeps playing) even when its category is filtered out.
// While a track plays and the card is off screen, the mini player takes over.
export function RepertoirePlayer({ content }: RepertoirePlayerProps) {
  const { tracks } = content;
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const player = useSamplePlayer(tracks.map((track) => track.durationSeconds));
  const [cardRef, cardInView] = useInView<HTMLDivElement>(CARD_MARGIN);

  const filters = buildRepertoireFilters(content.categories);
  const visibleTracks = filterRepertoire(tracks, categoryId);
  const selectedTrack = tracks[player.selectedIndex];
  const transport = {
    playing: player.playing,
    elapsed: player.elapsed,
    onTogglePlay: player.togglePlay,
    onPrevious: player.previous,
    onNext: player.next,
    onSeek: player.seek,
  };

  return (
    <div className="repertoire-player">
      <div className="repertoire-player__head">
        <h2 className="repertoire-player__title">{content.title}</h2>
      </div>

      <div className="repertoire-player__body">
        {selectedTrack && <NowPlayingCard ref={cardRef} track={selectedTrack} {...transport} />}
        <div className="repertoire-player__list">
          <RepertoireFilters filters={filters} active={categoryId} onChange={setCategoryId} />
          <TrackList
            tracks={tracks}
            visibleIds={visibleTracks.map((track) => track.id)}
            selectedIndex={player.selectedIndex}
            playing={player.playing}
            emptyState={content.emptyState}
            onSelect={player.select}
          />
        </div>
      </div>

      {selectedTrack && player.playing && !cardInView && <MiniPlayer track={selectedTrack} {...transport} />}
    </div>
  );
}
