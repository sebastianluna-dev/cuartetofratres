import { useEffect, useState } from "react";

/**
 * Whether the page has scrolled past the hero. The header is transparent on
 * the dark photo and turns solid ivory once the light sections start, so it
 * needs to know where that edge is: `heroId` names the section to measure.
 *
 * Read on every scroll but only re-rendered when the answer changes.
 */
export function useHeaderScroll(heroId: string, offset = 90): boolean {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById(heroId);
      const limit = hero ? hero.offsetHeight - offset : 420;
      setPastHero(window.scrollY > limit);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroId, offset]);

  return pastHero;
}
