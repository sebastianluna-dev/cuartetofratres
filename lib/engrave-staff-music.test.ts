import { describe, expect, it } from "vitest";
import { HERO_MUSIC_FRAGMENTS, HERO_MUSIC_STAGES } from "@/constants/hero-music.const";
import { HERO_STAGE_FIGURES } from "@/constants/hero-stage.const";
import { MUSIC_GLYPHS } from "./music-glyphs";
import { staffLineSpacing, staffLineY } from "./staff-lines";
import {
  engraveStaffMusic,
  frameAt,
  framePoint,
  inkAround,
  stageMusicView,
  staffStep,
  staffTable,
  type MusicView,
} from "./engrave-staff-music";

const views = {
  wide: stageMusicView(HERO_MUSIC_STAGES.wide, HERO_STAGE_FIGURES),
  phone: stageMusicView(HERO_MUSIC_STAGES.phone, HERO_STAGE_FIGURES),
};

function engrave(view: MusicView, size: "wide" | "phone") {
  return engraveStaffMusic(
    view,
    HERO_MUSIC_FRAGMENTS.flatMap((fragment) => {
      const stretch = fragment[size];
      return stretch ? [{ ...fragment, stretch }] : [];
    }),
  );
}

describe("stageMusicView", () => {
  it("spans the staff lines' layer of the stage", () => {
    const view = stageMusicView({ width: 100, height: 200 }, []);
    expect(view.width).toBeCloseTo(160);
    expect(view.height).toBeCloseTo(172);
  });

  it("finds each face a fifth of the way down its figure", () => {
    const [head] = stageMusicView({ width: 100, height: 100 }, [{ x: 50, top: 10, height: 60 }]).heads;
    expect(head.x).toBeCloseTo(30 + 50 - 20 + 40 * 0.52);
    expect(head.y).toBeCloseTo(10 + 12 - 4);
    expect(head.size).toBe(60);
  });
});

describe("inkAround", () => {
  const heads = [{ x: 100, y: 100, size: 200 }];

  it("keeps all the ink away from the faces and almost none on one", () => {
    expect(inkAround(heads, 900, 900)).toBeCloseTo(1);
    expect(inkAround(heads, 100, 100)).toBeCloseTo(0.12);
  });
});

describe("staffStep", () => {
  it("counts steps from the bottom line of each clef", () => {
    expect(staffStep("E4", "g")).toBe(0);
    expect(staffStep("F#5", "g")).toBe(8);
    expect(staffStep("B4", "g")).toBe(4);
    expect(staffStep("G2", "f")).toBe(0);
    expect(staffStep("D3", "f")).toBe(4);
  });
});

describe("staffTable and frameAt", () => {
  it("follow the hero's middle line and its opening", () => {
    const view = views.wide;
    const table = staffTable(view, 1);
    const frame = frameAt(table, table.length[200]);
    const vx = -4 + 200 * 0.25;
    expect(frame.x).toBeCloseTo((vx / 100) * view.width);
    expect(frame.y).toBeCloseTo((staffLineY("hero", 1, 2, vx) / 100) * view.height);
    expect(frame.space).toBeCloseTo((staffLineSpacing("hero", 1, vx) / 100) * view.height * Math.cos(frame.angle));
  });

  it("turns a frame's point with the curve", () => {
    const [x, y] = framePoint({ x: 10, y: 20, angle: Math.PI / 2, space: 1 }, 2, 0);
    expect(x).toBeCloseTo(10);
    expect(y).toBeCloseTo(22);
  });
});

describe("engraveStaffMusic", () => {
  for (const size of ["wide", "phone"] as const) {
    const view = views[size];
    const music = engrave(view, size);

    it(`keeps every notehead on its line or space (${size})`, () => {
      expect(music.noteheads.length).toBeGreaterThan(20);
      for (const head of music.noteheads) {
        const vx = (head.x / view.width) * 100;
        // Line `line` from the top; a space is halfway between two lines.
        const line = (8 - head.step) / 2;
        const expected = (staffLineY("hero", head.staff, line, vx) / 100) * view.height;
        const space = (staffLineSpacing("hero", head.staff, vx) / 100) * view.height;
        expect(Math.abs(head.y - expected)).toBeLessThan(space * 0.2);
      }
    });

    it(`writes each fragment inside its stretch (${size})`, () => {
      const left = Math.min(...music.noteheads.map((head) => head.x));
      const right = Math.max(...music.noteheads.map((head) => head.x));
      expect(left).toBeGreaterThan(0);
      expect(right).toBeLessThan(view.width);
    });

    it(`only uses glyphs it has outlines for (${size})`, () => {
      for (const glyph of music.glyphs) expect(MUSIC_GLYPHS[glyph]).toBeTruthy();
      expect(music.glyphs).toEqual(expect.arrayContaining(["gClef", "fClef", "sharp", "black"]));
    });

    it(`keeps the ink between the face floor and the fragment's own (${size})`, () => {
      for (const mark of music.marks) {
        expect(mark.opacity).toBeGreaterThan(0);
        expect(mark.opacity).toBeLessThanOrEqual(0.45);
      }
    });
  }

  it("is deterministic", () => {
    expect(engrave(views.wide, "wide")).toEqual(engrave(views.wide, "wide"));
  });
});
