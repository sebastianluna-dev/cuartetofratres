import type { Track } from "@/constants/repertoire.const";
import { CATEGORY_LABELS } from "@/constants/repertoire.const";
import { formatTrackTime } from "@/lib/format-track-time";
import { StaffProgress } from "./staff-progress.comp";
import "./now-playing-card.comp.css";

interface NowPlayingCardProps {
  track: Track;
  number: number;
  playing: boolean;
  elapsed: number;
  onTogglePlay: () => void;
  onSeek: (fraction: number) => void;
}

// Sticky card with the selected work, the staff-shaped progress bar and the
// play/pause button. Nothing here starts on its own: the visitor presses play.
export function NowPlayingCard({ track, number, playing, elapsed, onTogglePlay, onSeek }: NowPlayingCardProps) {
  const fraction = track.durationSeconds > 0 ? elapsed / track.durationSeconds : 0;

  return (
    <div className="now-playing">
      <span className="now-playing__status" aria-live="polite">
        {playing ? "Reproduciendo" : "Pista seleccionada · en pausa"}
      </span>
      <span className="now-playing__number" aria-hidden="true">
        {number < 10 ? `0${number}` : number}
      </span>
      <h3 className="now-playing__title">{track.title}</h3>
      <p className="now-playing__composer">{track.composer}</p>
      <p className="now-playing__category">{CATEGORY_LABELS[track.category]}</p>

      <StaffProgress fraction={fraction} onSeek={onSeek} />

      <div className="now-playing__transport">
        <button
          type="button"
          className="now-playing__toggle"
          aria-label={playing ? "Pausar" : "Reproducir"}
          onClick={onTogglePlay}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5 19 12 8 18.5z" />
            </svg>
          )}
        </button>
        <span className="now-playing__time">
          <span className="now-playing__clock">{formatTrackTime(elapsed)}</span> /{" "}
          {formatTrackTime(track.durationSeconds)} · fragmento de muestra
        </span>
      </div>

      <p className="now-playing__note">Solo suena una pista a la vez y nunca arranca sola.</p>
    </div>
  );
}
