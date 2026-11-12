import { describe, expect, it } from "vitest";
import { excerpt, splitParagraphs } from "./text-blocks";

describe("splitParagraphs", () => {
  it("splits at blank lines and trims each paragraph", () => {
    expect(splitParagraphs("Uno.\n\n  Dos.\n \nTres.")).toEqual(["Uno.", "Dos.", "Tres."]);
  });

  it("keeps a single line break inside its paragraph", () => {
    expect(splitParagraphs("Uno\ny medio.")).toEqual(["Uno\ny medio."]);
  });

  it("returns nothing for an empty text", () => {
    expect(splitParagraphs("  \n\n ")).toEqual([]);
  });
});

describe("excerpt", () => {
  it("leaves a short text whole, with its spaces tidied", () => {
    expect(excerpt("  Originaria   de Tlaxcala. ", 160)).toBe("Originaria de Tlaxcala.");
  });

  it("cuts at a word, drops trailing punctuation and closes with an ellipsis", () => {
    expect(excerpt("Originario de Culiacán, Sinaloa. Inició el violín", 30)).toBe("Originario de Culiacán…");
  });

  it("never goes past the limit", () => {
    expect(excerpt("palabra ".repeat(40), 50).length).toBeLessThanOrEqual(50);
  });
});
