import { describe, expect, it } from "vitest";
import { formatTrackPosition, formatTrackTime } from "./format-track-time";

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

describe("formatTrackPosition", () => {
  it("joins the elapsed time and the length", () => {
    expect(formatTrackPosition(43, 210)).toBe("0:43 de 3:30");
    expect(formatTrackPosition(0, 0)).toBe("0:00 de 0:00");
  });
});
