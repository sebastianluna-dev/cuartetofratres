import "./staff-tile.comp.css";

// A bit of staff as the "cover art" of a work: three lines with two notes, on
// each row of the programme. Decorative.
export function StaffTile() {
  return (
    <span className="staff-tile" aria-hidden="true">
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
    </span>
  );
}
