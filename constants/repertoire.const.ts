export type RepertoireCategory = "clasico" | "latam" | "bodas" | "pop";

export interface RepertoireFilter {
  /** `null` is the "Todo" tab: no filtering. */
  value: RepertoireCategory | null;
  label: string;
}

export interface Track {
  id: string;
  title: string;
  composer: string;
  category: RepertoireCategory;
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

export const CATEGORY_LABELS: Record<RepertoireCategory, string> = {
  clasico: "Clásico y cámara",
  latam: "Mexicana y latinoamericana",
  bodas: "Bodas y ceremonias",
  pop: "Pop y contemporáneo",
};

export const REPERTOIRE_FILTERS: readonly RepertoireFilter[] = [
  { value: null, label: "Todo" },
  { value: "clasico", label: "Cámara" },
  { value: "latam", label: "Latinoamericana" },
  { value: "bodas", label: "Bodas" },
  { value: "pop", label: "Pop" },
];

export const TRACKS: readonly Track[] = [
  {
    id: "danzas-latinoamericanas",
    title: "Danzas Latinoamericanas",
    composer: "José Elizondo",
    category: "latam",
    durationSeconds: 210,
  },
  {
    id: "fuga-y-misterio",
    title: "Fuga y Misterio",
    composer: "Astor Piazzolla",
    category: "latam",
    durationSeconds: 210,
  },
  {
    id: "borodin-cuarteto-2",
    title: "Cuarteto núm. 2 en Re mayor",
    composer: "Alexander Borodin",
    category: "clasico",
    durationSeconds: 210,
  },
  {
    id: "schubert-cuarteto-14",
    title: "Cuarteto núm. 14 «La muerte y la doncella»",
    composer: "Franz Schubert",
    category: "clasico",
    durationSeconds: 210,
  },
];
