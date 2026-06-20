import type { ContentImage } from "@/services/shared/content-image.types";

export interface MemberContent {
  id: string;
  /** Full name, for the accessible label of the strip. */
  name: string;
  /** The name as shown: given names and the first surname. */
  displayName: string;
  /** Already translated: "Violín", "Viola", "Violonchelo". */
  instrument: string;
  /** Given name and first surname. */
  shortName: string;
  bio: string;
  photo: ContentImage;
  photoPosition: string;
}
