import type { ReactNode } from "react";
import Image from "next/image";
import { LOGO_MARK_PATHS, LOGO_MARK_VIEW_BOX } from "@/components/site/shared/logo-mark.const";
import { StaffLines } from "@/components/site/shared/staff-lines.comp";
import type { PosterTitle } from "@/lib/split-poster-title";
import "./poster.comp.css";

interface PosterProps {
  /** `olive` and `graphite` are the dark grounds of a date; `paper` is the invitation. */
  palette: "olive" | "graphite" | "paper";
  /** The big figure of the corner (the day) and the line under it. */
  top: ReactNode;
  topNote: string;
  /** Read up the right edge. */
  side: string;
  title: PosterTitle;
  where: string;
  note: string | null;
  /** Fused into the top of the poster; without it, the monogram takes its place. */
  photo?: { src: string; position: string };
  /** A `poster__action` button or link. */
  action?: ReactNode;
}

// A 4:5.4 poster: the date in one corner, a vertical label in the other and
// the title at the foot, its last word broken by syllables. The only place of
// the page where a title is broken like that.
export function Poster({ palette, top, topNote, side, title, where, note, photo, action }: PosterProps) {
  return (
    <article className={`poster poster_palette_${palette}`}>
      {photo ? (
        <div className="poster__photo">
          {/* A third of the row on desktop; most of the screen on the phone. */}
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="(max-width: 900px) 78vw, 33vw"
            className="poster__photo-image"
            style={{ objectPosition: photo.position }}
          />
        </div>
      ) : (
        <svg className="poster__mark" viewBox={LOGO_MARK_VIEW_BOX} aria-hidden="true" focusable="false">
          {LOGO_MARK_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      )}
      <StaffLines kind="poster" className="poster__staff" />

      <div className="poster__top">
        <p className="poster__date">
          <span className="poster__day">{top}</span>
          <span className="poster__month">{topNote}</span>
        </p>
        <span className="poster__side">{side}</span>
      </div>

      <div className="poster__bottom">
        <h3 className="poster__title">
          {title.kicker && <span className="poster__kicker">{title.kicker} </span>}
          <span className="poster__syllables">
            {title.lines.map((line, index) => (
              <span key={index} className="poster__syllable">
                {line}
              </span>
            ))}
          </span>
        </h3>
        <p className="poster__where">{where}</p>
        {note && <p className="poster__note">{note}</p>}
        {action}
      </div>
    </article>
  );
}
