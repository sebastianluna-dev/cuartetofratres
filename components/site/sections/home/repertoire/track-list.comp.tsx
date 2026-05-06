import Link from "next/link";
import type { Track } from "@/constants/repertoire.const";
import { TrackListItem } from "./track-list-item.comp";
import "./track-list.comp.css";

interface TrackListProps {
  tracks: readonly Track[];
  /** Ids that pass the active filter; the rest are not rendered. */
  visibleIds: readonly string[];
  selectedIndex: number;
  playing: boolean;
  onSelect: (index: number) => void;
}

export function TrackList({ tracks, visibleIds, selectedIndex, playing, onSelect }: TrackListProps) {
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
          <h3 className="track-list__empty-title">Repertorio en preparación</h3>
          <p className="track-list__empty-text">
            Estamos integrando las obras de esta categoría. Escríbenos y te compartimos las piezas disponibles para tu
            ceremonia o evento.
          </p>
          <Link href="#contacto" className="button button_variant_outline-lime">
            Consultar repertorio
          </Link>
        </div>
      )}
      <p className="track-list__note">
        Las cuatro obras están en repertorio; las grabaciones de estudio se subirán en cuanto estén listas.
      </p>
    </div>
  );
}
