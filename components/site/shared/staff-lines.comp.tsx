import { staffLines, type StaffLinesKind } from "@/lib/staff-lines";
import "./staff-lines.comp.css";

interface StaffLinesProps {
  kind: StaffLinesKind;
  /** The parent's own class: it places the layer and sets its colour, opacity and mask. */
  className?: string;
}

// The quartet's staff as the lines of a stage: groups of five curves behind
// the musicians, the posters and the closing band. Decorative.
export function StaffLines({ kind, className }: StaffLinesProps) {
  const { viewBox, paths } = staffLines(kind);
  const classes = ["staff-lines", className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classes} aria-hidden="true">
      <svg className="staff-lines__drawing" viewBox={viewBox} preserveAspectRatio="none" focusable="false">
        {paths.map((d, index) => (
          <path key={index} className="staff-lines__line" d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
    </div>
  );
}
