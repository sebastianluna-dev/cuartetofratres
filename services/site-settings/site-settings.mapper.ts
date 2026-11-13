import type { SiteSetting } from "@/payload-types";
import {
  CONTACT_EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PHOTO_CREDIT,
  SITE_LOCATION,
  SITE_LOCATION_FULL,
  SITE_TAGLINE,
} from "@/constants/site.const";
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
    // The quartet is on Instagram and Facebook, so both are always there (their
    // known URLs while the CMS fields are empty); YouTube only once it has one.
    social: [
      { label: "Instagram" as const, href: orNull(settings.social?.instagram) ?? INSTAGRAM_URL },
      { label: "Facebook" as const, href: orNull(settings.social?.facebook) ?? FACEBOOK_URL },
      { label: "YouTube" as const, href: orNull(settings.social?.youtube) },
    ].filter((network) => network.href !== null),
    photoCredit: settings.photoCredit || PHOTO_CREDIT,
  };
}
