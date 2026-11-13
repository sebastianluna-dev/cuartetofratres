import { describe, expect, it } from "vitest";
import { formatEventDate, formatEventDateLong, formatEventPosterDate } from "./format-event-date";

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

describe("formatEventDateLong", () => {
  it("spells the month in Spanish without a leading zero on the day", () => {
    expect(formatEventDateLong("2026-11-08")).toBe("8 de noviembre de 2026");
  });

  it("rejects an impossible month", () => {
    expect(() => formatEventDateLong("2026-13-01")).toThrow();
  });
});

describe("formatEventPosterDate", () => {
  it("gives the day with its zero, the short month and the weekday", () => {
    expect(formatEventPosterDate("2026-10-24")).toEqual({ day: "24", month: "Oct", weekday: "Sáb" });
    expect(formatEventPosterDate("2026-11-08")).toEqual({ day: "08", month: "Nov", weekday: "Dom" });
  });

  it("rejects anything that is not a date", () => {
    expect(() => formatEventPosterDate("8 de noviembre")).toThrow();
    expect(() => formatEventPosterDate("2026-00-10")).toThrow();
  });
});
