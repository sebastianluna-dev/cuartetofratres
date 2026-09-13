import type { TrackContent } from "@/services/repertoire/repertoire.types";
import { StaffTile } from "./staff-tile.comp";
import "./track-list-item.comp.css";

interface TrackListItemProps {
  track: TrackContent;
  number: number;
  selected: boolean;
  playing: boolean;
  onSelect: () => void;
}

// One row of the programme: number, staff tile, title, composer and, at the
// end, a play glyph that becomes the equaliser while this row plays. The
// whole row is the button.
export function TrackListItem({ track, number, selected, playing, onSelect }: TrackListItemProps) {
  const classes = ["track-item", selected ? "track-item_selected" : "", playing ? "track-item_playing" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={classes}>
      <button type="button" className="track-item__button" aria-pressed={selected} onClick={onSelect}>
        <span className="track-item__number">{number < 10 ? `0${number}` : number}</span>
        <StaffTile kind="notes" />
        <span className="track-item__title">{track.title}</span>
        <span className="track-item__composer">{track.composer}</span>
        <span className="track-item__state" aria-hidden="true">
          <span className="track-item__equalizer">
            <span className="track-item__bar" />
            <span className="track-item__bar" />
            <span className="track-item__bar" />
          </span>
          <span className="track-item__play" />
        </span>
      </button>
    </li>
  );
}
