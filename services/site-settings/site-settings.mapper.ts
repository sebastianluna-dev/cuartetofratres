import type { SiteSetting } from "@/payload-types";
import { CONTACT_EMAIL, PHOTO_CREDIT, SITE_LOCATION, SITE_LOCATION_FULL, SITE_TAGLINE } from "@/constants/site.const";
import type { SiteSettingsContent } from "./site-settings.types";

function orNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

// A fresh Global has every field empty even when the config marks it required
// (Payload only validates on save), hence a fallback per field.
export function mapSiteSettings(settings: SiteSetting): SiteSettingsContent {
  return {
    tagline: settings.tagline || SITE_TAGLINE,
    email: settings.email || CONTACT_EMAIL,
    whatsapp: orNull(settings.whatsapp),
    location: settings.location || SITE_LOCATION,
    locationFull: settings.locationFull || SITE_LOCATION_FULL,
    // The quartet is only on Instagram, so it is always named (without a link
    // until its URL is set); Facebook and YouTube only appear once they have one.
    social: [
      { label: "Instagram" as const, href: orNull(settings.social?.instagram) },
      { label: "Facebook" as const, href: orNull(settings.social?.facebook) },
      { label: "YouTube" as const, href: orNull(settings.social?.youtube) },
    ].filter((network) => network.label === "Instagram" || network.href !== null),
    photoCredit: settings.photoCredit || PHOTO_CREDIT,
  };
}
