import { describe, expect, it } from "vitest";
import { buildMailtoUrl } from "./build-mailto-url";

describe("buildMailtoUrl", () => {
  it("returns a bare mailto without subject", () => {
    expect(buildMailtoUrl("hola@ejemplo.com")).toBe("mailto:hola@ejemplo.com");
  });

  it("encodes the subject", () => {
    expect(buildMailtoUrl("hola@ejemplo.com", "Boda en Xalapa")).toBe(
      "mailto:hola@ejemplo.com?subject=Boda%20en%20Xalapa",
    );
  });
});
