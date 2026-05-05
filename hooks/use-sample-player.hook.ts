import { useCallback, useEffect, useRef, useState } from "react";

export interface SamplePlayer {
  selectedIndex: number;
  playing: boolean;
  /** Elapsed seconds of the selected track. */
  elapsed: number;
  /** Selects a track; selecting the current one toggles play/pause. */
  select: (index: number) => void;
  togglePlay: () => void;
  /** Jumps to a fraction (0–1) of the track. */
  seek: (fraction: number) => void;
}

/**
 * Transport state of the repertoire player. There are no recordings yet, so
 * "playing" only advances a clock over the track's length; when the audio
 * files exist, this is the one place that has to change. The elapsed time is
 * derived from `Date.now()` so a slow tick never drifts.
 */
export function useSamplePlayer(durations: readonly number[], tickMs = 250): SamplePlayer {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const lastTick = useRef(0);

  const duration = durations[selectedIndex] ?? 0;

  useEffect(() => {
    if (!playing) return;
    lastTick.current = Date.now();
    const timer = setInterval(() => {
      const now = Date.now();
      const delta = (now - lastTick.current) / 1000;
      lastTick.current = now;
      setElapsed((current) => {
        const next = current + delta;
        if (next >= duration) {
          setPlaying(false);
          return 0;
        }
        return next;
      });
    }, tickMs);
    return () => clearInterval(timer);
  }, [playing, duration, tickMs]);

  const select = useCallback(
    (index: number) => {
      if (index === selectedIndex) {
        setPlaying((current) => !current);
        return;
      }
      setSelectedIndex(index);
      setElapsed(0);
      setPlaying(true);
    },
    [selectedIndex],
  );

  const togglePlay = useCallback(() => setPlaying((current) => !current), []);

  const seek = useCallback(
    (fraction: number) => {
      const clamped = Math.min(1, Math.max(0, fraction));
      setElapsed(clamped * duration);
    },
    [duration],
  );

  return { selectedIndex, playing, elapsed, select, togglePlay, seek };
}
