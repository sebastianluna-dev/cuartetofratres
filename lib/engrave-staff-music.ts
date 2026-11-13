// Engraves short fragments of music on the hero's staff lines: the curves of
// `staffLines("hero")`, read back from lib/staff-lines.ts, carry real notes,
// each one standing on its line or space while the staff opens, closes and
// bends. Pure and deterministic, so the SVG is rendered on the server.
//
// Everything is laid out in the px of a reference layer; the component draws
// it with the same stretch as the staff lines, so the notes never leave them.
// Within a fragment, music is measured in staff spaces: each glyph is placed in
// the frame of the staff at its spot (origin on the middle line, rotated with
// the curve, its staff space the local opening of the lines).

import type { Clef, MusicNote, MusicPart } from "@/constants/hero-music.const";
import type { MusicGlyph } from "@/lib/music-glyphs";
import { OVERSHOOT, staffLineSpacing, staffLineY, staffLinesSize } from "@/lib/staff-lines";

const KIND = "hero";

// ---------------------------------------------------------------- the stage

/** The layer the staff lines fill, as a share of the stage (hero-stage.comp.css: `inset: 4% -30% 10%`). */
const LAYER_INSET = { top: 0.04, side: 0.3, bottom: 0.1 };

/** A face on the stage, in layer px: the music fades around it. */
export interface StageHead {
  x: number;
  y: number;
  /** Height of the figure, which sets how far the fade reaches. */
  size: number;
}

export interface MusicView {
  width: number;
  height: number;
  heads: StageHead[];
}

export interface FigurePlacement {
  /** Centre across, top edge and height, in percent of the stage (constants/hero-stage.const.ts). */
  x: number;
  top: number;
  height: number;
}

/** The layer of a stage of the given size, in px, and the faces of its figures (2:3 cut-outs). */
export function stageMusicView(
  stage: { width: number; height: number },
  figures: readonly FigurePlacement[],
): MusicView {
  const left = -LAYER_INSET.side * stage.width;
  const top = LAYER_INSET.top * stage.height;
  const heads = figures.map((figure) => {
    const height = (figure.height / 100) * stage.height;
    const width = (height * 2) / 3;
    const figureLeft = (figure.x / 100) * stage.width - width / 2;
    return {
      x: figureLeft + width * 0.52 - left,
      y: (figure.top / 100) * stage.height + height * 0.2 - top,
      size: height,
    };
  });
  return {
    width: stage.width * (1 + 2 * LAYER_INSET.side),
    height: stage.height * (1 - LAYER_INSET.top - LAYER_INSET.bottom),
    heads,
  };
}

/** Share of ink kept at a point: 1 away from every face, down to 0.12 on one. */
export function inkAround(heads: readonly StageHead[], x: number, y: number): number {
  let ink = 1;
  for (const head of heads) {
    const dx = (x - head.x) / (head.size * 0.15);
    const dy = (y - head.y) / (head.size * 0.19);
    ink *= 1 - 0.88 * Math.exp(-(dx * dx + dy * dy));
  }
  return Math.max(MIN_INK, ink);
}

const MIN_INK = 0.12;

// ---------------------------------------------------------------- the staff

/** A staff's middle line, sampled every quarter unit and measured along its length, in px. */
interface StaffTable {
  x: number[];
  y: number[];
  /** Vertical distance between two lines. */
  space: number[];
  angle: number[];
  length: number[];
}

const SAMPLE = 0.25;

export function staffTable(view: Pick<MusicView, "width" | "height">, staff: number): StaffTable {
  const { width, height } = staffLinesSize(KIND);
  const sx = view.width / width;
  const sy = view.height / height;
  const table: StaffTable = { x: [], y: [], space: [], angle: [], length: [0] };
  const count = Math.round((width + 2 * OVERSHOOT) / SAMPLE);
  for (let i = 0; i <= count; i++) {
    const vx = -OVERSHOOT + i * SAMPLE;
    table.x.push(vx * sx);
    table.y.push(staffLineY(KIND, staff, 2, vx) * sy);
    table.space.push(staffLineSpacing(KIND, staff, vx) * sy);
  }
  for (let i = 0; i <= count; i++) {
    const a = Math.max(0, i - 1);
    const b = Math.min(count, i + 1);
    table.angle.push(Math.atan2(table.y[b] - table.y[a], table.x[b] - table.x[a]));
    if (i)
      table.length.push(table.length[i - 1] + Math.hypot(table.x[i] - table.x[i - 1], table.y[i] - table.y[i - 1]));
  }
  return table;
}

