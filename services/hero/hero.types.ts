import type { ContentImage } from "@/services/shared/content-image.types";

export interface HeroContent {
  title: string;
  lead: string;
  image: ContentImage;
  imagePosition: string;
  listenLabel: string;
}
