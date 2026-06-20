import Link from "next/link";
import type { RepertoireContent, TrackContent } from "@/services/repertoire/repertoire.types";
import { TrackListItem } from "./track-list-item.comp";
import "./track-list.comp.css";

interface TrackListProps {
  tracks: readonly TrackContent[];
  /** Ids that pass the active filter; the rest are not rendered. */
  visibleIds: readonly string[];
  selectedIndex: number;
  playing: boolean;
  emptyState: RepertoireContent["emptyState"];
  onSelect: (index: number) => void;
}

export function TrackList({ tracks, visibleIds, selectedIndex, playing, emptyState, onSelect }: TrackListProps) {
  const rows = tracks.map((track, index) => ({ track, index })).filter(({ track }) => visibleIds.includes(track.id));

  return (
    <div className="track-list">
      {rows.length > 0 ? (
        <ol className="track-list__items">
          {rows.map(({ track, index }) => (
            <TrackListItem
              key={track.id}
              track={track}
              number={index + 1}
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
          <Link href="#contacto" className="button button_variant_outline-lime">
            {emptyState.ctaLabel}
          </Link>
        </div>
      )}
    </div>
  );
}
