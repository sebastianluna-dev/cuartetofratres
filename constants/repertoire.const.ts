/** The repertoire has at most this many categories; "Todo" is not one of them. */
export const MAX_CATEGORIES = 5;

/** Label of the tab that shows every track. */
export const ALL_FILTER_LABEL = "Todo";

export interface RepertoireCategorySeed {
  id: string;
  label: string;
  /** What the filter tab reads; shorter than the label. */
  shortLabel: string;
}

export interface RepertoireFilter {
  /** `null` is the "Todo" tab: no filtering. */
  value: string | null;
  label: string;
}

export interface Track {
  id: string;
  title: string;
  composer: string;
  /** Id of one of `CATEGORIES`. */
  categoryId: string;
  /** Length of the sample, in seconds. Until the studio recordings exist the player only simulates it. */
  durationSeconds: number;
}

export interface RepertoireSectionDefaults {
  title: string;
  note: string;
  playerNote: string;
  emptyState: { title: string; text: string; ctaLabel: string };
}

export const REPERTOIRE_SECTION_DEFAULTS: RepertoireSectionDefaults = {
  title: "Repertorio",
  note: "Las cuatro obras están en repertorio; las grabaciones de estudio se subirán en cuanto estén listas.",
  playerNote: "Solo suena una pista a la vez y nunca arranca sola.",
  emptyState: {
    title: "Repertorio en preparación",
    text: "Estamos integrando las obras de esta categoría. Escríbenos y te compartimos las piezas disponibles para tu ceremonia o evento.",
    ctaLabel: "Consultar repertorio",
  },
};

// Seed of the categories and fallback while the CMS has none, in tab order.
export const CATEGORIES: readonly RepertoireCategorySeed[] = [
  { id: "clasico", label: "Clásico y cámara", shortLabel: "Cámara" },
  { id: "latam", label: "Mexicana y latinoamericana", shortLabel: "Latinoamericana" },
  { id: "bodas", label: "Bodas y ceremonias", shortLabel: "Bodas" },
  { id: "pop", label: "Pop y contemporáneo", shortLabel: "Pop" },
];

export const TRACKS: readonly Track[] = [
  {
    id: "danzas-latinoamericanas",
    title: "Danzas Latinoamericanas",
    composer: "José Elizondo",
    categoryId: "latam",
    durationSeconds: 210,
  },
  {
    id: "fuga-y-misterio",
    title: "Fuga y Misterio",
    composer: "Astor Piazzolla",
    categoryId: "latam",
    durationSeconds: 210,
  },
  {
    id: "borodin-cuarteto-2",
    title: "Cuarteto núm. 2 en Re mayor",
    composer: "Alexander Borodin",
    categoryId: "clasico",
    durationSeconds: 210,
  },
  {
    id: "schubert-cuarteto-14",
    title: "Cuarteto núm. 14 «La muerte y la doncella»",
    composer: "Franz Schubert",
    categoryId: "clasico",
    durationSeconds: 210,
  },
];
