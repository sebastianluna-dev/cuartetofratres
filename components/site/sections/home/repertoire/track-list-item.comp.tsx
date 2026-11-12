import type { TrackContent } from "@/services/repertoire/repertoire.types";
import { StaffTile } from "./staff-tile.comp";
import "./track-list-item.comp.css";

interface TrackListItemProps {
  track: TrackContent;
  selected: boolean;
  playing: boolean;
  onSelect: () => void;
}

// One row of the programme: the play glyph (the equaliser while this row
// plays), the staff tile, the title and the composer. The whole row is the
// button; the chosen one is only told by its glyph, in olive.
export function TrackListItem({ track, selected, playing, onSelect }: TrackListItemProps) {
  const classes = ["track-item", selected ? "track-item_selected" : "", playing ? "track-item_playing" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={classes}>
      <button type="button" className="track-item__button" aria-pressed={selected} onClick={onSelect}>
        <span className="track-item__state" aria-hidden="true">
          <span className="track-item__equalizer">
            <span className="track-item__bar" />
            <span className="track-item__bar" />
            <span className="track-item__bar" />
          </span>
          <span className="track-item__play" />
        </span>
        <StaffTile kind="notes" />
        {/* One box for both texts: a row on the desktop (`display: contents`),
            a column under the phone breakpoint. */}
        <span className="track-item__text">
          <span className="track-item__title">{track.title}</span>
          <span className="track-item__composer">{track.composer}</span>
        </span>
      </button>
    </li>
  );
}
