/**
 * Seconds → "m:ss", the way a player shows elapsed time. Fractions are
 * dropped, never rounded up: 59.9 s is still "0:59".
 */
export function formatTrackTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

/** The position as a screen reader says it on the progress slider: "0:43 de 3:30". */
export function formatTrackPosition(elapsedSeconds: number, totalSeconds: number): string {
  return `${formatTrackTime(elapsedSeconds)} de ${formatTrackTime(totalSeconds)}`;
}
