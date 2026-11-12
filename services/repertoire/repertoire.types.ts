
export interface CategoryContent {
  id: string;
  label: string;
  /** What the filter tab reads; equals `label` when the editor left it empty. */
  shortLabel: string;
}

export interface TrackContent {
  id: string;
  title: string;
  composer: string;
  /** `null` when the category was deleted: the track only shows under "Todo". */
  categoryId: string | null;
  /** Full label of the category, for the now-playing card; empty when there is none. */
  categoryLabel: string;
  /** Length shown until the recording's own length is known; the length of the simulated sample when there is none. */
  durationSeconds: number;
  /** URL of the recording, or `null` while there is none and the player simulates it. */
  audioSrc: string | null;
}

export interface RepertoireContent {
  title: string;
  emptyState: { title: string; text: string; ctaLabel: string };
  /** In tab order. */
  categories: CategoryContent[];
  tracks: TrackContent[];
}
