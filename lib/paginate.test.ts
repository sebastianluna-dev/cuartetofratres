import { describe, expect, it } from "vitest";
import { pageCount, pageItems } from "./paginate";

const EIGHT = [1, 2, 3, 4, 5, 6, 7, 8];

describe("pageCount", () => {
  it("rounds up and never goes below one page", () => {
    expect(pageCount(8, 6)).toBe(2);
    expect(pageCount(6, 6)).toBe(1);
    expect(pageCount(0, 6)).toBe(1);
  });
});

describe("pageItems", () => {
  it("cuts the list into pages", () => {
    expect(pageItems(EIGHT, 0, 6)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(pageItems(EIGHT, 1, 6)).toEqual([7, 8]);
  });

  it("clamps a page out of range to the nearest one", () => {
    expect(pageItems(EIGHT, 5, 6)).toEqual([7, 8]);
    expect(pageItems(EIGHT, -1, 6)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("returns nothing for an empty list", () => {
    expect(pageItems([], 0, 6)).toEqual([]);
  });
});
