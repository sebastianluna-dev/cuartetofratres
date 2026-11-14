import type { MusicFragment } from "@/constants/hero-music.const";
import {
  engraveStaffMusic,
  stageMusicView,
  type EngravedMusic,
  type FigurePlacement,
  type MusicItem,
} from "@/lib/engrave-staff-music";
import { MUSIC_GLYPHS } from "@/lib/music-glyphs";

type View = "wide" | "phone";

export interface StaffDrawing {
  stages: Record<View, { width: number; height: number }>;
  figures: readonly FigurePlacement[];
  fragments: readonly MusicFragment[];
}

/** The music of a drawing as laid out in one view; a fragment with no stretch there is left out. */
export function engraveDrawing(drawing: StaffDrawing, view: View): EngravedMusic {
  return engraveStaffMusic(
    stageMusicView(drawing.stages[view], drawing.figures),
    drawing.fragments.flatMap((fragment) => {
      const stretch = fragment[view];
      return stretch ? [{ ...fragment, stretch }] : [];
    }),
  );
}

/** Where a drawing's file is served (app/(site)/partituras/[file]/route.ts). */
export function staffDrawingSrc(name: string, view: View): string {
  return `/partituras/${name}-${view}.svg`;
}

/** "hero-wide.svg" → name "hero", view "wide"; anything else → null. */
export function parseStaffDrawingFile(file: string): { name: string; view: View } | null {
  const match = /^(.+)-(wide|phone)\.svg$/.exec(file);
  if (!match || !match[1] || !match[2]) return null;
  return { name: match[1], view: match[2] as View };
}

function escapeXml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// An image cannot use the page's web fonts, so the text items name system
// faces close to the page's (Barlow Condensed for the numbers).
const TEXT_FONTS = {
  number: 'font-family="Arial Narrow, sans-serif" font-weight="500"',
  expression: 'font-family="Georgia, serif" font-style="italic"',
} as const;

function item(entry: MusicItem): string {
  if (entry.kind === "glyph") {
    return `<use href="#${entry.glyph}" transform="translate(${entry.x} ${entry.y}) scale(${entry.scale})"/>`;
  }
  if (entry.kind === "shape") return `<path d="${entry.d}"/>`;
  return `<text x="${entry.x}" y="${entry.y}" font-size="${entry.size}" ${TEXT_FONTS[entry.style]}>${escapeXml(entry.text)}</text>`;
}

/**
 * The engraved music as a standalone SVG document, in one ink. Stretched to
 * its box (`preserveAspectRatio="none"`), like the staff lines it rides on.
 */
export function renderStaffMusicSvg(music: EngravedMusic, ink: string): string {
  const defs = music.glyphs.map((glyph) => `<path id="${glyph}" d="${MUSIC_GLYPHS[glyph]}"/>`).join("");
  const marks = music.marks
    .map(
      (mark) =>
        `<g transform="translate(${mark.x} ${mark.y}) rotate(${mark.angle})" fill-opacity="${mark.opacity}">${mark.items.map(item).join("")}</g>`,
    )
    .join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${music.width} ${music.height}" preserveAspectRatio="none" fill="${ink}">` +
    `<defs>${defs}</defs>${marks}</svg>`
  );
}
