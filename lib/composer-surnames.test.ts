import { describe, expect, it } from "vitest";
import { composerSurnames } from "./composer-surnames";

describe("composerSurnames", () => {
  it("joins the surnames in programme order", () => {
    expect(composerSurnames([{ composer: "Aleksandr Borodín" }, { composer: "José Elizondo" }])).toBe(
      "Borodín · Elizondo",
    );
  });

  it("names a composer once and skips works without one", () => {
    expect(composerSurnames([{ composer: "Franz Schubert" }, { composer: null }, { composer: "Franz Schubert" }])).toBe(
      "Schubert",
    );
  });

  it("is null when the programme names nobody", () => {
    expect(composerSurnames([])).toBeNull();
    expect(composerSurnames([{ composer: " " }])).toBeNull();
  });
});
