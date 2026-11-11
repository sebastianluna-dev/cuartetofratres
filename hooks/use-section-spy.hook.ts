import { useEffect, useState } from "react";
import { activeSectionIndex } from "@/lib/active-section";

interface SectionSpy {
  /** Whether the page has scrolled most of the way past the hero. */
  pastHero: boolean;
  /** Index in `anchors` of the section being read, or -1 above the first. */
  activeIndex: number;
}

/** Share of the hero that must have scrolled away before the floating nav shows. */
const HERO_SHARE = 0.72;
/** A section becomes the current one when its top crosses the middle of the viewport. */
const READING_LINE = 0.5;

/**
 * Follows the scroll for the floating nav: whether the hero is behind and
 * which of the sections named by `anchors` ("#repertorio"…) is under the
 * reading line. Read on every scroll, re-rendered only when an answer changes.
 */
export function useSectionSpy(heroId: string, anchors: readonly string[]): SectionSpy {
  const [spy, setSpy] = useState<SectionSpy>({ pastHero: false, activeIndex: -1 });

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById(heroId);
      const pastHero = window.scrollY > (hero ? hero.offsetHeight * HERO_SHARE : 420);
      const tops = anchors.map((anchor) => document.querySelector(anchor)?.getBoundingClientRect().top ?? null);
      const activeIndex = activeSectionIndex(tops, window.innerHeight * READING_LINE);
      setSpy((current) =>
        current.pastHero === pastHero && current.activeIndex === activeIndex ? current : { pastHero, activeIndex },
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [heroId, anchors]);

  return spy;
}
