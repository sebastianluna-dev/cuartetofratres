import { useCallback, useEffect, useRef, useState } from "react";

export interface PlayerTrack {
  /** Length to show until the file says its own; the whole length when it is simulated. */
  durationSeconds: number;
  /** The recording, or `null` to simulate it. */
  audioSrc: string | null;
}

export interface SamplePlayer {
  selectedIndex: number;
  /** False until the visitor touches the transport: nothing is marked as chosen yet. */
  chosen: boolean;
  playing: boolean;
  /** Elapsed seconds of the selected track. */
  elapsed: number;
  /** Length in seconds of the selected track: the file's own once it is known. */
  duration: number;
  /** Selects a track; selecting the current one toggles play/pause. */
  select: (index: number) => void;
  togglePlay: () => void;
  /** Move to the neighbouring track and play it; both wrap around the list. */
  next: () => void;
  previous: () => void;
  /** Jumps to a fraction (0–1) of the track. */
  seek: (fraction: number) => void;
}

/**
 * Transport state of the repertoire player. A track with a recording plays it
 * through one `<audio>` element shared by the whole list, so only one work
 * sounds at a time; a track without one is simulated by a clock over its
 * length, derived from `Date.now()` so a slow tick never drifts. Nothing ever
 * starts on its own: the first sound needs the visitor's click.
 */
export function useSamplePlayer(tracks: readonly PlayerTrack[], tickMs = 250): SamplePlayer {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // The first track is the one the card is ready to play; the phone has no
  // card, so its list marks nothing until this turns true.
  const [chosen, setChosen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  // Lengths read from the files, by track index.
  const [fileDurations, setFileDurations] = useState<Record<number, number>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastTick = useRef(0);

  const track = tracks[selectedIndex];
  const src = track?.audioSrc ?? null;
  const duration = fileDurations[selectedIndex] ?? track?.durationSeconds ?? 0;

  // One element for the whole player, created on the client and released on unmount.
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);

  // Point the element at the selected recording and follow its clock.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!src) {
      audio.pause();
      return;
    }
    if (audio.getAttribute("src") !== src) {
      audio.src = src;
      audio.currentTime = 0;
    }
    const index = selectedIndex;
    const onTime = () => setElapsed(audio.currentTime);
    const onMetadata = () => {
      if (Number.isFinite(audio.duration)) {
        setFileDurations((current) => ({ ...current, [index]: audio.duration }));
      }
    };
    const onEnded = () => {
      setPlaying(false);
      setElapsed(0);
      audio.currentTime = 0;
    };
    // A file that cannot be played stops the transport instead of pretending.
    const onError = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) onMetadata();
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [src, selectedIndex]);

  // Play or pause the recording; the browser may refuse, and then nothing plays.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, src]);

  // The simulated clock, only for a track without a recording.
  useEffect(() => {
    if (!playing || src) return;
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
  }, [playing, src, duration, tickMs]);

  const select = useCallback(
    (index: number) => {
      setChosen(true);
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

  const togglePlay = useCallback(() => {
    setChosen(true);
    setPlaying((current) => !current);
  }, []);

  const step = useCallback(
    (delta: number) => {
      const count = tracks.length;
      if (count === 0) return;
      setChosen(true);
      setSelectedIndex((current) => (current + delta + count) % count);
      setElapsed(0);
      setPlaying(true);
    },
    [tracks.length],
  );
  const next = useCallback(() => step(1), [step]);
  const previous = useCallback(() => step(-1), [step]);

  const seek = useCallback(
    (fraction: number) => {
      setChosen(true);
      const clamped = Math.min(1, Math.max(0, fraction));
      const target = clamped * duration;
      if (src && audioRef.current) audioRef.current.currentTime = target;
      setElapsed(target);
    },
    [duration, src],
  );

  return { selectedIndex, chosen, playing, elapsed, duration, select, togglePlay, next, previous, seek };
}
