import { describe, expect, it } from "vitest";
import { formatTrackTime } from "./format-track-time";

describe("formatTrackTime", () => {
  it("pads the seconds to two digits", () => {
    expect(formatTrackTime(0)).toBe("0:00");
    expect(formatTrackTime(7)).toBe("0:07");
    expect(formatTrackTime(65)).toBe("1:05");
    expect(formatTrackTime(210)).toBe("3:30");
  });

  it("truncates fractions instead of rounding up", () => {
    expect(formatTrackTime(59.9)).toBe("0:59");
  });

  it("never shows a negative time", () => {
    expect(formatTrackTime(-4)).toBe("0:00");
  });
});
