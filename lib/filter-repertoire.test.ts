import { describe, expect, it } from "vitest";
import { TRACKS } from "@/constants/repertoire.const";
import { filterRepertoire } from "./filter-repertoire";

describe("filterRepertoire", () => {
  it("returns every track for the 'Todo' filter", () => {
    expect(filterRepertoire(TRACKS, null)).toHaveLength(TRACKS.length);
  });

  it("keeps only the tracks of the category", () => {
    const latam = filterRepertoire(TRACKS, "latam");
    expect(latam.length).toBeGreaterThan(0);
    expect(latam.every((track) => track.categoryId === "latam")).toBe(true);
  });

  it("returns an empty list for a category with no recordings yet", () => {
    expect(filterRepertoire(TRACKS, "pop")).toEqual([]);
  });

  it("shows a track without category only under 'Todo'", () => {
    const orphan = { id: "x", categoryId: null };
    expect(filterRepertoire([orphan], null)).toEqual([orphan]);
    expect(filterRepertoire([orphan], "latam")).toEqual([]);
  });
});
