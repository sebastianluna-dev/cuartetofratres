import { useEffect, useRef } from "react";

const SEEN_CLASS = "reveal_seen";

/**
 * Fades a block in the first time it enters the viewport. Returns the ref to
 * attach; the element must carry the `reveal` class (globals.css) and this
 * hook adds `reveal_seen` when it is time. The class is toggled on the DOM
 * node directly, not through state: nothing else in the tree depends on it,
 * and it spares a re-render per block.
 *
 * Visitors who prefer reduced motion see everything at once, and so does any
 * browser without IntersectionObserver.
 */
export function useReveal<T extends HTMLElement>(): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.add(SEEN_CLASS);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.classList.add(SEEN_CLASS);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}
