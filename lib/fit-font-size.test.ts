import { describe, expect, it } from "vitest";
import { fitFontSize } from "./fit-font-size";

const LIMITS = { min: 34, max: 300 };

describe("fitFontSize", () => {
  it("scales the probe size by the ratio of the widths, a hair short", () => {
    expect(fitFontSize(500, 1000, 100, LIMITS)).toBe(199);
  });

  it("never goes past the limits", () => {
    expect(fitFontSize(100, 1000, 100, LIMITS)).toBe(300);
    expect(fitFontSize(1000, 100, 100, LIMITS)).toBe(34);
  });

  it("keeps the smallest size when there is nothing to measure", () => {
    expect(fitFontSize(0, 1000, 100, LIMITS)).toBe(34);
    expect(fitFontSize(500, 0, 100, LIMITS)).toBe(34);
  });
});
