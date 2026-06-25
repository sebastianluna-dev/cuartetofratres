import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Whether an element is on screen: at least `threshold` of it (0–1). The
 * mini player shows while the track plays and the card that owns it has
 * scrolled away, so it needs to know when the card leaves. Starts as `true`:
 * nothing floats before the first measurement, and a browser without
 * IntersectionObserver never gets the bar.
 */
export function useInView<T extends HTMLElement>(threshold = 0): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    // One threshold both ways: the bar comes when less than `threshold` of
    // the card is visible and goes once at least that much is back.
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
