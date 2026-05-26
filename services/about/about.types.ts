import type { ContentImage } from "@/services/shared/content-image.types";

export interface AboutContent {
  eyebrow: string;
  title: string;
  lead: string;
  pillars: { title: string; text: string }[];
  photo: ContentImage;
  photoCaption: string;
}
