import { STAFF_DRAWINGS, STAFF_MUSIC_INK, STAFF_VIEWS, type StaffDrawingName } from "@/constants/staff-drawings.const";
import { engraveDrawing, parseStaffDrawingFile, renderStaffMusicSvg } from "@/lib/staff-music-svg";

// The engraved staffs as static SVG files, written at build time
// (constants/staff-drawings.const.ts): /partituras/hero-wide.svg and so on.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(STAFF_DRAWINGS).flatMap((name) => STAFF_VIEWS.map((view) => ({ file: `${name}-${view}.svg` })));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const parsed = parseStaffDrawingFile((await params).file);
  if (!parsed || !(parsed.name in STAFF_DRAWINGS)) return new Response("Not found", { status: 404 });
  const drawing = STAFF_DRAWINGS[parsed.name as StaffDrawingName];
  const svg = renderStaffMusicSvg(engraveDrawing(drawing, parsed.view), STAFF_MUSIC_INK);
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
