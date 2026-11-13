export interface StageFigure {
  id: string;
  /** Full cut-out on a transparent ground, under public/images/stage. */
  src: string;
  /** Centre of the figure across the stage and its top edge, in percent of the stage. */
  x: number;
  top: number;
  /** Height in percent of the stage; the width follows the 2:3 file. */
  height: number;
  /** Stacking order: the higher stands in front. */
  layer: number;
  /** How far the figure follows the pointer; the ones in front move more. */
  depth: number;
  /** Share of the file that fades out on an edge the photo itself cuts, in percent. */
  fade?: { left?: number; right?: number; bottom?: number };
}

// The hero's stage is art direction, not CMS content: four cut-outs placed by
// hand so that the heads read the same size although the photos were framed
// differently (the cellist's is a much tighter shot, hence his place in front).
// Seating order, left to right, in percent of the centred stage (see
// hero-stage.comp.css). A new photo means new numbers here.
export const HERO_STAGE_FIGURES: readonly StageFigure[] = [
  {
    id: "jesus-medina",
    src: "/images/stage/jesus-medina.webp",
    x: 14.8,
    top: 6,
    height: 90,
    layer: 2,
    depth: 0.5,
    fade: { left: 7 },
  },
  {
    id: "lucia-paredes",
    src: "/images/stage/lucia-paredes.webp",
    x: 37.9,
    top: 1.5,
    height: 100,
    layer: 3,
    depth: 0.8,
  },
  {
    id: "ricardo-sanchez",
    src: "/images/stage/ricardo-sanchez.webp",
    x: 62.1,
    top: 5.5,
    height: 94,
    layer: 2,
    depth: 0.6,
  },
  {
    id: "alfonso-perez",
    src: "/images/stage/alfonso-perez.webp",
    x: 85.2,
    top: 27,
    height: 68,
    layer: 4,
    depth: 1.1,
    fade: { left: 9, right: 9, bottom: 30 },
  },
];
