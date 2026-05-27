"use client";

import { useState } from "react";
import { REPERTOIRE_FILTERS, type RepertoireCategory } from "@/constants/repertoire.const";
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
  const [category, setCategory] = useState<RepertoireCategory | null>(null);
  const player = useSamplePlayer(tracks.map((track) => track.durationSeconds));

  const visibleTracks = filterRepertoire(tracks, category);
  const selectedTrack = tracks[player.selectedIndex];

  return (
    <div className="repertoire-player">
      <div className="repertoire-player__head">
        <h2 className="repertoire-player__title">{content.title}</h2>
        <RepertoireFilters filters={REPERTOIRE_FILTERS} active={category} onChange={setCategory} />
      </div>

      <div className="repertoire-player__body">
        {selectedTrack && (
          <NowPlayingCard
            track={selectedTrack}
            number={player.selectedIndex + 1}
            playing={player.playing}
            elapsed={player.elapsed}
            note={content.playerNote}
            onTogglePlay={player.togglePlay}
            onSeek={player.seek}
          />
        )}
        <TrackList
          tracks={tracks}
          visibleIds={visibleTracks.map((track) => track.id)}
          selectedIndex={player.selectedIndex}
          playing={player.playing}
          note={content.note}
          emptyState={content.emptyState}
          onSelect={player.select}
        />
      </div>
    </div>
  );
}
