import { describe, expect, it } from "vitest";
import { splitPrice } from "./split-price";

describe("splitPrice", () => {
  it("splits the tiers on middle dots", () => {
    expect(splitPrice("$250 general · $150 estudiantes")).toEqual(["$250 general", "$150 estudiantes"]);
  });

  it("accepts slashes and pipes too", () => {
    expect(splitPrice("$250 / $150 | Entrada libre")).toEqual(["$250", "$150", "Entrada libre"]);
  });

  it("keeps a single price as one line and drops empty parts", () => {
    expect(splitPrice("Entrada libre ·")).toEqual(["Entrada libre"]);
  });
});
