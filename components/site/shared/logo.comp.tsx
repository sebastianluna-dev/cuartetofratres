import Link from "next/link";
import "./logo.comp.css";

interface LogoProps {
  /** `ink` paints the mark in ink (for ivory grounds); `ivory` or `lime` for the dark ones. */
  theme?: "ink" | "ivory" | "lime";
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
    <Link href={href} className={`logo logo_theme_${theme}`} aria-label={LOGO_LABEL}>
      <svg
        className="logo__image"
        viewBox="341 63 310 345"
        style={{ height }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M634 139 C601 97 561 78 511 78 C419 78 351 144 351 235 C351 326 420 386 511 386 C575 386 621 354 641 306 L633 302 C611 345 571 371 523 371 C448 371 393 316 393 232 C393 149 442 89 509 89 C556 89 591 121 615 164 L623 164 Z" />
        <path d="M474 158 H620 L624 208 H616 C601 176 576 170 539 170 H519 V249 H542 C568 249 582 243 590 229 H598 V282 H590 C582 267 568 262 542 262 H519 V364 C519 386 523 393 540 396 V403 H473 V396 C489 393 492 386 492 364 V193 C492 174 488 167 474 165 Z" />
      </svg>
    </Link>
  );
}
