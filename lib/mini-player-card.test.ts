import { describe, expect, it } from "vitest";
import { grooveDrawing, isCardOpen, recordTapAction } from "./mini-player-card";

describe("isCardOpen", () => {
  it("opens when asked for", () => {
    expect(isCardOpen(true, true)).toBe(true);
    expect(isCardOpen(false, true)).toBe(false);
  });

  it("stays open while paused, asked for or not", () => {
    expect(isCardOpen(false, false)).toBe(true);
    expect(isCardOpen(true, false)).toBe(true);
  });
});

describe("recordTapAction", () => {
  it("plays or pauses with a pointer that can hover", () => {
    expect(recordTapAction(false, false)).toBe("toggle");
    expect(recordTapAction(false, true)).toBe("toggle");
  });

  it("opens the card on the first tap of a touch screen, then plays or pauses", () => {
    expect(recordTapAction(true, false)).toBe("open");
    expect(recordTapAction(true, true)).toBe("toggle");
  });
});

describe("grooveDrawing", () => {
  it("draws nothing played at the start", () => {
    const drawing = grooveDrawing(0);
    expect(drawing.needle).toBe(49.5);
    expect(drawing.band).toBeNull();
    expect(drawing.grooves).toEqual([]);
  });

  it("moves the needle from the edge to the label", () => {
    expect(grooveDrawing(1).needle).toBe(19);
    expect(grooveDrawing(0.5).needle).toBe(34.25);
  });

  it("fills the ring between the edge and the needle", () => {
    const { band, needle } = grooveDrawing(0.2);
    expect(band).not.toBeNull();
    expect(band!.radius + band!.width / 2).toBeCloseTo(49.5);
    expect(band!.radius - band!.width / 2).toBeCloseTo(needle);
  });

  it("draws grooves only inside the played ring, more as the work goes on", () => {
    const early = grooveDrawing(0.2);
    const late = grooveDrawing(0.8);
    expect(early.grooves.every((radius) => radius > early.needle && radius < 49.5)).toBe(true);
    expect(late.grooves.length).toBeGreaterThan(early.grooves.length);
  });

  it("clamps fractions out of range and ignores non-numbers", () => {
    expect(grooveDrawing(-1)).toEqual(grooveDrawing(0));
    expect(grooveDrawing(3)).toEqual(grooveDrawing(1));
    expect(grooveDrawing(Number.NaN)).toEqual(grooveDrawing(0));
  });
});
