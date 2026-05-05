import type { Track } from "@/constants/repertoire.const";
import "./track-list-item.comp.css";

interface TrackListItemProps {
  track: Track;
  number: number;
  selected: boolean;
  playing: boolean;
  onSelect: () => void;
}

// One row of the list: number, title, the small equaliser (only animated
// while this row plays) and the composer. Whole row is the button.
export function TrackListItem({ track, number, selected, playing, onSelect }: TrackListItemProps) {
  const classes = ["track-item", selected ? "track-item_selected" : "", playing ? "track-item_playing" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={classes}>
      <button type="button" className="track-item__button" aria-pressed={selected} onClick={onSelect}>
        <span className="track-item__marker" aria-hidden="true" />
        <span className="track-item__number">{number < 10 ? `0${number}` : number}</span>
        <span className="track-item__title">{track.title}</span>
        <span className="track-item__equalizer" aria-hidden="true">
          <span className="track-item__bar" />
          <span className="track-item__bar" />
          <span className="track-item__bar" />
        </span>
        <span className="track-item__composer">{track.composer}</span>
      </button>
    </li>
  );
}
