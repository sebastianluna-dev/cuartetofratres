import type { CSSProperties } from "react";
import { ArrowIcon } from "@/components/site/shared/arrow-icon.comp";
import type { RepertoireContent, TrackContent } from "@/services/repertoire/repertoire.types";
import { TrackListItem } from "./track-list-item.comp";
import "./track-list.comp.css";

interface TrackListProps {
  tracks: readonly TrackContent[];
  /** Ids that pass the active filter; the rest are not rendered. */
  visibleIds: readonly string[];
  /** `null` while no track has been chosen: no row is marked. */
  selectedIndex: number | null;
  playing: boolean;
  emptyState: RepertoireContent["emptyState"];
  onSelect: (index: number) => void;
  /** Plays the entrance of the rows (or of the empty card); set after the visitor changes the filter. */
  entering?: boolean;
}

// The programme: one row per work that passes the filter, or the
// empty-state card. After a change of filter the parent remounts it with
// `entering`, and the rows grow into place one after the other.
//
// Under the visible rows lies an invisible copy of the whole programme, in
// the same grid cell: the list always keeps the height of «Todo», so a
// filter never moves what comes after the section.
export function TrackList({
  tracks,
  visibleIds,
  selectedIndex,
  playing,
  emptyState,
  onSelect,
  entering = false,
}: TrackListProps) {
  const rows = tracks.map((track, index) => ({ track, index })).filter(({ track }) => visibleIds.includes(track.id));

  return (
    <div className={`track-list${entering ? " track-list_entering" : ""}`}>
      <div className="track-list__stage">
        <ol className="track-list__items track-list__ghost" aria-hidden="true" inert>
          {tracks.map((track) => (
            <TrackListItem key={track.id} track={track} selected={false} playing={false} onSelect={() => {}} />
          ))}
        </ol>
        {rows.length > 0 ? (
          <ol className="track-list__items">
            {rows.map(({ track, index }, order) => (
              <TrackListItem
                key={track.id}
                style={{ "--order": order } as CSSProperties}
                track={track}
                selected={index === selectedIndex}
                playing={playing && index === selectedIndex}
                onSelect={() => onSelect(index)}
              />
            ))}
          </ol>
        ) : (
          <div className="track-list__empty">
            <h3 className="track-list__empty-title">{emptyState.title}</h3>
            <p className="track-list__empty-text">{emptyState.text}</p>
            <a href="#contacto" className="pill-button pill-button_variant_ink pill-button_size_small">
              {emptyState.ctaLabel}
              <ArrowIcon className="pill-button__icon" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
