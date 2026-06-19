import { describe, expect, it } from "vitest";
import { ABOUT_DEFAULTS } from "@/constants/about.const";
import type { About } from "@/payload-types";
import { mapAbout } from "./about.mapper";

const EMPTY = { id: 1 } as About;

describe("mapAbout", () => {
  it("uses the default texts and photo while the Global is empty", () => {
    const about = mapAbout(EMPTY);
    expect(about.title).toBe(ABOUT_DEFAULTS.title);
    expect(about.photo.src).toBe(ABOUT_DEFAULTS.photo.src);
  });

  it("prefers what the editor wrote", () => {
    const about = mapAbout({ ...EMPTY, title: "Otro título" });
    expect(about.title).toBe("Otro título");
    expect(about.lead).toBe(ABOUT_DEFAULTS.lead);
  });
});
