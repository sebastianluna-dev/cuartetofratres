"use client";

import { useState } from "react";
import { useInView } from "@/hooks/use-in-view.hook";
import { useMediaQuery } from "@/hooks/use-media-query.hook";
import { useMiniPlayerPresence } from "@/hooks/use-mini-player-presence.hook";
import { useSamplePlayer } from "@/hooks/use-sample-player.hook";
import { PLAYER_COPY } from "@/constants/repertoire.const";
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
  /** Id of the title, which names the section. */
  titleId: string;
}

/** The card counts as on screen while at least half of it is visible. */
const CARD_VISIBLE_SHARE = 0.5;
/** The phone breakpoint of the stylesheets: there the card is not rendered. */
const PHONE_QUERY = "(max-width: 767px)";

// Owns the two pieces of state of the section: which filter is active and
// what the player is doing. The filter only hides rows: the selected track
// stays selected (and keeps playing) even when its category is filtered out.
// While a track plays and the card is off screen, the mini player takes over
// (hooks/use-mini-player-presence.hook.ts decides when it comes and goes). On
// the phone there is no card: the bar is the whole player, so it shows as
// soon as a work is in progress and stays through a pause. There the list
// also starts with no row marked, because nothing on screen would explain why
// one of them looks chosen before the visitor has chosen it.
export function RepertoirePlayer({ content, titleId }: RepertoirePlayerProps) {
  const { tracks } = content;
  const [categoryId, setCategoryId] = useState<string | null>(null);
  // Counts the filter changes: each one remounts the list so its entrance plays again.
  const [filterChanges, setFilterChanges] = useState(0);
  const changeFilter = (next: string | null) => {
    setCategoryId(next);
    setFilterChanges((count) => count + 1);
  };
  const player = useSamplePlayer(tracks);
  const [cardRef, cardInView] = useInView<HTMLDivElement>(CARD_VISIBLE_SHARE);
  const phone = useMediaQuery(PHONE_QUERY);
  const inProgress = player.playing || player.elapsed > 0;
  const miniPhase = useMiniPlayerPresence(phone ? inProgress : player.playing, phone ? false : cardInView);

  const filters = buildRepertoireFilters(content.categories);
  const visibleTracks = filterRepertoire(tracks, categoryId);
  // The card and the bar show the length the player knows: the file's own once it has loaded.
  const current = tracks[player.selectedIndex];
  const selectedTrack = current && { ...current, durationSeconds: player.duration };
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
        <h2 id={titleId} className="section-title">
          {content.title}
        </h2>
      </div>

      <div className="repertoire-player__body">
        {selectedTrack && <NowPlayingCard ref={cardRef} track={selectedTrack} cover={content.cover} {...transport} />}
        <div className="repertoire-player__list">
          <RepertoireFilters filters={filters} active={categoryId} onChange={changeFilter} />
          <TrackList
            key={filterChanges}
            entering={filterChanges > 0}
            tracks={tracks}
            visibleIds={visibleTracks.map((track) => track.id)}
            selectedIndex={!phone || player.chosen ? player.selectedIndex : null}
            playing={player.playing}
            emptyState={content.emptyState}
            onSelect={player.select}
          />
        </div>
      </div>

      {/* Only while the chosen work has no recording yet. */}
      {selectedTrack && !selectedTrack.audioSrc && <p className="repertoire-player__note">{PLAYER_COPY.simulated}</p>}

      {selectedTrack && miniPhase !== "hidden" && (
        <MiniPlayer track={selectedTrack} leaving={miniPhase === "leaving"} {...transport} />
      )}
    </div>
  );
}
