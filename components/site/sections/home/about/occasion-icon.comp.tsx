import type { ReactNode } from "react";
import "./occasion-icon.comp.css";

// One flute of the toast, drawn upright around its own rim centre.
const FLUTE = (
  <>
    <path className="occasion-icon__line" d="M-4.2 0h8.4l-1 11.5c-.2 2.3-1.6 3.5-3.2 3.5s-3-1.2-3.2-3.5z" />
    <path className="occasion-icon__line" d="M0 15v9.5M-4 24.5h8" />
  </>
);

// Ink line drawings in a 48 × 48 box, in the order of `OCCASIONS`: a violin
// (concerts), two rings (weddings), a toast (private events).
const DRAWINGS: readonly ReactNode[] = [
  <>
    <path
      className="occasion-icon__line"
      d="M24 19c-4.6 0-8 2.9-8 6.6 0 2.2 1.6 3.2 1.6 4.9 0 1.6-2.6 3.1-2.6 6.9C15 41.4 19 44 24 44s9-2.6 9-6.6c0-3.8-2.6-5.3-2.6-6.9 0-1.7 1.6-2.7 1.6-4.9 0-3.7-3.4-6.6-8-6.6z"
    />
    <path
      className="occasion-icon__line"
      d="M24 19V7.5M21.3 7.5h5.4M21 11h6M21 36.5h6M20.3 29.8c-.9 1.2-.9 2.6 0 3.8M27.7 29.8c.9 1.2.9 2.6 0 3.8"
    />
    <circle className="occasion-icon__line" cx="24" cy="5.2" r="1.9" />
  </>,
  <>
    <circle className="occasion-icon__line" cx="18" cy="30" r="10" />
    <circle className="occasion-icon__line" cx="30" cy="30" r="10" />
    <path className="occasion-icon__line" d="M18 12.5l3.5 3.5-3.5 4-3.5-4zM14.5 16h7" />
  </>,
  <>
    <g transform="translate(19.5 14) rotate(14)">{FLUTE}</g>
    <g transform="translate(28.5 14) rotate(-14)">{FLUTE}</g>
    <path className="occasion-icon__line" d="M24 4.5v4M18.5 6.5l1.8 3M29.5 6.5l-1.8 3" />
  </>,
];

/** The duotone mark of an occasion: an ink line over an offset, faint ink wash. Decorative. */
export function OccasionIcon({ index }: { index: number }) {
  return (
    <svg className="occasion-icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle className="occasion-icon__wash" cx="28.5" cy="28" r="15" />
      {DRAWINGS[index % DRAWINGS.length]}
    </svg>
  );
}
