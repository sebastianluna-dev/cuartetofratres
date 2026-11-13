// The music engraved on the hero's staff lines: a bar or two of Borodin and of
// Pachelbel scattered along the three curves, with empty stretches between
// them. Art direction, not CMS content. Static on purpose: every fragment is
// drawn at once, with no reveal and no playhead, so the staff reads as
// decoration and never as progress.
//
// Sources: the LilyPond incipits on English Wikipedia, «String Quartet No. 2
// (Borodin)» (first movement: the cello's first theme, bars 1–5, and the first
// violin's second theme, bars 44–47) and «Pachelbel's Canon» (violin I and
// continuo, bars 7–10).

export type Clef = "g" | "f";
export type TimeSignature = "cut" | "common";

export interface MusicNote {
  /** Scientific pitch ("F#4"); `null` is a quarter rest. The key of D gives the sharps of F and C. */
  pitch: string | null;
  /** Length in quarter notes. */
  duration: number;
  /** Notes sharing a key are beamed together. */
  beam?: string;
  /** Notes sharing a key form a triplet. */
  tuplet?: string;
  /** Opens a slur, closes it, or closes one and opens the next. */
  slur?: "(" | ")" | "()";
  /** Tied to the next note. */
  tie?: boolean;
  dotted?: boolean;
  /** Draws a sharp before the note (one outside the key signature). */
  sharp?: boolean;
  articulation?: "tenuto" | "accent";
  trill?: boolean;
  /** Expression text under the staff. */
  text?: string;
  /** A *p* under the note. */
  piano?: boolean;
}

export interface MusicPart {
  clef: Clef;
  time: TimeSignature;
  /** Bar number over the clef; empty for none. */
  barNumber: string;
  bars: MusicNote[][];
}

function n(pitch: string | null, duration: number, marks: Omit<MusicNote, "pitch" | "duration"> = {}): MusicNote {
  return { pitch, duration, ...marks };
}

/** Borodin, String Quartet No. 2 in D, I. Allegro moderato: cello, bars 1–5 (first theme). */
export function borodinCello(phone: boolean): MusicPart[] {
  const bars = [
    [
      n(null, 1, { piano: true }),
      n("F#4", 1, { slur: "(" }),
      n("A4", 1, { slur: ")" }),
      n("F#4", 0.5, { beam: "a" }),
      n("E4", 0.5, { beam: "a" }),
    ],
    [n("D4", 1, { slur: "(" }), n("F#4", 1, { slur: ")" }), n("C#4", 1, { slur: "(" }), n("F#4", 1, { slur: ")" })],
    [n("B2", 1, { slur: "(" }), n("F#3", 1, { slur: ")" }), n("B2", 1), n("A2", 1)],
    [
      n("B2", 1),
      n("C#3", 1),
      n("D3", 2 / 3, { tuplet: "t", articulation: "tenuto", slur: "(" }),
      n("E3", 2 / 3, { tuplet: "t", articulation: "tenuto" }),
      n("F#3", 2 / 3, { tuplet: "t", articulation: "tenuto", slur: ")" }),
    ],
    [n("F#3", 1)],
  ];
  return [{ clef: "f", time: "cut", barNumber: "", bars: phone ? bars.slice(0, 2) : bars }];
}

/** Borodin, String Quartet No. 2 in D, I: first violin, bars 44–47 (second theme, cantabile). */
export function borodinViolin(phone: boolean): MusicPart[] {
  const bars = [
    [
      n("F#5", 1, { slur: "(", text: "cantabile" }),
      n("B5", 1, { slur: ")", tie: true }),
      n("B5", 0.5, { beam: "a" }),
      n("A5", 0.25, { beam: "a", slur: "(" }),
      n("B5", 0.25, { beam: "a" }),
      n("A5", 0.5, { beam: "b" }),
      n("G#5", 0.5, { beam: "b", sharp: true, slur: ")" }),
    ],
    [
      n("F#5", 0.5, { beam: "c", slur: "(" }),
      n("G#5", 0.25, { beam: "c", sharp: true }),
      n("A5", 0.25, { beam: "c" }),
      n("G#5", 0.5, { beam: "d" }),
      n("F#5", 0.5, { beam: "d", slur: ")" }),
      n("C#5", 2),
    ],
    [
      n("D5", 0.75, { dotted: true, beam: "e", slur: "(" }),
      n("E5", 0.25, { beam: "e" }),
      n("F#5", 1, { slur: ")", tie: true }),
      n("F#5", 0.5, { beam: "f" }),
      n("E5", 0.25, { beam: "f", slur: "(" }),
      n("F#5", 0.25, { beam: "f" }),
      n("E5", 0.5, { beam: "g" }),
      n("D5", 0.5, { beam: "g", slur: ")" }),
    ],
    [n("C#5", 2, { articulation: "accent" }), n("G#4", 2, { sharp: true })],
  ];
  return [{ clef: "g", time: "cut", barNumber: phone ? "" : "44", bars: phone ? bars.slice(0, 2) : bars }];
}

