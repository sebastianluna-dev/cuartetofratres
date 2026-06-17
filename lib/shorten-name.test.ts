import { describe, expect, it } from "vitest";
import { shortenName } from "./shorten-name";

describe("shortenName", () => {
  it("keeps the given name and the first surname of a four-word name", () => {
    expect(shortenName("Jesús Guadalupe Medina Corrales")).toBe("Jesús Medina");
  });

  it("drops the second surname of a three-word name", () => {
    expect(shortenName("Alfonso Pérez Valencia")).toBe("Alfonso Pérez");
  });

  it("leaves a two-word name alone", () => {
    expect(shortenName("Lucía Paredes")).toBe("Lucía Paredes");
  });

  it("ignores stray spaces", () => {
    expect(shortenName("  José  Ricardo Sánchez  Jiménez ")).toBe("José Sánchez");
  });
});
