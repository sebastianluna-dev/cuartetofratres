import { describe, expect, it } from "vitest";
import { selectUpcoming, todayIso } from "./upcoming-events";

describe("selectUpcoming", () => {
  it("drops past items and sorts the rest by date", () => {
    const items = [
      { id: "c", date: "2026-12-01" },
      { id: "a", date: "2026-03-01" },
      { id: "b", date: "2026-10-24" },
    ];
    expect(selectUpcoming(items, "2026-04-01").map((e) => e.id)).toEqual(["b", "c"]);
  });

  it("keeps an item that happens today", () => {
    expect(selectUpcoming([{ date: "2026-10-24" }], "2026-10-24")).toHaveLength(1);
  });
});

describe("todayIso", () => {
  it("formats the date part only", () => {
    expect(todayIso(new Date("2026-07-15T23:10:00Z"))).toBe("2026-07-15");
  });
});
