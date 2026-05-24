import { describe, expect, it } from "vitest";
import type { Media } from "@/payload-types";
import { mapContentImage } from "./map-content-image";

function media(overrides: Partial<Media> = {}): Media {
  return {
    id: 1,
    alt: "Retrato",
    url: "/api/media/file/retrato.jpg",
    width: 1200,
    height: 1600,
    updatedAt: "2026-05-20T00:00:00.000Z",
    createdAt: "2026-05-20T00:00:00.000Z",
    ...overrides,
  };
}

describe("mapContentImage", () => {
  it("maps a populated upload with its size", () => {
    expect(mapContentImage(media())).toEqual({
      src: "/api/media/file/retrato.jpg",
      alt: "Retrato",
      width: 1200,
      height: 1600,
    });
  });

  it("returns null for an id, an empty value or a document without URL", () => {
    expect(mapContentImage(7)).toBeNull();
    expect(mapContentImage(null)).toBeNull();
    expect(mapContentImage(undefined)).toBeNull();
    expect(mapContentImage(media({ url: null }))).toBeNull();
  });

  it("leaves the size undefined when Payload did not read it", () => {
    const image = mapContentImage(media({ width: null, height: null }));
    expect(image?.width).toBeUndefined();
    expect(image?.height).toBeUndefined();
  });
});
