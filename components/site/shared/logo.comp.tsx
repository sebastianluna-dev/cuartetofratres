import { LOGO_MARK_PATHS, LOGO_MARK_VIEW_BOX } from "./logo-mark.const";
import "./logo.comp.css";

interface LogoProps {
  /** `ink` paints the mark in ink (for ivory grounds); `ivory` or `lime` for the dark ones. */
  theme?: "ink" | "ivory" | "lime" | "olive";
  /** Height of the mark in px; the width follows the 310×345 ratio. */
  height?: number;
  href?: string;
}

// The "CF" monogram is inlined instead of loaded as a file so the stylesheet
// can recolour it through `fill: currentColor`: the same mark is ink on the
// ivory header, lime over the hero and ivory in the footer, with no second
// file and no filter.
//
// The link has no visible text (the SVG is aria-hidden), so its accessible
// name is written here.
const LOGO_LABEL = "Cuarteto Fratres, ir al inicio";

export function Logo({ theme = "ivory", height = 46, href = "#inicio" }: LogoProps) {
  return (
    <a href={href} className={`logo logo_theme_${theme}`} aria-label={LOGO_LABEL}>
      <svg
        className="logo__image"
        viewBox={LOGO_MARK_VIEW_BOX}
        style={{ height }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        {LOGO_MARK_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </a>
  );
}
