import type { About } from "@/payload-types";
import { ABOUT_DEFAULTS } from "@/constants/about.const";
import { mapContentImage } from "@/services/shared/map-content-image";
import type { AboutContent } from "./about.types";

export function mapAbout(about: About): AboutContent {
  return {
    title: about.title || ABOUT_DEFAULTS.title,
    lead: about.lead || ABOUT_DEFAULTS.lead,
    photo: mapContentImage(about.photo) ?? { src: ABOUT_DEFAULTS.photo.src, alt: ABOUT_DEFAULTS.photo.alt },
  };
}
