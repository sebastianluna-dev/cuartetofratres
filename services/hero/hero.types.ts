import type { ContentImage } from "@/services/shared/content-image.types";

export interface HeroContent {
  title: string;
  lead: string;
  /** Always with its real size: the hero never draws the photo bigger than that. */
  image: Required<ContentImage>;
  imagePosition: string;
  listenLabel: string;
}
