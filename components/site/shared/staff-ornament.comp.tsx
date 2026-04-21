import "./staff-ornament.comp.css";

interface StaffOrnamentProps {
  /** Ink strokes on ivory, lime strokes on ink. */
  theme?: "ink" | "ivory";
  /** Drawn width in px; the height keeps the 200×34 ratio. */
  width?: number;
}

// A short musical staff — four lines, a double bar and three "notes" — used
// as the mark next to every eyebrow. Decorative, so hidden from readers.
export function StaffOrnament({ theme = "ink", width = 200 }: StaffOrnamentProps) {
  return (
    <svg
      className={`staff-ornament staff-ornament_theme_${theme}`}
      width={width}
      height={(width * 34) / 200}
      viewBox="0 0 200 34"
      aria-hidden="true"
      focusable="false"
    >
      <g className="staff-ornament__lines">
        <line x1="0" y1="5" x2="200" y2="5" />
        <line x1="0" y1="13" x2="200" y2="13" />
        <line x1="0" y1="23" x2="200" y2="23" />
        <line x1="0" y1="31" x2="200" y2="31" />
        <line x1="82" y1="1" x2="82" y2="34" />
        <line x1="89" y1="1" x2="89" y2="34" />
      </g>
      <g className="staff-ornament__notes">
        <rect x="22" y="9" width="8" height="8" transform="rotate(-3 26 13)" />
        <rect x="120" y="27" width="8" height="8" />
        <rect x="168" y="17" width="8" height="9" transform="rotate(2 172 21)" />
      </g>
    </svg>
  );
}