/** Where the staff stands at a distance `u` along it. */
export interface StaffFrame {
  x: number;
  y: number;
  /** Direction of the staff, in radians. */
  angle: number;
  /** A staff space measured across the staff, in px. */
  space: number;
}

export function frameAt(table: StaffTable, u: number): StaffFrame {
  const last = table.x.length - 1;
  const at = Math.max(0, Math.min(table.length[last], u));
  let lo = 0;
  let hi = last;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (table.length[mid] < at) lo = mid;
    else hi = mid;
  }
  const f = (at - table.length[lo]) / (table.length[hi] - table.length[lo] || 1);
  const lerp = (values: number[]) => values[lo] + (values[hi] - values[lo]) * f;
  const angle = lerp(table.angle);
  return { x: lerp(table.x), y: lerp(table.y), angle, space: lerp(table.space) * Math.cos(angle) };
}

/** A point given in a frame (px, x along the staff, y down across it) on the page. */
export function framePoint(frame: StaffFrame, x: number, y: number): [number, number] {
  const cos = Math.cos(frame.angle);
  const sin = Math.sin(frame.angle);
  return [frame.x + cos * x - sin * y, frame.y + sin * x + cos * y];
}

/** Distance along the staff at an across position in the drawing's units (0–100). */
function lengthAt(table: StaffTable, vx: number): number {
  const i = Math.round((vx + OVERSHOOT) / SAMPLE);
  return table.length[Math.max(0, Math.min(table.length.length - 1, i))];
}

// ---------------------------------------------------------------- pitch

const LETTER: Record<string, number> = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };
/** The step of the bottom line: E4 in the treble clef, G2 in the bass. */
const BOTTOM_LINE: Record<Clef, number> = { g: 30, f: 18 };
/** The key of D: its two sharps, as steps. */
const KEY_OF_D: Record<Clef, number[]> = { g: [8, 5], f: [6, 3] };

/** Steps above the bottom line: even on a line (0 to 8 inside the staff), odd in a space. */
export function staffStep(pitch: string, clef: Clef): number {
  return Number.parseInt(pitch.slice(-1), 10) * 7 + LETTER[pitch[0]] - BOTTOM_LINE[clef];
}

/** Height of a step in a frame: 0 on the middle line, down is positive. */
function stepY(step: number, space: number): number {
  return ((4 - step) * space) / 2;
}

// ---------------------------------------------------------------- layout

interface PlacedNote extends MusicNote {
  index: number;
  /** Position along the fragment, in staff spaces. */
  at: number;
  step: number;
  /** Written length: a dotted note counts as its undotted value, a triplet as a quarter. */
  value: number;
  frame: StaffFrame;
  space: number;
  y: number;
  stemUp: boolean;
  opacity: number;
}

interface Layout {
  columns: Map<number, number>;
  barLines: number[];
  width: number;
}

/** One time grid for all the parts of a fragment, in staff spaces from its start. */
function layout(parts: MusicPart[], prefix: number, stretch: number): Layout {
  const onsets = new Set<number>();
  const barTimes = new Set<number>();
  const sharpAt = new Set<number>();
  let end = 0;
  for (const part of parts) {
    let time = 0;
    for (const bar of part.bars) {
      barTimes.add(time);
      for (const note of bar) {
        onsets.add(time);
        if (note.sharp) sharpAt.add(time);
        time += note.duration;
      }
    }
    end = Math.max(end, time);
    barTimes.add(time);
  }
  const times = [...new Set([...onsets, ...barTimes])].sort((a, b) => a - b);
  const columns = new Map<number, number>();
  const barLines: number[] = [];
  let x = prefix;
  times.forEach((time, i) => {
    // Every fragment closes with its bar line.
    if (barTimes.has(time) && time > 0) {
      x += 0.5;
      barLines.push(x);
      x += 1.3;
    }
    if (onsets.has(time)) {
      if (sharpAt.has(time)) x += 1.3;
      columns.set(time, x);
      const next = times[i + 1] ?? time + 1;
      x += (1 + 1.7 * Math.sqrt(next - time)) * stretch;
    }
  });
  return { columns, barLines, width: x };
}

