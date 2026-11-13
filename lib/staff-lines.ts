// Staff lines of the stages: groups of five curves that open and close as they
// cross the block, the quartet's staff drawn the way the hall's lines are.
// Pure and deterministic, so the SVG is rendered on the server.

export type StaffLinesKind = "hero" | "poster" | "wide";

interface StaffLinesShape {
  /** Staves (groups of five lines) in the drawing. */
  staves: number;
  width: number;
  height: number;
  /** Distance between two staves. */
  gap: number;
  /** Centre of the first staff. */
  top: number;
  /** Height of the main wave. */
  amplitude: number;
}

const SHAPES: Record<StaffLinesKind, StaffLinesShape> = {
  hero: { staves: 3, width: 100, height: 100, gap: 26, top: 22, amplitude: 9 },
  poster: { staves: 2, width: 100, height: 135, gap: 30, top: 30, amplitude: 8 },
  wide: { staves: 3, width: 200, height: 70, gap: 20, top: 14, amplitude: 6 },
};

const LINES_PER_STAFF = 5;
const STEP = 2;
/** How far the lines run past both edges, in the drawing's units. */
export const OVERSHOOT = 4;

export interface StaffLines {
  viewBox: string;
  /** The `d` attribute of every line, staff by staff. */
  paths: string[];
}

/** Opening of a staff at `u`: how far its lines stand apart, as a multiple of the narrowest. */
function opening(staff: number, u: number): number {
  return 0.75 + 1.25 * (0.5 + 0.5 * Math.sin(u / 19 + staff * 1.3 + 0.6));
}

/** Height of line `line` (0 at the top) of staff `staff` at `x`, in the drawing's units. */
export function staffLineY(kind: StaffLinesKind, staff: number, line: number, x: number): number {
  const shape = SHAPES[kind];
  // `u` keeps the wave the same whatever the width of the drawing.
  const u = (x / shape.width) * 100;
  return (
    shape.top +
    staff * shape.gap +
    (line - 2) * opening(staff, u) * 1.45 +
    shape.amplitude * Math.sin(u / 27 + staff * 0.9 + 0.4) +
    shape.amplitude * 0.28 * Math.sin(u / 9 + staff * 2.1)
  );
}

/** Height between two neighbouring lines of a staff at `x` (a staff space), in the drawing's units. */
export function staffLineSpacing(kind: StaffLinesKind, staff: number, x: number): number {
  return opening(staff, (x / SHAPES[kind].width) * 100) * 1.45;
}

/** Size of the drawing of one kind, in its own units. */
export function staffLinesSize(kind: StaffLinesKind): { width: number; height: number; staves: number } {
  const { width, height, staves } = SHAPES[kind];
  return { width, height, staves };
}

function linePath(kind: StaffLinesKind, staff: number, line: number): string {
  const shape = SHAPES[kind];
  let path = "";
  for (let x = -OVERSHOOT; x <= shape.width + OVERSHOOT; x += STEP) {
    path += `${path ? "L" : "M"}${x.toFixed(1)} ${staffLineY(kind, staff, line, x).toFixed(2)}`;
  }
  return path;
}

const cache = new Map<StaffLinesKind, StaffLines>();

/** The curves of one kind of stage, ready for an `<svg>`. */
export function staffLines(kind: StaffLinesKind): StaffLines {
  let lines = cache.get(kind);
  if (!lines) {
    const shape = SHAPES[kind];
    const paths: string[] = [];
    for (let staff = 0; staff < shape.staves; staff++) {
      for (let line = 0; line < LINES_PER_STAFF; line++) paths.push(linePath(kind, staff, line));
    }
    lines = { viewBox: `0 0 ${shape.width} ${shape.height}`, paths };
    cache.set(kind, lines);
  }
  return lines;
}
