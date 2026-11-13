import { HERO_MUSIC_FRAGMENTS, HERO_MUSIC_STAGES } from "@/constants/hero-music.const";
import { HERO_STAGE_FIGURES } from "@/constants/hero-stage.const";
import { engraveStaffMusic, stageMusicView, type MusicItem } from "@/lib/engrave-staff-music";
import { MUSIC_GLYPHS } from "@/lib/music-glyphs";
import "./hero-music.comp.css";

type View = keyof typeof HERO_MUSIC_STAGES;

const VIEWS: View[] = ["wide", "phone"];

function engrave(view: View) {
  return engraveStaffMusic(
    stageMusicView(HERO_MUSIC_STAGES[view], HERO_STAGE_FIGURES),
    HERO_MUSIC_FRAGMENTS.map((fragment) => ({ ...fragment, stretch: fragment[view] })),
  );
}

function Item({ item, view }: { item: MusicItem; view: View }) {
  if (item.kind === "glyph") {
    return (
      <use
        href={`#hero-music-${view}-${item.glyph}`}
        transform={`translate(${item.x} ${item.y}) scale(${item.scale})`}
      />
    );
  }
  if (item.kind === "shape") return <path d={item.d} />;
  return (
    <text
      className={`hero-music__text hero-music__text_style_${item.style}`}
      x={item.x}
      y={item.y}
      fontSize={item.size}
    >
      {item.text}
    </text>
  );
}

// Bars of Borodin and Pachelbel engraved on the hero's staff lines, a few
// stretches of the three curves. A Server Component: the SVG comes ready from
// the server and adds no JavaScript. Static on purpose, every fragment at once,
// with no reveal: the staff is decoration, never a sense of progress. One
// drawing per layout (wide and phone), each engraved for its stage and
// stretched with the lines, so the notes stay on them. Decorative.
export function HeroMusic({ className }: { className?: string }) {
  const classes = ["hero-music", className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classes} aria-hidden="true">
      {VIEWS.map((view) => {
        const music = engrave(view);
        return (
          <svg
            key={view}
            className={`hero-music__drawing hero-music__drawing_view_${view}`}
            viewBox={`0 0 ${music.width} ${music.height}`}
            preserveAspectRatio="none"
            focusable="false"
          >
            <defs>
              {music.glyphs.map((glyph) => (
                <path key={glyph} id={`hero-music-${view}-${glyph}`} d={MUSIC_GLYPHS[glyph]} />
              ))}
            </defs>
            {music.marks.map((mark, index) => (
              <g
                key={index}
                transform={`translate(${mark.x} ${mark.y}) rotate(${mark.angle})`}
                fillOpacity={mark.opacity}
              >
                {mark.items.map((item, i) => (
                  <Item key={i} item={item} view={view} />
                ))}
              </g>
            ))}
          </svg>
        );
      })}
    </div>
  );
}
