"use client";

import { useState } from "react";
import { useInView } from "@/hooks/use-in-view.hook";
import { useMiniPlayerPresence } from "@/hooks/use-mini-player-presence.hook";
import { useSamplePlayer } from "@/hooks/use-sample-player.hook";
import { PLAYER_COPY, REPERTOIRE_PAGE_SIZE } from "@/constants/repertoire.const";
import { buildRepertoireFilters } from "@/lib/build-repertoire-filters";
import { filterRepertoire } from "@/lib/filter-repertoire";
import { pageCount, pageItems } from "@/lib/paginate";
import type { RepertoireContent } from "@/services/repertoire/repertoire.types";
import { MiniPlayer } from "./mini-player.comp";
import { NowPlayingCard } from "./now-playing-card.comp";
import { RepertoireFilters } from "./repertoire-filters.comp";
import { TrackList } from "./track-list.comp";
import { TrackPager } from "./track-pager.comp";
import "./repertoire-player.comp.css";

interface RepertoirePlayerProps {
  content: RepertoireContent;
  /** Id of the title, which names the section. */
  titleId: string;
}

/** The card counts as on screen while at least half of it is visible. */
const CARD_VISIBLE_SHARE = 0.5;

// Owns the two pieces of state of the section: which filter is active and
// what the player is doing. The filter only hides rows: the selected track
// stays selected (and keeps playing) even when its category is filtered out.
// While a track plays and the card is off screen, the mini player takes over
// (hooks/use-mini-player-presence.hook.ts decides when it comes and goes); on
// the phone too, where the record sits above the programme.
export function RepertoirePlayer({ content, titleId }: RepertoirePlayerProps) {
  const { tracks } = content;
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  // Counts the changes of filter or page: each one remounts the list so its entrance plays again.
  const [listChanges, setListChanges] = useState(0);
  const changeFilter = (next: string | null) => {
    setCategoryId(next);
    setPage(0);
    setListChanges((count) => count + 1);
  };
  const changePage = (next: number) => {
    setPage(next);
    setListChanges((count) => count + 1);
  };
  const player = useSamplePlayer(tracks);
  const [cardRef, cardInView] = useInView<HTMLDivElement>(CARD_VISIBLE_SHARE);
  const miniPhase = useMiniPlayerPresence(player.playing, cardInView);

  const filters = buildRepertoireFilters(content.categories);
  const filteredTracks = filterRepertoire(tracks, categoryId);
  const pages = pageCount(filteredTracks.length, REPERTOIRE_PAGE_SIZE);
  const visibleTracks = pageItems(filteredTracks, page, REPERTOIRE_PAGE_SIZE);
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
        {selectedTrack && <NowPlayingCard ref={cardRef} track={selectedTrack} {...transport} />}
        <div className="repertoire-player__list">
          <RepertoireFilters filters={filters} active={categoryId} onChange={changeFilter} />
          <TrackList
            key={listChanges}
            entering={listChanges > 0}
            tracks={tracks}
            visibleIds={visibleTracks.map((track) => track.id)}
            selectedIndex={player.selectedIndex}
            playing={player.playing}
            emptyState={content.emptyState}
            onSelect={player.select}
          />
          {/* Out of the list, at the foot of the column: level with the card's bottom
              edge on the desktop. The slot stays even with one page, so the
              column keeps its height. */}
          <div className="repertoire-player__pager">
            <TrackPager page={Math.min(page, pages - 1)} count={pages} onChange={changePage} />
          </div>
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
