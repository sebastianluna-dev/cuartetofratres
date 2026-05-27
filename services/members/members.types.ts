import type { ContentImage } from "@/services/shared/content-image.types";

export interface MemberContent {
  id: string;
  name: string;
  /** Already translated: "Violín", "Viola", "Violonchelo". */
  instrument: string;
  short: string;
  bio: string;
  photo: ContentImage;
  photoPosition: string;
}

export interface MembersSectionContent {
  eyebrow: string;
  title: string;
  hint: string;
  members: MemberContent[];
}