/** Pachelbel, Canon in D: violin I and continuo (cello), bars 7–10. */
export function pachelbel(phone: boolean): MusicPart[] {
  const violin = [
    [
      n("D4", 0.5, { beam: "a" }),
      n("F#4", 0.5, { beam: "a" }),
      n("A4", 0.5, { beam: "a" }),
      n("G4", 0.5, { beam: "a" }),
      n("F#4", 0.5, { beam: "b" }),
      n("D4", 0.5, { beam: "b" }),
      n("F#4", 0.5, { beam: "b" }),
      n("E4", 0.5, { beam: "b" }),
    ],
    [
      n("D4", 0.5, { beam: "c" }),
      n("B3", 0.5, { beam: "c" }),
      n("D4", 0.5, { beam: "c" }),
      n("A4", 0.5, { beam: "c" }),
      n("G4", 0.5, { beam: "d" }),
      n("B4", 0.5, { beam: "d" }),
      n("A4", 0.5, { beam: "d" }),
      n("G4", 0.5, { beam: "d" }),
    ],
    [
      n("F#4", 0.5, { beam: "e" }),
      n("D4", 0.5, { beam: "e" }),
      n("E4", 0.5, { beam: "e" }),
      n("C#5", 0.5, { beam: "e" }),
      n("D5", 0.5, { beam: "f" }),
      n("F#5", 0.5, { beam: "f" }),
      n("A5", 0.5, { beam: "f" }),
      n("A4", 0.5, { beam: "f" }),
    ],
    [
      n("B4", 0.5, { beam: "g" }),
      n("G4", 0.5, { beam: "g" }),
      n("A4", 0.5, { beam: "g" }),
      n("F#4", 0.5, { beam: "g" }),
      n("D4", 0.5),
      n("D5", 0.5, { beam: "h" }),
      n("D5", 0.75, { beam: "h", dotted: true, trill: true }),
      n("C#5", 0.25, { beam: "h" }),
    ],
  ];
  const bass = () => [
    [n("D3", 1), n("A2", 1), n("B2", 1), n("F#2", 1)],
    [n("G2", 1), n("D2", 1), n("G2", 1), n("A2", 1)],
  ];
  const continuo = [...bass(), ...bass()];
  return [
    { clef: "g", time: "common", barNumber: phone ? "9" : "7", bars: phone ? violin.slice(2) : violin },
    { clef: "f", time: "common", barNumber: "", bars: phone ? continuo.slice(2) : continuo },
  ];
}

/** Bars `from` to `to` (exclusive) of some parts, the bar number over the first part only. */
function excerpt(parts: MusicPart[], from: number, to: number, barNumber: string): MusicPart[] {
  return parts.map((part, index) => ({
    ...part,
    barNumber: index === 0 ? barNumber : "",
    bars: part.bars.slice(from, to),
  }));
}

/** Where a fragment is written: a stretch of a staff, from and to, in the drawing's units (0–100 across). */
export type StaffStretch = readonly [from: number, to: number];

export interface MusicFragment {
  /** Staff of `staffLines("hero")`, 0 at the top. */
  staff: number;
  parts: MusicPart[];
  /** The stretch on a wide screen and on the phone, clear of the faces. */
  wide: StaffStretch;
  phone: StaffStretch;
  /** Ink of the fragment before it fades near a face. */
  opacity: number;
}

// The phone writes the same bars as the desktop, only on other stretches; the
// phone cut of the functions above is for the longer, whole-staff excerpts.
const violin = borodinViolin(false);
const cello = borodinCello(false);
const canon = pachelbel(false);

export const HERO_MUSIC_FRAGMENTS: readonly MusicFragment[] = [
  { staff: 0, parts: excerpt(violin, 0, 1, "44"), wide: [0, 29], phone: [19, 44], opacity: 0.45 },
  { staff: 0, parts: excerpt(violin, 2, 3, "46"), wide: [64, 90], phone: [60, 82], opacity: 0.45 },
  { staff: 1, parts: excerpt(canon.slice(0, 1), 2, 3, "9"), wide: [79, 100], phone: [56, 82], opacity: 0.4 },
  { staff: 2, parts: excerpt(cello, 0, 1, ""), wide: [0, 17], phone: [19, 44], opacity: 0.45 },
];

/**
 * The stage's size, in px, that each drawing is engraved for (see
 * hero-stage.comp.css): on a wide screen the stage keeps a 1.22 ratio (taken
 * at 1440 × 900), on the phone it is the full width under the name (390 × 844).
 * At other sizes the drawing stretches with the staff lines, so every note stays
 * on its line.
 */
export const HERO_MUSIC_STAGES = {
  wide: { width: 878.4, height: 720 },
  phone: { width: 390, height: 506.4 },
} as const;
