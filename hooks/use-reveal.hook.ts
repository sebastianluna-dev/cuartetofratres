import { useEffect, useRef, useState } from "react";

/**
 * Fades a block in the first time it enters the viewport. Returns the ref to
 * attach and whether it has been seen; the stylesheet does the actual
 * transition (`reveal` / `reveal_seen` in globals.css).
 */
export function useReveal<T extends HTMLElement>(): { ref: React.RefObject<T | null>; seen: boolean } {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, seen };
}
