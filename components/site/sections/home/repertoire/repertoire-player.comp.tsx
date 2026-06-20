"use client";

import { useState } from "react";
import { buildRepertoireFilters } from "@/lib/build-repertoire-filters";
import { filterRepertoire } from "@/lib/filter-repertoire";
import { useSamplePlayer } from "@/hooks/use-sample-player.hook";
import type { RepertoireContent } from "@/services/repertoire/repertoire.types";
import { NowPlayingCard } from "./now-playing-card.comp";
import { RepertoireFilters } from "./repertoire-filters.comp";
import { TrackList } from "./track-list.comp";
import "./repertoire-player.comp.css";

interface RepertoirePlayerProps {
  content: RepertoireContent;
}

// Owns the two pieces of state of the section: which filter is active and
// what the player is doing. The filter only hides rows: the selected track
// stays selected (and keeps playing) even when its category is filtered out.
export function RepertoirePlayer({ content }: RepertoirePlayerProps) {
  const { tracks } = content;
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const player = useSamplePlayer(tracks.map((track) => track.durationSeconds));

  const filters = buildRepertoireFilters(content.categories);
  const visibleTracks = filterRepertoire(tracks, categoryId);
  const selectedTrack = tracks[player.selectedIndex];

  return (
    <div className="repertoire-player">
      <div className="repertoire-player__head">
        <h2 className="repertoire-player__title">{content.title}</h2>
        <RepertoireFilters filters={filters} active={categoryId} onChange={setCategoryId} />
      </div>

      <div className="repertoire-player__body">
        {selectedTrack && (
          <NowPlayingCard
            track={selectedTrack}
            number={player.selectedIndex + 1}
            playing={player.playing}
            elapsed={player.elapsed}
            onTogglePlay={player.togglePlay}
            onSeek={player.seek}
          />
        )}
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
  );
}