// ---------------------------------------------------------------- output

export type MusicItem =
  | { kind: "glyph"; glyph: MusicGlyph; x: number; y: number; scale: number }
  | { kind: "shape"; d: string }
  | { kind: "text"; text: string; x: number; y: number; size: number; style: "number" | "expression" };

/** Items drawn in one frame of the staff, all with the same ink. */
export interface MusicMark {
  x: number;
  y: number;
  /** Rotation of the frame, in degrees. */
  angle: number;
  opacity: number;
  items: MusicItem[];
}

/** The centre of a notehead on the page, for checking it sits on its line or space. */
export interface NoteheadCentre {
  staff: number;
  step: number;
  x: number;
  y: number;
}

export interface EngravedMusic {
  width: number;
  height: number;
  marks: MusicMark[];
  /** Every glyph the marks use, once. */
  glyphs: MusicGlyph[];
  noteheads: NoteheadCentre[];
}

export interface FragmentPlacement {
  staff: number;
  parts: MusicPart[];
  /** From and to, across the drawing (0–100). */
  stretch: readonly [number, number];
  opacity: number;
}

/** A tenth of a px is finer than the screen shows and keeps the markup short. */
const round = (value: number) => Math.round(value * 10) / 10;
const rect = (x: number, y: number, w: number, h: number) =>
  `M${round(x)} ${round(y)}h${round(w)}v${round(h)}h${round(-w)}Z`;

class Engraver {
  marks: MusicMark[] = [];
  glyphs = new Set<MusicGlyph>();
  noteheads: NoteheadCentre[] = [];

  constructor(private readonly view: MusicView) {}

  /** Ink of a point given in a frame. */
  ink(frame: StaffFrame, y: number, base: number): number {
    const [px, py] = framePoint(frame, 0, y);
    return base * inkAround(this.view.heads, px, py);
  }

  mark(frame: StaffFrame, opacity: number, items: MusicItem[]): void {
    for (const item of items) if (item.kind === "glyph") this.glyphs.add(item.glyph);
    this.marks.push({
      x: round(frame.x),
      y: round(frame.y),
      angle: round((frame.angle * 180) / Math.PI),
      opacity: Math.round(Math.min(1, opacity) * 100) / 100,
      items,
    });
  }

  glyph(glyph: MusicGlyph, x: number, y: number, scale: number): MusicItem {
    return { kind: "glyph", glyph, x: round(x), y: round(y), scale: round(scale * 1000) / 1000 };
  }

