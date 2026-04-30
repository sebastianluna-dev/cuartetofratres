import { describe, expect, it } from "vitest";
import { formatEventDate, formatEventDateLong } from "./format-event-date";

describe("formatEventDate", () => {
  it("returns day/month with the zeros kept", () => {
    expect(formatEventDate("2026-10-24")).toBe("24/10");
    expect(formatEventDate("2026-01-05")).toBe("05/01");
  });

  it("rejects anything that is not AAAA-MM-DD", () => {
    expect(() => formatEventDate("24/10/2026")).toThrow();
    expect(() => formatEventDate("")).toThrow();
  });
});
