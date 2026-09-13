import { PLAYER_COPY } from "@/constants/repertoire.const";
import "./transport-controls.comp.css";

interface TransportControlsProps {
  playing: boolean;
  onPrevious: () => void;
  onToggle: () => void;
  onNext: () => void;
  /** The mini player draws them a touch smaller. */
  size?: "regular" | "compact";
}

// Previous, play/pause and next: the same trio on the card and on the mini
// player. The glyphs are CSS shapes, so they take the current colours.
export function TransportControls({ playing, onPrevious, onToggle, onNext, size = "regular" }: TransportControlsProps) {
  return (
    <div className={`transport transport_size_${size}`}>
      <button type="button" className="transport__step" aria-label={PLAYER_COPY.previous} onClick={onPrevious}>
        <span className="transport__bar" />
        <span className="transport__triangle transport__triangle_dir_back" />
      </button>
      <button
        type="button"
        className="transport__toggle"
        aria-label={PLAYER_COPY.toggle}
        aria-pressed={playing}
        onClick={onToggle}
      >
        {playing ? (
          <span className="transport__pause">
            <span />
            <span />
          </span>
        ) : (
          <span className="transport__play" />
        )}
      </button>
      <button type="button" className="transport__step" aria-label={PLAYER_COPY.next} onClick={onNext}>
        <span className="transport__triangle" />
        <span className="transport__bar" />
      </button>
    </div>
  );
}
