import type { About } from "@/payload-types";
import { ABOUT_DEFAULTS } from "@/constants/about.const";
import { mapContentImage } from "@/services/shared/map-content-image";
import type { AboutContent } from "./about.types";

export function mapAbout(about: About): AboutContent {
  const pillars = (about.pillars ?? []).map((pillar) => ({ title: pillar.title, text: pillar.text }));
  return {
    eyebrow: about.eyebrow || ABOUT_DEFAULTS.eyebrow,
    title: about.title || ABOUT_DEFAULTS.title,
    lead: about.lead || ABOUT_DEFAULTS.lead,
    // The design has exactly three columns; anything else falls back.
    pillars: pillars.length === 3 ? pillars : [...ABOUT_DEFAULTS.pillars],
    photo: mapContentImage(about.photo) ?? { src: ABOUT_DEFAULTS.photo.src, alt: ABOUT_DEFAULTS.photo.alt },
    photoCaption: about.photoCaption || ABOUT_DEFAULTS.photoCaption,
  };
}
