import { describe, expect, it } from "vitest";
import { splitPosterTitle } from "./split-poster-title";

describe("splitPosterTitle", () => {
  it("sets the last word big and the rest above it", () => {
    expect(splitPosterTitle("Concierto de temporada")).toEqual({ kicker: "Concierto de", lines: ["tempo", "rada"] });
    expect(splitPosterTitle("Borodin y Schubert")).toEqual({ kicker: "Borodin y", lines: ["Schu", "bert"] });
  });

  it("keeps consonant pairs together", () => {
    expect(splitPosterTitle("Noche de cuartetos").lines).toEqual(["cuar", "tetos"]);
    expect(splitPosterTitle("Gala de estrellas").lines).toEqual(["estre", "llas"]);
  });

  it("leaves a short word whole", () => {
    expect(splitPosterTitle("De Viena")).toEqual({ kicker: "De", lines: ["Viena"] });
  });

  it("handles a one-word title and an empty one", () => {
    expect(splitPosterTitle("Eventos")).toEqual({ kicker: "", lines: ["Even", "tos"] });
    expect(splitPosterTitle("  ")).toEqual({ kicker: "", lines: [] });
  });
});
