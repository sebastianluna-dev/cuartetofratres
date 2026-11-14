import { getImageProps } from "next/image";
import type { StaffDrawingName } from "@/constants/staff-drawings.const";
import { staffDrawingSrc } from "@/lib/staff-music-svg";
import "./staff-music.comp.css";

interface StaffMusicProps {
  /** Which staff: its stage, figures and fragments are in constants/staff-drawings.const.ts. */
  drawing: StaffDrawingName;
  /** On the first screen (the hero): fetched at once instead of when it nears the screen. */
  eager?: boolean;
  className?: string;
}

/** The stage's phone layout, the same breakpoint as the stylesheets. */
const PHONE_MEDIA = "(max-width: 760px)";

// Bars of Borodin and Pachelbel engraved on the staff lines of a stage (the
// hero's, the members', a musician's page). Static on purpose, every fragment
// at once, with no reveal: the staff is decoration, never a sense of progress.
// One drawing per layout (wide and phone), each engraved for its stage and
// stretched with the lines, so the notes stay on them. They are SVG files
// written at build time (app/(site)/partituras), not inline markup: inline,
// the music weighed most of the page, twice (HTML and RSC payload), and both
// layouts came along. `<picture>` makes the browser fetch only the one it
// shows. Decorative.
export function StaffMusic({ drawing, eager = false, className }: StaffMusicProps) {
  const classes = ["staff-music", className ?? ""].filter(Boolean).join(" ");
  const shared = { alt: "", fill: true, unoptimized: true, loading: eager ? "eager" : "lazy" } as const;
  const { props: wide } = getImageProps({ ...shared, src: staffDrawingSrc(drawing, "wide") });
  const { props: phone } = getImageProps({ ...shared, src: staffDrawingSrc(drawing, "phone") });

  return (
    <div className={classes} aria-hidden="true">
      <picture>
        <source media={PHONE_MEDIA} srcSet={phone.src} />
        {/* next/image's art direction: getImageProps and a <picture>. */}
        <img {...wide} alt="" className="staff-music__drawing" />
      </picture>
    </div>
  );
}
