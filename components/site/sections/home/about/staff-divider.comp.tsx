import "./staff-divider.comp.css";

// Full-width musical staff that closes the section: four lines, two double
// bars and a scattering of notes. Purely decorative.
const NOTES = [
  { x: 24, y: 12, w: 11, h: 11 },
  { x: 118, y: 34, w: 12, h: 14, rotate: -3 },
  { x: 228, y: 52, w: 10, h: 11, opacity: 0.62 },
  { x: 298, y: 66, w: 12, h: 13, rotate: 2 },
  { x: 404, y: 104, w: 11, h: 11 },
  { x: 512, y: 94, w: 11, h: 12, rotate: -2 },
  { x: 642, y: 80, w: 12, h: 12 },
  { x: 726, y: 98, w: 11, h: 11, rotate: 3 },
  { x: 834, y: 76, w: 11, h: 12 },
  { x: 1012, y: 62, w: 12, h: 12, rotate: -2 },
  { x: 1128, y: 34, w: 11, h: 12 },
  { x: 1214, y: 10, w: 9, h: 10, opacity: 0.8 },
] as const;

export function StaffDivider() {
  return (
    <div className="staff-divider" aria-hidden="true">
      <svg className="staff-divider__svg" viewBox="0 0 1280 120" focusable="false">
        <g className="staff-divider__lines">
          <line x1="0" y1="26" x2="1280" y2="26" />
          <line x1="0" y1="50" x2="1280" y2="50" />
          <line x1="0" y1="76" x2="1280" y2="76" />
          <line x1="0" y1="98" x2="1280" y2="98" />
          <line x1="352" y1="18" x2="352" y2="106" />
          <line x1="362" y1="18" x2="362" y2="106" />
          <line x1="946" y1="18" x2="946" y2="106" />
          <line x1="956" y1="18" x2="956" y2="106" />
        </g>
        <g className="staff-divider__notes">
          {NOTES.map((note) => (
            <rect
              key={`${note.x}-${note.y}`}
              x={note.x}
              y={note.y}
              width={note.w}
              height={note.h}
              opacity={"opacity" in note ? note.opacity : undefined}
              transform={
                "rotate" in note ? `rotate(${note.rotate} ${note.x + note.w / 2} ${note.y + note.h / 2})` : undefined
              }
            />
          ))}
          <circle cx="396" cy="110" r="3.6" />
        </g>
      </svg>
    </div>
  );
}
