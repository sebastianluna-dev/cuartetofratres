export interface TitleFontOption {
  id: string;
  /** Shown in the review panel. */
  name: string;
  group: "Serif" | "Caligráficas";
  /** `family=` value of the Google Fonts css2 API. */
  google: string;
  /** CSS font-family of the titles. */
  family: string;
  italic?: boolean;
  weight?: number;
  uppercase?: boolean;
  /** Letter spacing in em. */
  tracking?: number;
  /** Size relative to the titles' own; scripts have small bodies. */
  scale?: number;
}

/**
 * The faces the review panel can try on the section titles: the ten serif
 * and fifteen calligraphic options of propuestas-rediseno/10 and /11. Review
 * only: nothing here reaches production (the panel is not rendered there).
 */
export const TITLE_FONT_OPTIONS: readonly TitleFontOption[] = [
  {
    id: "cormorant",
    name: "Cormorant Garamond",
    group: "Serif",
    google: "Cormorant+Garamond:ital,wght@1,500",
    family: '"Cormorant Garamond", serif',
    italic: true,
    weight: 500,
  },
  {
    id: "playfair",
    name: "Playfair Display",
    group: "Serif",
    google: "Playfair+Display:ital@1",
    family: '"Playfair Display", serif',
    italic: true,
  },
  {
    id: "fraunces",
    name: "Fraunces",
    group: "Serif",
    google: "Fraunces:ital,opsz,wght@1,9..144,350",
    family: '"Fraunces", serif',
    italic: true,
    weight: 350,
  },
  {
    id: "bodoni",
    name: "Bodoni Moda",
    group: "Serif",
    google: "Bodoni+Moda:ital,opsz,wght@1,6..96,400",
    family: '"Bodoni Moda", serif',
    italic: true,
  },
  {
    id: "dm-serif",
    name: "DM Serif Display",
    group: "Serif",
    google: "DM+Serif+Display",
    family: '"DM Serif Display", serif',
  },
  { id: "gloock", name: "Gloock", group: "Serif", google: "Gloock", family: '"Gloock", serif' },
  {
    id: "italiana",
    name: "Italiana",
    group: "Serif",
    google: "Italiana",
    family: '"Italiana", serif',
    uppercase: true,
    tracking: 0.06,
  },
  {
    id: "marcellus",
    name: "Marcellus",
    group: "Serif",
    google: "Marcellus",
    family: '"Marcellus", serif',
    uppercase: true,
    tracking: 0.04,
  },
  { id: "young-serif", name: "Young Serif", group: "Serif", google: "Young+Serif", family: '"Young Serif", serif' },
  {
    id: "barlow",
    name: "Barlow Condensed",
    group: "Serif",
    google: "Barlow+Condensed:wght@600",
    family: '"Barlow Condensed", sans-serif',
    weight: 600,
    uppercase: true,
    tracking: 0.02,
  },
  {
    id: "great-vibes",
    name: "Great Vibes",
    group: "Caligráficas",
    google: "Great+Vibes",
    family: '"Great Vibes", cursive',
    scale: 1.2,
  },
  {
    id: "pinyon",
    name: "Pinyon Script",
    group: "Caligráficas",
    google: "Pinyon+Script",
    family: '"Pinyon Script", cursive',
    scale: 1.05,
  },
  {
    id: "parisienne",
    name: "Parisienne",
    group: "Caligráficas",
    google: "Parisienne",
    family: '"Parisienne", cursive',
    scale: 1.1,
  },
  {
    id: "alex-brush",
    name: "Alex Brush",
    group: "Caligráficas",
    google: "Alex+Brush",
    family: '"Alex Brush", cursive',
    scale: 1.2,
  },
  { id: "allura", name: "Allura", group: "Caligráficas", google: "Allura", family: '"Allura", cursive', scale: 1.2 },
  {
    id: "italianno",
    name: "Italianno",
    group: "Caligráficas",
    google: "Italianno",
    family: '"Italianno", cursive',
    scale: 1.4,
  },
  {
    id: "tangerine",
    name: "Tangerine",
    group: "Caligráficas",
    google: "Tangerine:wght@700",
    family: '"Tangerine", cursive',
    weight: 700,
    scale: 1.5,
  },
  {
    id: "dancing",
    name: "Dancing Script",
    group: "Caligráficas",
    google: "Dancing+Script:wght@500",
    family: '"Dancing Script", cursive',
    weight: 500,
    scale: 0.95,
  },
  {
    id: "sacramento",
    name: "Sacramento",
    group: "Caligráficas",
    google: "Sacramento",
    family: '"Sacramento", cursive',
    scale: 1.3,
  },
  {
    id: "muellerhoff",
    name: "Herr Von Muellerhoff",
    group: "Caligráficas",
    google: "Herr+Von+Muellerhoff",
    family: '"Herr Von Muellerhoff", cursive',
    scale: 1.45,
  },
  {
    id: "delafield",
    name: "Mrs Saint Delafield",
    group: "Caligráficas",
    google: "Mrs+Saint+Delafield",
    family: '"Mrs Saint Delafield", cursive',
    scale: 1.4,
  },
  {
    id: "doulaise",
    name: "Monsieur La Doulaise",
    group: "Caligráficas",
    google: "Monsieur+La+Doulaise",
    family: '"Monsieur La Doulaise", cursive',
    scale: 1.3,
  },
  {
    id: "petit-formal",
    name: "Petit Formal Script",
    group: "Caligráficas",
    google: "Petit+Formal+Script",
    family: '"Petit Formal Script", cursive',
    scale: 0.85,
  },
  {
    id: "corinthia",
    name: "Corinthia",
    group: "Caligráficas",
    google: "Corinthia",
    family: '"Corinthia", cursive',
    scale: 1.2,
  },
  {
    id: "ballet",
    name: "Ballet",
    group: "Caligráficas",
    google: "Ballet:opsz@16..72",
    family: '"Ballet", cursive',
    scale: 0.95,
  },
];