  /** One part of a fragment; `at(x)` gives the frame for a position in staff spaces. */
  part(part: MusicPart, staff: number, grid: Layout, at: (x: number) => StaffFrame, base: number): void {
    const { clef } = part;
    const g = this.glyph.bind(this);

    // Clef, key and time.
    const clefFrame = at(0.6);
    const clefStep = clef === "g" ? 2 : 6;
    this.mark(clefFrame, this.ink(clefFrame, 0, base), [
      g(clef === "g" ? "gClef" : "fClef", 0, stepY(clefStep, clefFrame.space), clefFrame.space),
    ]);
    KEY_OF_D[clef].forEach((step, i) => {
      const frame = at(3.6 + i * 1.05);
      this.mark(frame, this.ink(frame, 0, base), [g("sharp", 0, stepY(step, frame.space), frame.space)]);
    });
    const timeFrame = at(6.1);
    this.mark(timeFrame, this.ink(timeFrame, 0, base), [g(part.time, 0, 0, timeFrame.space)]);
    if (part.barNumber) {
      const frame = at(0.4);
      const sp = frame.space;
      this.mark(frame, this.ink(frame, 0, base) * 0.75, [
        {
          kind: "text",
          text: part.barNumber,
          x: 0,
          y: round(stepY(8, sp) - sp * 3.6),
          size: round(sp * 1.05),
          style: "number",
        },
      ]);
    }

    for (const x of grid.barLines) {
      const frame = at(x);
      const sp = frame.space;
      this.mark(frame, this.ink(frame, 0, base), [
        { kind: "shape", d: rect(-sp * 0.08, stepY(8, sp), sp * 0.16, sp * 4) },
      ]);
    }

    // The notes, each in the frame at its own column.
    let time = 0;
    const notes: PlacedNote[] = part.bars.flat().map((note, index) => {
      const column = grid.columns.get(time) ?? 0;
      time += note.duration;
      const frame = at(column);
      const step = note.pitch ? staffStep(note.pitch, clef) : 4;
      const y = stepY(step, frame.space);
      return {
        ...note,
        index,
        at: column,
        step,
        value: note.dotted ? note.duration / 1.5 : note.tuplet ? 1 : note.duration,
        frame,
        space: frame.space,
        y,
        stemUp: step < 4,
        opacity: this.ink(frame, y, base),
      };
    });

    // A beamed group takes the stem direction of its note furthest from the middle line.
    const beams = groupBy(notes, (note) => note.beam);
    for (const group of beams) {
      const far = group.reduce((m, note) => (Math.abs(note.step - 4) > Math.abs(m.step - 4) ? note : m), group[0]);
      for (const note of group) note.stemUp = far.step < 4;
    }

    for (const note of notes) {
      const sp = note.space;
      const items: MusicItem[] = [];
      if (note.piano) items.push(g("piano", -sp * 0.9, stepY(0, sp) + sp * 3.4, sp));
      if (!note.pitch) {
        items.push(g("restQ", -sp * 0.54, stepY(4, sp), sp));
        this.mark(note.frame, note.opacity, items);
        continue;
      }
      for (let k = -2; k >= note.step; k -= 2)
        items.push({ kind: "shape", d: rect(-sp, stepY(k, sp) - sp * 0.08, sp * 2, sp * 0.16) });
      for (let k = 10; k <= note.step; k += 2)
        items.push({ kind: "shape", d: rect(-sp, stepY(k, sp) - sp * 0.08, sp * 2, sp * 0.16) });
      if (note.sharp) items.push(g("sharp", -sp * 1.95, note.y, sp));
      items.push(g(note.value >= 2 ? "half" : "black", -sp * 0.59, note.y, sp));
      const [cx, cy] = framePoint(note.frame, 0, note.y);
      this.noteheads.push({ staff, step: note.step, x: cx, y: cy });
      if (note.dotted) items.push(g("dot", sp * 0.85, note.y - (note.step % 2 === 0 ? sp * 0.5 : 0), sp));
      const side = note.stemUp ? 1 : -1;
      if (note.articulation === "tenuto") items.push(g("tenuto", -sp * 0.676, note.y + side * sp * 1.1, sp));
      if (note.articulation === "accent") items.push(g("accent", -sp * 0.678, note.y + side * sp * 1.6, sp));
      if (note.trill)
        items.push(g("trill", -sp * 0.9, Math.min(stepY(8, sp), note.y) - sp * (note.stemUp ? 4.6 : 2.2), sp));
      if (note.text)
        items.push({
          kind: "text",
          text: note.text,
          x: round(-sp * 0.6),
          y: round(stepY(0, sp) + sp * 3.6),
          size: round(sp * 1.3),
          style: "expression",
        });
      if (!note.beam && note.value < 4) {
        const length = Math.max(3.5 * sp, Math.abs(note.y - stepY(4, sp)) + 0.1);
        if (note.stemUp) {
          items.push({ kind: "shape", d: rect(sp * 0.47, note.y - length, sp * 0.12, length - sp * 0.17) });
          if (note.value === 0.5) items.push(g("flagUp", sp * 0.47, note.y - length, sp));
        } else {
          items.push({ kind: "shape", d: rect(-sp * 0.59, note.y + sp * 0.17, sp * 0.12, length - sp * 0.17) });
          if (note.value === 0.5) items.push(g("flagDown", -sp * 0.59, note.y + length, sp));
        }
      }
      this.mark(note.frame, note.opacity, items);
    }

    // Beams and their stems, drawn in the frame at the middle of each group.
    for (const group of beams) this.beam(group, at);

    // Ties and slurs.
    let open: PlacedNote | null = null;
    for (const note of notes) {
      if (note.tie && notes[note.index + 1])
        this.curve(notes, note, notes[note.index + 1], note.stemUp ? 1 : -1, true, at);
      if (note.slur === "(" || note.slur === "()") open = note;
      if ((note.slur === ")" || note.slur === "()") && open && open !== note) {
        this.curve(notes, open, note, open.stemUp ? 1 : -1, false, at);
        open = note.slur === "()" ? note : null;
      }
    }

    // Triplet brackets, on the stem side.
    for (const group of groupBy(notes, (note) => note.tuplet)) {
      const first = group[0];
      const last = group[group.length - 1];
      const xm = (first.at + last.at) / 2;
      const frame = at(xm);
      const sp = frame.space;
      const up = first.stemUp;
      const dir = up ? -1 : 1;
      const yy = group.reduce(
        (m, note) => {
          const y = note.y + dir * 4.3 * sp;
          return up ? Math.min(m, y) : Math.max(m, y);
        },
        up ? Infinity : -Infinity,
      );
      const xa = (first.at - xm) * sp - sp * 0.7;
      const xb = (last.at - xm) * sp + sp * 0.7;
      const w = sp * 0.1;
      const hookY = up ? yy : yy - sp * 0.6;
      this.mark(frame, Math.min(1, mean(group)) * 0.9, [
        { kind: "shape", d: rect(xa, yy, (xb - xa) / 2 - sp * 0.9, w) },
        { kind: "shape", d: rect(sp * 0.9, yy, (xb - xa) / 2 - sp * 0.9, w) },
        { kind: "shape", d: rect(xa, hookY, w, sp * 0.6) },
        { kind: "shape", d: rect(xb - w, hookY, w, sp * 0.6) },
        g("t3", -sp * 0.59, yy + sp * 0.65, sp),
      ]);
    }
  }

