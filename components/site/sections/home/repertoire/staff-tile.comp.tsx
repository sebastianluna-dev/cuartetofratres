import "./staff-tile.comp.css";

interface StaffTileProps {
  /** The treble clef of the card or the three lines with two notes of a row. */
  kind: "clef" | "notes";
  /** "cover" lays the clef over the card's photo instead of on its own tile. */
  place?: "tile" | "cover";
}

// A bit of staff as the "cover art" of a work: the clef over the quartet's
// photo on the card, three lines with two notes on each row. Decorative.
export function StaffTile({ kind, place = "tile" }: StaffTileProps) {
  return (
    <span className={`staff-tile staff-tile_kind_${kind} staff-tile_place_${place}`} aria-hidden="true">
      {kind === "clef" ? (
        <svg width="34" height="84" viewBox="0 0 64 160" focusable="false">
          <path
            d="M13 148 C8 140 16 132 24 135 C32 138 34 127 33 117 C31 94 30 72 33 52 C35 34 40 22 47 13 C56 27 54 50 42 66 C31 80 16 90 13 106 C10 124 26 137 40 130 C54 123 54 101 40 96 C30 92 23 100 27 110"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="44" height="44" viewBox="0 0 44 44" focusable="false">
          <g stroke="currentColor" strokeWidth="1" opacity="0.45" fill="none">
            <line x1="0" y1="15" x2="44" y2="15" />
            <line x1="0" y1="22" x2="44" y2="22" />
            <line x1="0" y1="29" x2="44" y2="29" />
          </g>
          <g fill="currentColor" opacity="0.85">
            <rect x="12" y="18" width="7" height="7" transform="rotate(-3 15 21)" />
            <rect x="27" y="11" width="7" height="7" transform="rotate(3 30 14)" opacity="0.6" />
          </g>
        </svg>
      )}
    </span>
  );
}
