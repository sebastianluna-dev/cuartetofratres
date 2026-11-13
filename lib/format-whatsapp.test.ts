import { describe, expect, it } from "vitest";
import { formatWhatsapp } from "./format-whatsapp";

describe("formatWhatsapp", () => {
  it("groups a Mexican number as people write it", () => {
    expect(formatWhatsapp("522288265906")).toBe("+52 228 826 5906");
  });

  it("ignores spaces or signs an editor left in the field", () => {
    expect(formatWhatsapp("+52 228 826 5906")).toBe("+52 228 826 5906");
  });

  it("leaves any other number ungrouped", () => {
    expect(formatWhatsapp("34612345678")).toBe("+34612345678");
  });
});
