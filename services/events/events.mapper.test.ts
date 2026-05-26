import { describe, expect, it } from "vitest";
import type { Event } from "@/payload-types";
import { isoDay, mapEvent } from "./events.mapper";

function event(overrides: Partial<Event> = {}): Event {
  return {
    id: 3,
    title: "Concierto de temporada",
    date: "2026-10-24T12:00:00.000Z",
    time: "20:00",
    city: "Boca del Río, Veracruz",
    image: {
      id: 9,
      alt: "Próxima presentación",
      url: "/api/media/file/event.jpg",
      updatedAt: "2026-05-20T00:00:00.000Z",
      createdAt: "2026-05-20T00:00:00.000Z",
    },
    imagePosition: null,
    updatedAt: "2026-05-20T00:00:00.000Z",
    createdAt: "2026-05-20T00:00:00.000Z",
    ...overrides,
  };
}

describe("isoDay", () => {
  it("keeps only the day of a Payload timestamp", () => {
    expect(isoDay("2026-11-08T12:00:00.000Z")).toBe("2026-11-08");
  });
});

describe("mapEvent", () => {
  it("maps the day, a string id and the default framing", () => {
    const mapped = mapEvent(event());
    expect(mapped).toMatchObject({ id: "3", date: "2026-10-24", imagePosition: "50% 50%" });
  });

  it("drops an event whose photo was not populated", () => {
    expect(mapEvent(event({ image: 9 }))).toBeNull();
  });
});
