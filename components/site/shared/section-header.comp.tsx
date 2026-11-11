import type { ReactNode } from "react";
import { FitTitle } from "./fit-title.comp";
import "./section-header.comp.css";

interface SectionHeaderProps {
  /** Id of the title, for the section's `aria-labelledby`. */
  titleId: string;
  title: ReactNode;
  /** "(04) · Quiénes somos". */
  label: string;
  /** One short line beside the title. */
  note: string;
  ground: "ink" | "ivory";
  /** Largest size of the title in px. */
  max?: number;
}

// Header of a wide section: a one-line title that fills its column and, to
// its right, a narrow column with the section's number and a short note.
export function SectionHeader({ titleId, title, label, note, ground, max }: SectionHeaderProps) {
  return (
    <div className={`section-header section-header_ground_${ground}`}>
      <FitTitle id={titleId} max={max}>
        {title}
      </FitTitle>
      <div className="section-header__meta">
        <p className={`label${ground === "ivory" ? " label_ground_ivory" : ""}`}>{label}</p>
        <p className="section-header__note">{note}</p>
      </div>
    </div>
  );
}
