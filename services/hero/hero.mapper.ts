import type { Hero } from "@/payload-types";
import { HERO_DEFAULTS } from "@/constants/hero.const";
import { mapContentImage } from "@/services/shared/map-content-image";
import type { HeroContent } from "./hero.types";

export function mapHero(hero: Hero): HeroContent {
  const image = mapContentImage(hero.image);
  const fallback = HERO_DEFAULTS.image;
  return {
    title: hero.title || HERO_DEFAULTS.title,
    lead: hero.lead || HERO_DEFAULTS.lead,
    // An upload whose size Payload could not read borrows the default's ratio.
    image: image
      ? { ...image, width: image.width ?? fallback.width, height: image.height ?? fallback.height }
      : { src: fallback.src, alt: fallback.alt, width: fallback.width, height: fallback.height },
    imagePosition: hero.imagePosition || HERO_DEFAULTS.image.position,
    listenLabel: hero.listenLabel || HERO_DEFAULTS.listenLabel,
    eventsHeading: hero.eventsHeading || HERO_DEFAULTS.eventsHeading,
  };
}
