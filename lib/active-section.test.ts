import { describe, expect, it } from "vitest";
import { activeSectionIndex } from "./active-section";

describe("activeSectionIndex", () => {
  it("is -1 while every section is still below the line", () => {
    expect(activeSectionIndex([900, 1800, 2700], 450)).toBe(-1);
  });

  it("picks the last section whose top has crossed the line", () => {
    expect(activeSectionIndex([-600, 300, 1200], 450)).toBe(1);
    expect(activeSectionIndex([-2000, -1100, -200], 450)).toBe(2);
  });

  it("skips the sections that are not on the page", () => {
    expect(activeSectionIndex([-600, null, 1200], 450)).toBe(0);
    expect(activeSectionIndex([null, null], 450)).toBe(-1);
  });
});
