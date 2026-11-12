import { describe, expect, it } from "vitest";
import type { Category, Track } from "@/payload-types";
import { mapCategory, mapTrack } from "./repertoire.mapper";

const CATEGORY: Category = {
  id: 2,
  order: 2,
  label: "Mexicana y latinoamericana",
  shortLabel: "Latinoamericana",
  updatedAt: "2026-06-10T00:00:00.000Z",
  createdAt: "2026-06-10T00:00:00.000Z",
};

function track(category: Track["category"]): Track {
  return {
    id: 7,
    order: 1,
    title: "Fuga y Misterio",
    composer: "Astor Piazzolla",
    category,
    durationSeconds: 210,
    updatedAt: "2026-06-10T00:00:00.000Z",
    createdAt: "2026-06-10T00:00:00.000Z",
  };
}

describe("mapCategory", () => {
  it("stringifies the id and keeps the short label", () => {
    expect(mapCategory(CATEGORY)).toEqual({
      id: "2",
      label: "Mexicana y latinoamericana",
      shortLabel: "Latinoamericana",
    });
  });

  it("uses the label as short label when the editor left it empty", () => {
    expect(mapCategory({ ...CATEGORY, shortLabel: null }).shortLabel).toBe("Mexicana y latinoamericana");
  });
});

describe("mapTrack", () => {
  it("takes the category id and label from the populated relation", () => {
    expect(mapTrack(track(CATEGORY))).toMatchObject({
      id: "7",
      categoryId: "2",
      categoryLabel: "Mexicana y latinoamericana",
    });
  });

  it("leaves a track without a populated category under 'Todo' only", () => {
    expect(mapTrack(track(2))).toMatchObject({ categoryId: null, categoryLabel: "" });
  });
});

describe("mapTrack's recording", () => {
  const AUDIO = {
    id: 3,
    title: "Fuga y Misterio",
    url: "/api/audio/file/fuga.mp3",
    updatedAt: "2026-06-10T00:00:00.000Z",
    createdAt: "2026-06-10T00:00:00.000Z",
  };

  it("has no recording and no performer while the upload is empty", () => {
    expect(mapTrack(track(CATEGORY))).toMatchObject({ audioSrc: null, performer: null });
  });

  it("reads the file's URL and the performer of a populated upload", () => {
    const mapped = mapTrack({ ...track(CATEGORY), audio: { ...AUDIO, performer: " Cuarteto Austral " } });
    expect(mapped).toMatchObject({ audioSrc: "/api/audio/file/fuga.mp3", performer: "Cuarteto Austral" });
  });

  it("leaves the performer out when it is blank: the recording is the quartet's", () => {
    expect(mapTrack({ ...track(CATEGORY), audio: { ...AUDIO, performer: "" } }).performer).toBeNull();
  });

  it("ignores an upload that arrives as a bare id", () => {
    expect(mapTrack({ ...track(CATEGORY), audio: 3 }).audioSrc).toBeNull();
  });
});
