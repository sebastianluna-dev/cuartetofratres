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

  it("drops an unpublished event and keeps one with the flag unset", () => {
    expect(mapEvent(event({ published: false }))).toBeNull();
    expect(mapEvent(event({ published: null }))).not.toBeNull();
  });

  it("leaves the detail empty when the editor filled nothing", () => {
    const mapped = mapEvent(event());
    expect(mapped).toMatchObject({
      description: null,
      program: [],
      venueName: null,
      venueAddress: null,
      mapsUrl: null,
      ticketsUrl: null,
      ticketPrices: [],
    });
  });

  it("maps the program and blanks a missing composer", () => {
    const mapped = mapEvent(event({ program: [{ title: "Notturno", composer: "" }, { title: "Fuga y Misterio" }] }));
    expect(mapped?.program).toEqual([
      { title: "Notturno", composer: null },
      { title: "Fuga y Misterio", composer: null },
    ]);
  });

  it("maps the prices and blanks a missing label", () => {
    const mapped = mapEvent(
      event({
        tickets: {
          prices: [
            { amount: "$250", label: "general" },
            { amount: "Sin costo", label: " " },
          ],
        },
      }),
    );
    expect(mapped?.ticketPrices).toEqual([
      { amount: "$250", label: "general" },
      { amount: "Sin costo", label: null },
    ]);
  });

  it("builds the maps link from venue and city when the editor gave none", () => {
    const mapped = mapEvent(event({ venue: { name: "Teatro Clavijero", address: "Emparan 3" } }));
    expect(mapped?.mapsUrl).toBe(
      "https://www.google.com/maps/search/?api=1&query=Teatro%20Clavijero%2C%20Emparan%203%2C%20Boca%20del%20R%C3%ADo%2C%20Veracruz",
    );
  });

  it("prefers the editor's maps link", () => {
    const mapped = mapEvent(event({ venue: { name: "Teatro", mapsUrl: " https://maps.app.goo.gl/abc " } }));
    expect(mapped?.mapsUrl).toBe("https://maps.app.goo.gl/abc");
  });
});
