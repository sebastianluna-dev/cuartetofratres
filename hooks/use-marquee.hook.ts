import { useEffect, useRef, type RefObject } from "react";

/** Pixels per second the text travels; a trip lasts at least this long. */
const SPEED = 40;
const MIN_SECONDS = 6;
/** How long the title rests at its start before each trip, in ms. */
const REST_MS = 2000;

/**
 * Scrolls a one-line title sideways when it is wider than its box, the way a
 * car stereo does: it rests at its start, travels one copy's width (the
 * second copy follows it, so the loop has no gap) and lands back where it
 * began, then rests again. The element must hold the text twice (the second
 * copy is hidden until needed) with a column gap between them; the hook
 * measures the first copy against the parent and, when it overflows, adds
 * `marquee_scrolling` and plays the loop with the Web Animations API (a CSS
 * keyframe cannot take the rest as a share computed from the text's width).
 * Nothing goes to React state. Re-measured when the text changes and when the
 * box resizes; still under reduced motion.
 */
export function useMarquee<T extends HTMLElement>(text: string): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    const box = element?.parentElement;
    if (!element || !box) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animation: Animation | null = null;
    let distance = 0;

    const stop = () => {
      animation?.cancel();
      animation = null;
    };

    const measure = () => {
      const copy = element.firstElementChild;
      if (!copy) return;
      const width = copy.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
      if (width <= box.clientWidth + 2) {
        distance = 0;
        stop();
        element.classList.remove("marquee_scrolling");
        return;
      }
      element.classList.add("marquee_scrolling");
      const next = width + gap;
      if (still || (animation && next === distance)) return;
      distance = next;
      stop();
      const travel = Math.max(MIN_SECONDS * 1000, (distance / SPEED) * 1000);
      const total = REST_MS + travel;
      animation = element.animate(
        [
          { transform: "translateX(0)", offset: 0 },
          { transform: "translateX(0)", offset: REST_MS / total },
          { transform: `translateX(${-distance}px)`, offset: 1 },
        ],
        { duration: total, iterations: Infinity, easing: "linear" },
      );
    };

    measure();
    if (typeof ResizeObserver === "undefined") return stop;
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [text]);

  return ref;
}
