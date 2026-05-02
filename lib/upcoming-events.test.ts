import { describe, expect, it } from "vitest";
import type { UpcomingEvent } from "@/constants/events.const";
import { selectUpcomingEvents, todayIso } from "./upcoming-events";

function event(id: string, date: string): UpcomingEvent {
  return { id, title: id, date, time: "20:00", city: "Xalapa", image: { src: "/x.jpg", position: "50% 50%" } };
}

describe("selectUpcomingEvents", () => {
  it("drops past events and sorts the rest by date", () => {
    const events = [event("c", "2026-12-01"), event("a", "2026-03-01"), event("b", "2026-10-24")];
    expect(selectUpcomingEvents(events, "2026-04-01").map((e) => e.id)).toEqual(["b", "c"]);
  });

  it("keeps an event that happens today", () => {
    expect(selectUpcomingEvents([event("hoy", "2026-10-24")], "2026-10-24")).toHaveLength(1);
  });
});

describe("todayIso", () => {
  it("formats the date part only", () => {
    expect(todayIso(new Date("2026-07-15T23:10:00Z"))).toBe("2026-07-15");
  });
});