  beam(group: PlacedNote[], at: (x: number) => StaffFrame): void {
    const first = group[0];
    const last = group[group.length - 1];
    const xm = (first.at + last.at) / 2;
    const frame = at(xm);
    const sp = frame.space;
    const up = first.stemUp;
    const dir = up ? -1 : 1;
    const stemX = (note: PlacedNote) => (note.at - xm) * sp + (up ? sp * 0.47 : -sp * 0.59);
    const y0 = first.y + dir * 3.5 * sp;
    const y1 = last.y + dir * 3.5 * sp;
    const slope = Math.max(-sp, Math.min(sp, (y1 - y0) * 0.3));
    const xa = stemX(first);
    const xb = stemX(last);
    const line = (x: number) => y0 + (xb === xa ? 0 : (slope * (x - xa)) / (xb - xa));
    // Moved off the noteheads until every stem is long enough.
    let shift = 0;
    for (const note of group) {
      const need = up ? line(stemX(note)) - (note.y - 2.8 * sp) : note.y + 2.8 * sp - line(stemX(note));
      shift = Math.max(shift, need);
    }
    const beamY = (x: number) => line(x) - dir * shift;
    const items: MusicItem[] = group.map((note) => {
      const x = stemX(note);
      const from = note.y - (up ? sp * 0.17 : -sp * 0.17);
      const to = beamY(x);
      return { kind: "shape", d: rect(x, Math.min(from, to), sp * 0.12, Math.abs(to - from)) };
    });
    const bar = (from: number, to: number, offset: number): MusicItem => {
      const thick = sp * 0.5;
      const ya = beamY(from) - dir * offset;
      const yb = beamY(to) - dir * offset;
      const end = to + sp * 0.12;
      return {
        kind: "shape",
        d: `M${round(from)} ${round(ya)}L${round(end)} ${round(yb)}L${round(end)} ${round(yb - dir * thick)}L${round(from)} ${round(ya - dir * thick)}Z`,
      };
    };
    items.push(bar(xa, xb, 0));
    group.forEach((note, i) => {
      if (note.value !== 0.25) return;
      const next = group[i + 1];
      const prev = group[i - 1];
      const x = stemX(note);
      if (next && next.value === 0.25) items.push(bar(x, stemX(next), sp * 0.75));
      else if (!(prev && prev.value === 0.25))
        items.push(prev ? bar(x - sp * 1.1, x, sp * 0.75) : bar(x, x + sp * 1.1, sp * 0.75));
    });
    this.mark(frame, mean(group), items);
  }

