import { describe, expect, it } from "vitest";
import { CONTACT_EMAIL, SITE_TAGLINE } from "@/constants/site.const";
import type { SiteSetting } from "@/payload-types";
import { mapSiteSettings } from "./site-settings.mapper";

// What `findGlobal` returns before anyone has saved the Global.
const EMPTY = { id: 1 } as SiteSetting;

describe("mapSiteSettings", () => {
  it("falls back to the constants while the Global is empty", () => {
    const settings = mapSiteSettings(EMPTY);
    expect(settings.tagline).toBe(SITE_TAGLINE);
    expect(settings.email).toBe(CONTACT_EMAIL);
    expect(settings.whatsapp).toBeNull();
    expect(settings.social).toEqual([{ label: "Instagram", href: null }]);
  });

  it("treats a blank WhatsApp or social URL as not public yet", () => {
    const settings = mapSiteSettings({
      ...EMPTY,
      whatsapp: "   ",
      social: { instagram: " https://instagram.com/cuartetofratres ", facebook: "" },
    });
    expect(settings.whatsapp).toBeNull();
    expect(settings.social).toEqual([{ label: "Instagram", href: "https://instagram.com/cuartetofratres" }]);
  });

  it("names Facebook and YouTube only once they have a URL", () => {
    const settings = mapSiteSettings({ ...EMPTY, social: { youtube: "https://youtube.com/@fratres" } });
    expect(settings.social.map((network) => network.label)).toEqual(["Instagram", "YouTube"]);
  });
});
