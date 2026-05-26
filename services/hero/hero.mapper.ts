import type { Hero } from "@/payload-types";
import { HERO_DEFAULTS } from "@/constants/hero.const";
import { mapContentImage } from "@/services/shared/map-content-image";
import type { HeroContent } from "./hero.types";

export function mapHero(hero: Hero): HeroContent {
  return {
    title: hero.title || HERO_DEFAULTS.title,
    lead: hero.lead || HERO_DEFAULTS.lead,
    image: mapContentImage(hero.image) ?? { src: HERO_DEFAULTS.image.src, alt: HERO_DEFAULTS.image.alt },
    imagePosition: hero.imagePosition || HERO_DEFAULTS.image.position,
    listenLabel: hero.listenLabel || HERO_DEFAULTS.listenLabel,
  };
}
