import { useEffect, useState, useSyncExternalStore } from "react";

export type MiniPlayerPhase = "hidden" | "shown" | "leaving";

/** How long the bar stays after a pause before it slides away. */
const PAUSE_GRACE_MS = 5000;
/** Length of the exit animation (mini-player.comp.css). */
const EXIT_MS = 350;

/**
 * The bar's life cycle, kept outside React state so the timers can drive it:
 * it shows while a track plays with the card off screen; when the card comes
 * back it leaves at once, and when the visitor pauses it waits a few seconds
 * first (they may press play again). "leaving" keeps it mounted through the
 * exit animation. Pressing play again at any point cancels the exit.
 */
class MiniPlayerPresence {
  private phase: MiniPlayerPhase = "hidden";
  private timer: ReturnType<typeof setTimeout> | null = null;
  private readonly listeners = new Set<() => void>();

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = () => this.phase;

  update(playing: boolean, cardInView: boolean) {
    this.clearTimer();
    if (playing && !cardInView) {
      this.set("shown");
      return;
    }
    if (this.phase === "hidden") return;
    if (cardInView) {
      this.leave();
      return;
    }
    this.timer = setTimeout(() => this.leave(), PAUSE_GRACE_MS);
  }

  dispose() {
    this.clearTimer();
  }

  private leave() {
    this.set("leaving");
    this.timer = setTimeout(() => this.set("hidden"), EXIT_MS);
  }

  private set(phase: MiniPlayerPhase) {
    if (phase === this.phase) return;
    this.phase = phase;
    this.listeners.forEach((listener) => listener());
  }

  private clearTimer() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }
}

const serverSnapshot = (): MiniPlayerPhase => "hidden";

export function useMiniPlayerPresence(playing: boolean, cardInView: boolean): MiniPlayerPhase {
  const [presence] = useState(() => new MiniPlayerPresence());
  const phase = useSyncExternalStore(presence.subscribe, presence.getSnapshot, serverSnapshot);

  useEffect(() => presence.update(playing, cardInView), [presence, playing, cardInView]);
  useEffect(() => () => presence.dispose(), [presence]);

  return phase;
}
