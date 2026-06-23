import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Whether an element is on screen. The mini player shows while the track
 * plays and the card that owns it has scrolled away, so it needs to know when
 * the card leaves. Starts as `true`: nothing floats before the first
 * measurement, and a browser without IntersectionObserver never gets the bar.
 */
export function useInView<T extends HTMLElement>(rootMargin = "0px"): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
      rootMargin,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}
