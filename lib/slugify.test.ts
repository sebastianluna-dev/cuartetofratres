import { describe, expect, it } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
  it("drops the accents and joins the words with hyphens", () => {
    expect(slugify("José Sánchez")).toBe("jose-sanchez");
    expect(slugify("Lucía Paredes")).toBe("lucia-paredes");
  });

  it("keeps the ñ's letter and collapses separators", () => {
    expect(slugify("  Iñaki   Núñez-Ruiz ")).toBe("inaki-nunez-ruiz");
  });

  it("returns an empty string when nothing is left", () => {
    expect(slugify(" «» ")).toBe("");
  });
});
