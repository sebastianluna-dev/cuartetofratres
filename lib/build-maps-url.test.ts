import { describe, expect, it } from "vitest";
import { buildMapsUrl } from "./build-maps-url";

describe("buildMapsUrl", () => {
  it("joins the known parts into one encoded query", () => {
    expect(buildMapsUrl(["Teatro Clavijero", "Emparan 3", "Veracruz"])).toBe(
      "https://www.google.com/maps/search/?api=1&query=Teatro%20Clavijero%2C%20Emparan%203%2C%20Veracruz",
    );
  });

  it("skips empty parts", () => {
    expect(buildMapsUrl([null, "  ", "Xalapa, Veracruz"])).toBe(
      "https://www.google.com/maps/search/?api=1&query=Xalapa%2C%20Veracruz",
    );
  });

  it("returns null when nothing is known", () => {
    expect(buildMapsUrl([undefined, "", null])).toBeNull();
  });
});
