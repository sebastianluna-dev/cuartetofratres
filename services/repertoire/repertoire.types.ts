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
  durationSeconds: number;
}

export interface RepertoireContent {
  eyebrow: string;
  title: string;
  note: string;
  playerNote: string;
  emptyState: { title: string; text: string; ctaLabel: string };
  /** In tab order. */
  categories: CategoryContent[];
  tracks: TrackContent[];
}
