import { useEffect, useRef, type RefObject } from "react";

/** Pixels per second the text travels; the loop lasts at least this long. */
const SPEED = 40;
const MIN_SECONDS = 6;

/**
 * Scrolls a one-line title sideways when it is wider than its box, the way a
 * car stereo does. The element must hold the text twice (the second copy is
 * hidden until needed) with a column gap between them; the hook measures the
 * first copy against the parent and, when it overflows, sets the distance and
 * the duration as CSS variables and adds `marquee_scrolling`. Everything is
 * written on the node, not in state: the measurement is a DOM concern and it
 * spares a re-render. Re-measured when the text changes and when the box
 * resizes.
 */
export function useMarquee<T extends HTMLElement>(text: string): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    const box = element?.parentElement;
    if (!element || !box) return;

    const measure = () => {
      const copy = element.firstElementChild;
      if (!copy) return;
      const width = copy.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
      if (width > box.clientWidth + 2) {
        const distance = width + gap;
        element.style.setProperty("--marquee-shift", `${-distance}px`);
        element.style.setProperty("--marquee-duration", `${Math.max(MIN_SECONDS, distance / SPEED).toFixed(1)}s`);
        element.classList.add("marquee_scrolling");
      } else {
        element.classList.remove("marquee_scrolling");
      }
    };

    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    return () => observer.disconnect();
  }, [text]);

  return ref;
}
