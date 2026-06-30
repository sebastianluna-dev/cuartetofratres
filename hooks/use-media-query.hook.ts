import { useCallback, useSyncExternalStore } from "react";

/**
 * Whether a media query matches, kept in sync with the viewport. Read
 * through `useSyncExternalStore`, so the server (and the first client render)
 * assume `false` and there is nothing to reconcile after hydration.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
