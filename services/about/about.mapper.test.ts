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
    expect(about.pillars).toHaveLength(3);
  });

  it("keeps the default pillars unless there are exactly three", () => {
    const two = mapAbout({
      ...EMPTY,
      pillars: [
        { title: "Uno", text: "…" },
        { title: "Dos", text: "…" },
      ],
    });
    expect(two.pillars.map((pillar) => pillar.title)).toEqual(ABOUT_DEFAULTS.pillars.map((pillar) => pillar.title));

    const three = mapAbout({
      ...EMPTY,
      pillars: [
        { title: "A", text: "a" },
        { title: "B", text: "b" },
        { title: "C", text: "c" },
      ],
    });
    expect(three.pillars.map((pillar) => pillar.title)).toEqual(["A", "B", "C"]);
  });
});
