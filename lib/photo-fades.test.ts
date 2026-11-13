import { describe, expect, it } from "vitest";
import { photoFadeStyle } from "./photo-fades";

describe("photoFadeStyle", () => {
  it("writes each edge the photo cuts, and 0% for the others", () => {
    expect(photoFadeStyle({ left: 14, bottom: 30 })).toEqual({
      "--fade-left": "14%",
      "--fade-right": "0%",
      "--fade-bottom": "30%",
    });
  });
});
