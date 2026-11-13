import { describe, expect, it } from "vitest";
import { resolveRefs, sameContent, toBundleDoc } from "./cms-bundle";

describe("toBundleDoc", () => {
  it("drops ids and timestamps and turns uploads and relations into references", () => {
    const doc = toBundleDoc({
      id: 7,
      createdAt: "x",
      title: "Skyfall",
      audio: { id: 3, filename: "skyfall.mp3", mimeType: "audio/mpeg", url: "/a" },
      category: { id: 2, label: "Pop", shortLabel: "Pop", order: 4 },
      program: [{ id: "row1", title: "Obra" }],
    });
    expect(doc).toEqual({
      title: "Skyfall",
      audio: { $audio: "skyfall.mp3" },
      category: { $category: "Pop" },
      program: [{ title: "Obra" }],
    });
  });

  it("keeps a category document itself whole", () => {
    expect(toBundleDoc({ id: 1, label: "Bodas", shortLabel: "Bodas", order: 3 })).toEqual({
      label: "Bodas",
      shortLabel: "Bodas",
      order: 3,
    });
  });
});

describe("resolveRefs", () => {
  it("swaps every reference for the target's id", () => {
    const ids: Record<string, number> = { "foto.webp": 11, Pop: 4 };
    const data = resolveRefs({ photo: { $media: "foto.webp" }, category: { $category: "Pop" } }, (ref) =>
      "$media" in ref ? ids[ref.$media]! : "$category" in ref ? ids[ref.$category]! : null,
    );
    expect(data).toEqual({ photo: 11, category: 4 });
  });
});

describe("sameContent", () => {
  it("ignores key order, ids and timestamps", () => {
    expect(sameContent({ a: 1, b: [{ id: "x", c: 2 }] }, { b: [{ c: 2 }], a: 1, updatedAt: "y" })).toBe(true);
    expect(sameContent({ a: 1 }, { a: 2 })).toBe(false);
  });
});
