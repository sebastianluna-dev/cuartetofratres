import { HERO_MUSIC_FRAGMENTS, type MusicFragment } from "@/constants/hero-music.const";
import { engraveStaffMusic, stageMusicView, type FigurePlacement, type MusicItem } from "@/lib/engrave-staff-music";
import { MUSIC_GLYPHS } from "@/lib/music-glyphs";
import "./staff-music.comp.css";

type View = "wide" | "phone";

const VIEWS: View[] = ["wide", "phone"];

interface StageSize {
  width: number;
  height: number;
}

interface StaffMusicProps {
  /** The stage the lines are drawn on, in px, as laid out wide and on the phone. */
  stages: Record<View, StageSize>;
  /** Who stands on it, so the ink thins out over every face. */
  figures: readonly FigurePlacement[];
  /** Prefix of the glyphs' ids: unique per drawing on a page. */
  id: string;
  /** What is written where; the hero's few stretches, clear of the faces, by default. */
  fragments?: readonly MusicFragment[];
  className?: string;
}

function engrave(
  view: View,
  stages: Record<View, StageSize>,
  figures: readonly FigurePlacement[],
  fragments: readonly MusicFragment[],
) {
  return engraveStaffMusic(
    stageMusicView(stages[view], figures),
    fragments.flatMap((fragment) => {
      const stretch = fragment[view];
      return stretch ? [{ ...fragment, stretch }] : [];
    }),
  );
}

function Item({ item, glyphId }: { item: MusicItem; glyphId: (glyph: string) => string }) {
  if (item.kind === "glyph") {
    return <use href={`#${glyphId(item.glyph)}`} transform={`translate(${item.x} ${item.y}) scale(${item.scale})`} />;
  }
  if (item.kind === "shape") return <path d={item.d} />;
  return (
    <text
      className={`staff-music__text staff-music__text_style_${item.style}`}
      x={item.x}
      y={item.y}
      fontSize={item.size}
    >
      {item.text}
    </text>
  );
}

// Bars of Borodin and Pachelbel engraved on the staff lines of a stage (the
// hero's, a musician's page), a few stretches of the three curves. A Server Component: the SVG comes ready from
// the server and adds no JavaScript. Static on purpose, every fragment at once,
// with no reveal: the staff is decoration, never a sense of progress. One
// drawing per layout (wide and phone), each engraved for its stage and
// stretched with the lines, so the notes stay on them. Decorative.
export function StaffMusic({ stages, figures, id, fragments = HERO_MUSIC_FRAGMENTS, className }: StaffMusicProps) {
  const classes = ["staff-music", className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classes} aria-hidden="true">
      {VIEWS.map((view) => {
        const music = engrave(view, stages, figures, fragments);
        const glyphId = (glyph: string) => `${id}-${view}-${glyph}`;
        return (
          <svg
            key={view}
            className={`staff-music__drawing staff-music__drawing_view_${view}`}
            viewBox={`0 0 ${music.width} ${music.height}`}
            preserveAspectRatio="none"
            focusable="false"
          >
            <defs>
              {music.glyphs.map((glyph) => (
                <path key={glyph} id={glyphId(glyph)} d={MUSIC_GLYPHS[glyph]} />
              ))}
            </defs>
            {music.marks.map((mark, index) => (
              <g
                key={index}
                transform={`translate(${mark.x} ${mark.y}) rotate(${mark.angle})`}
                fillOpacity={mark.opacity}
              >
                {mark.items.map((item, i) => (
                  <Item key={i} item={item} glyphId={glyphId} />
                ))}
              </g>
            ))}
          </svg>
        );
      })}
    </div>
  );
}
