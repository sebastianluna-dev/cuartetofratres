import type { CSSProperties } from "react";
import type { TrackContent } from "@/services/repertoire/repertoire.types";
import { StaffTile } from "./staff-tile.comp";
import "./track-list-item.comp.css";

interface TrackListItemProps {
  track: TrackContent;
  /** The row's place in the filtered programme, from 1, counted across pages. */
  number: number;
  selected: boolean;
  playing: boolean;
  onSelect: () => void;
  /** Custom properties from the list: the row's place in the entrance. */
  style?: CSSProperties;
}

// One row of the programme, as in a Spotify list: at the start, the row's
// number; under the pointer (or the keyboard focus), play, or pause on the
// work that is sounding; while it sounds and the pointer is elsewhere, the
// equaliser. Then the staff tile, the title and the composer. The whole row
// is the button, and pressing the sounding one pauses it.
export function TrackListItem({ track, number, selected, playing, onSelect, style }: TrackListItemProps) {
  const classes = ["track-item", selected ? "track-item_selected" : "", playing ? "track-item_playing" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={classes} style={style}>
      <button type="button" className="track-item__button" aria-pressed={selected} onClick={onSelect}>
        <span className="track-item__state" aria-hidden="true">
          <span className="track-item__number">{number}</span>
          <span className="track-item__equalizer">
            <span className="track-item__bar" />
            <span className="track-item__bar" />
            <span className="track-item__bar" />
          </span>
          <span className="track-item__play" />
          <span className="track-item__pause" />
        </span>
        <StaffTile />
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
