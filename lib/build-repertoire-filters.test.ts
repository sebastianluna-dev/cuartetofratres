import { describe, expect, it } from "vitest";
import { buildRepertoireFilters } from "./build-repertoire-filters";

describe("buildRepertoireFilters", () => {
  it("puts 'Todo' first and one tab per category", () => {
    const filters = buildRepertoireFilters([
      { id: "1", label: "Clásico y cámara", shortLabel: "Cámara" },
      { id: "2", label: "Bodas y ceremonias", shortLabel: "Bodas" },
    ]);
    expect(filters).toEqual([
      { value: null, label: "Todo" },
      { value: "1", label: "Cámara" },
      { value: "2", label: "Bodas" },
    ]);
  });

  it("falls back to the full label when there is no short one", () => {
    expect(buildRepertoireFilters([{ id: "1", label: "Tango", shortLabel: "" }])[1]?.label).toBe("Tango");
  });

  it("is just 'Todo' without categories", () => {
    expect(buildRepertoireFilters([])).toEqual([{ value: null, label: "Todo" }]);
  });
});
