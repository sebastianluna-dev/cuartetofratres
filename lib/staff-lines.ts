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
const OVERSHOOT = 4;

export interface StaffLines {
  viewBox: string;
  /** The `d` attribute of every line, staff by staff. */
  paths: string[];
}

function linePath(shape: StaffLinesShape, staff: number, line: number): string {
  let path = "";
  for (let x = -OVERSHOOT; x <= shape.width + OVERSHOOT; x += STEP) {
    // `u` keeps the wave the same whatever the width of the drawing.
    const u = (x / shape.width) * 100;
    const opening = 0.75 + 1.25 * (0.5 + 0.5 * Math.sin(u / 19 + staff * 1.3 + 0.6));
    const y =
      shape.top +
      staff * shape.gap +
      (line - 2) * opening * 1.45 +
      shape.amplitude * Math.sin(u / 27 + staff * 0.9 + 0.4) +
      shape.amplitude * 0.28 * Math.sin(u / 9 + staff * 2.1);
    path += `${path ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(2)}`;
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
      for (let line = 0; line < LINES_PER_STAFF; line++) paths.push(linePath(shape, staff, line));
    }
    lines = { viewBox: `0 0 ${shape.width} ${shape.height}`, paths };
    cache.set(kind, lines);
  }
  return lines;
}
