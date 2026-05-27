import type { RepertoireCategory } from "@/constants/repertoire.const";

export interface TrackContent {
  id: string;
  title: string;
  composer: string;
  category: RepertoireCategory;
  durationSeconds: number;
}

export interface RepertoireContent {
  title: string;
  note: string;
  playerNote: string;
  emptyState: { title: string; text: string; ctaLabel: string };
  tracks: TrackContent[];
}
