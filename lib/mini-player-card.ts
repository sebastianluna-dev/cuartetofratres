/** How long the card waits after the pointer and the keyboard focus leave before it hides. */
export const CARD_CLOSE_DELAY_MS = 380;
/** On a touch screen, how long the open card waits untouched before it hides while the work plays. */
export const CARD_TOUCH_IDLE_MS = 6000;

/**
 * Whether the mini player's card shows: when the visitor asked for it
 * (pointer, keyboard focus or a tap) and always while the work is paused, so
 * a paused player keeps saying what it holds.
 */
export function isCardOpen(requested: boolean, playing: boolean): boolean {
  return requested || !playing;
}

export type RecordTapAction = "open" | "toggle";

/**
 * What pressing the record does. With a pointer that can hover, the card
 * already opened on the way in, so the record plays or pauses. On a touch
 * screen there is no hover: the first tap opens the card and only the
 * following ones play or pause.
 */
export function recordTapAction(touch: boolean, cardOpen: boolean): RecordTapAction {
  return touch && !cardOpen ? "open" : "toggle";
}

/** Radii in the record's 100×100 drawing: its edge and the edge of the ink label. */
const OUTER_RADIUS = 49.5;
const INNER_RADIUS = 19;
/** Distance between two drawn grooves. */
const GROOVE_GAP = 2.3;

export interface GrooveDrawing {
  /** Radius of the needle: where the played part ends. */
  needle: number;
  /** The played ring, drawn as one wide stroke: its middle radius and its width. Null before the start. */
  band: { radius: number; width: number } | null;
  /** Radii of the grooves drawn inside the played ring, from the edge inwards. */
  grooves: number[];
}

/**
 * The progress as the record's grooves: a record is played from the edge
 * towards the label, so the played part is a ring that widens inwards as the
 * work goes on, with its grooves drawn and the needle at its inner edge.
 */
export function grooveDrawing(fraction: number): GrooveDrawing {
  const clamped = Math.min(1, Math.max(0, Number.isFinite(fraction) ? fraction : 0));
  const needle = round(OUTER_RADIUS - clamped * (OUTER_RADIUS - INNER_RADIUS));
  const band = clamped > 0 ? { radius: round((OUTER_RADIUS + needle) / 2), width: round(OUTER_RADIUS - needle) } : null;
  const grooves: number[] = [];
  for (let radius = OUTER_RADIUS - 1.4; radius > needle + 0.6; radius -= GROOVE_GAP) grooves.push(round(radius));
  return { needle, band, grooves };
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
