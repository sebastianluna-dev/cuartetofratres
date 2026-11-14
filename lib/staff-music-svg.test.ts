import { describe, expect, it } from "vitest";
import { STAFF_DRAWINGS, STAFF_MUSIC_INK } from "@/constants/staff-drawings.const";
import { engraveDrawing, parseStaffDrawingFile, renderStaffMusicSvg, staffDrawingSrc } from "./staff-music-svg";

describe("staff drawing files", () => {
  it("round-trips a drawing's name and view through its file name", () => {
    const src = staffDrawingSrc("member-others", "phone");
    expect(src).toBe("/partituras/member-others-phone.svg");
    expect(parseStaffDrawingFile(src.split("/").pop() ?? "")).toEqual({ name: "member-others", view: "phone" });
  });

  it("refuses anything but a drawing and a layout", () => {
    expect(parseStaffDrawingFile("hero-tablet.svg")).toBeNull();
    expect(parseStaffDrawingFile("hero-wide.png")).toBeNull();
    expect(parseStaffDrawingFile("-wide.svg")).toBeNull();
  });
});

describe("renderStaffMusicSvg", () => {
  const music = engraveDrawing(STAFF_DRAWINGS.hero, "wide");
  const svg = renderStaffMusicSvg(music, STAFF_MUSIC_INK);

  it("is a standalone SVG in the given ink, stretched to its box", () => {
    expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"')).toBe(true);
    expect(svg).toContain(`viewBox="0 0 ${music.width} ${music.height}"`);
    expect(svg).toContain('preserveAspectRatio="none"');
    expect(svg).toContain(`fill="${STAFF_MUSIC_INK}"`);
  });

  it("defines every glyph it uses once and draws every mark", () => {
    for (const glyph of music.glyphs) expect(svg.split(`id="${glyph}"`).length - 1).toBe(1);
    expect(svg.split("<g ").length - 1).toBe(music.marks.length);
    expect(music.marks.length).toBeGreaterThan(0);
  });

  it("leaves out the fragments a layout has no room for", () => {
    const phone = engraveDrawing(STAFF_DRAWINGS.members, "phone");
    const wide = engraveDrawing(STAFF_DRAWINGS.members, "wide");
    expect(phone.marks.length).toBeLessThan(wide.marks.length);
  });
});