  curve(
    notes: PlacedNote[],
    from: PlacedNote,
    to: PlacedNote,
    side: number,
    tie: boolean,
    at: (x: number) => StaffFrame,
  ): void {
    const xm = (from.at + to.at) / 2;
    const frame = at(xm);
    const sp = frame.space;
    const x0 = (from.at - xm) * sp + (tie ? sp * 0.75 : 0);
    const x1 = (to.at - xm) * sp - (tie ? sp * 0.75 : 0);
    const y0 = from.y + side * sp * (tie ? 0.6 : 1.05);
    const y1 = to.y + side * sp * (tie ? 0.6 : 1.05);
    let height = tie ? sp * 0.55 : sp * 0.9;
    if (!tie) {
      // A slur clears the notes under it.
      for (const note of notes.slice(from.index + 1, to.index)) {
        const t = Math.max(0.15, Math.min(0.85, ((note.at - xm) * sp - x0) / (x1 - x0 || 1)));
        const ly = y0 + (y1 - y0) * t;
        const clear = sp * (note.articulation ? 2 : 1.1);
        const reach = side > 0 ? note.y + clear - ly : ly - (note.y - clear);
        height = Math.max(height, reach / (4 * t * (1 - t)));
      }
      if (from.articulation || to.articulation) height += sp * 0.8;
    }
    height = Math.min(height, sp * 3.2);
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    const thick = sp * 0.2;
    const d =
      `M${round(x0)} ${round(y0)}Q${round(mx)} ${round(my + side * 2 * height)} ${round(x1)} ${round(y1)}` +
      `Q${round(mx)} ${round(my + side * (2 * height - thick * 2))} ${round(x0)} ${round(y0)}Z`;
    this.mark(frame, (from.opacity + to.opacity) / 2, [{ kind: "shape", d }]);
  }
}

function groupBy(notes: PlacedNote[], key: (note: PlacedNote) => string | undefined): PlacedNote[][] {
  const groups = new Map<string, PlacedNote[]>();
  for (const note of notes) {
    const k = key(note);
    if (k) groups.set(k, [...(groups.get(k) ?? []), note]);
  }
  return [...groups.values()];
}

function mean(notes: PlacedNote[]): number {
  return notes.reduce((sum, note) => sum + note.opacity, 0) / notes.length;
}

/** Room before the first note: clef, key and time. */
const PREFIX = 10;

/**
 * Writes each fragment on its staff, stretched or packed to fill its stretch
 * and centred in it. Everything in the view's px.
 */
export function engraveStaffMusic(view: MusicView, fragments: readonly FragmentPlacement[]): EngravedMusic {
  const engraver = new Engraver(view);
  for (const fragment of fragments) {
    const table = staffTable(view, fragment.staff);
    const uA = lengthAt(table, fragment.stretch[0]);
    const uB = lengthAt(table, fragment.stretch[1]);
    const space = frameAt(table, (uA + uB) / 2).space;
    const natural = layout(fragment.parts, PREFIX, 1);
    const stretch = Math.max(0.6, Math.min(2.4, ((uB - uA) / space - PREFIX) / (natural.width - PREFIX)));
    const grid = layout(fragment.parts, PREFIX, stretch);
    const start = (uA + uB) / 2 - (grid.width * space) / 2;
    const at = (x: number) => frameAt(table, start + x * space);
    for (const part of fragment.parts) engraver.part(part, fragment.staff, grid, at, fragment.opacity);
  }
  return {
    width: round(view.width),
    height: round(view.height),
    marks: engraver.marks,
    glyphs: [...engraver.glyphs],
    noteheads: engraver.noteheads,
  };
}
