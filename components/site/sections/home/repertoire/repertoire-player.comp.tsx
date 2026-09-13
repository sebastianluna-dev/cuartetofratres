"use client";

import { useState } from "react";
import { useInView } from "@/hooks/use-in-view.hook";
import { useMediaQuery } from "@/hooks/use-media-query.hook";
import { useMiniPlayerPresence } from "@/hooks/use-mini-player-presence.hook";
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
// soon as a work is in progress and stays through a pause.
export function RepertoirePlayer({ content }: RepertoirePlayerProps) {
  const { tracks } = content;
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const player = useSamplePlayer(tracks.map((track) => track.durationSeconds));
  const [cardRef, cardInView] = useInView<HTMLDivElement>(CARD_VISIBLE_SHARE);
  const phone = useMediaQuery(PHONE_QUERY);
  const inProgress = player.playing || player.elapsed > 0;
  const miniPhase = useMiniPlayerPresence(phone ? inProgress : player.playing, phone ? false : cardInView);

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
        {selectedTrack && <NowPlayingCard ref={cardRef} track={selectedTrack} cover={content.cover} {...transport} />}
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

      {selectedTrack && miniPhase !== "hidden" && (
        <MiniPlayer track={selectedTrack} leaving={miniPhase === "leaving"} {...transport} />
      )}
    </div>
  );
}
