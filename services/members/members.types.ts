import type { ContentImage } from "@/services/shared/content-image.types";

export interface MemberContent {
  id: string;
  name: string;
  /** Already translated: "Violín", "Viola", "Violonchelo". */
  instrument: string;
  /** Given name and first surname. */
  shortName: string;
  /** City and state, or `null` when the editor left it out. */
  origin: string | null;
  bio: string;
  photo: ContentImage;
  photoPosition: string;
}

export interface MembersSectionContent {
  eyebrow: string;
  title: string;
  members: MemberContent[];
}
