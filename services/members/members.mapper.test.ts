import { describe, expect, it } from "vitest";
import type { Member } from "@/payload-types";
import { mapMember } from "./members.mapper";

function member(overrides: Partial<Member> = {}): Member {
  return {
    id: 2,
    order: 2,
    name: "Lucía Montserrat Paredes García",
    instrument: "violin",
    shortName: "Lucía Paredes",
    bio: "Originaria de Tlaxcala.",
    photo: {
      id: 5,
      alt: "Lucía Montserrat Paredes García",
      url: "/api/media/file/lucia.jpg",
      updatedAt: "2026-05-20T00:00:00.000Z",
      createdAt: "2026-05-20T00:00:00.000Z",
    },
    photoPosition: null,
    updatedAt: "2026-05-20T00:00:00.000Z",
    createdAt: "2026-05-20T00:00:00.000Z",
    ...overrides,
  };
}

describe("mapMember", () => {
  it("maps the instrument label and the short name", () => {
    expect(mapMember(member())).toMatchObject({
      id: "2",
      slug: "lucia-paredes",
      instrument: "Violín",
      shortName: "Lucía Paredes",
    });
  });

  it("shortens the full name when the editor left the short name blank", () => {
    expect(mapMember(member({ shortName: "  " }))?.shortName).toBe("Lucía Paredes");
  });

  it("takes the photo from code, whatever the CMS holds", () => {
    expect(mapMember(member({ photo: 5 }))?.photo.src).toBe("/images/stage/lucia-paredes.webp");
  });

  it("drops a member with no photo in code", () => {
    expect(mapMember(member({ shortName: "Nadie Más" }))).toBeNull();
  });
});
