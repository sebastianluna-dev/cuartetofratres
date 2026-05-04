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
