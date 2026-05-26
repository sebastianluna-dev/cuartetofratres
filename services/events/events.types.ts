import type { ContentImage } from "@/services/shared/content-image.types";

export interface EventContent {
  id: string;
  title: string;
  /** "AAAA-MM-DD". */
  date: string;
  time: string;
  city: string;
  image: ContentImage;
  imagePosition: string;
}
