import type { ContentImage } from "@/services/shared/content-image.types";

export interface EventProgramItem {
  title: string;
  composer: string | null;
}

export interface EventContent {
  id: string;
  title: string;
  /** "AAAA-MM-DD". */
  date: string;
  time: string;
  city: string;
  image: ContentImage;
  imagePosition: string;
  // Detail shown in the window that opens from the card; all optional.
  description: string | null;
  program: EventProgramItem[];
  venueName: string | null;
  venueAddress: string | null;
  /** The CMS link when given, else a Maps search built from venue and city. */
  mapsUrl: string | null;
  ticketsUrl: string | null;
  ticketsPrice: string | null;
}
