export interface SocialLink {
  label: "Instagram" | "Facebook" | "YouTube";
  /** `null` while the account is not public: the footer shows the name without a link. */
  href: string | null;
}

export interface SiteSettingsContent {
  tagline: string;
  email: string;
  /** Digits with country code, or `null` while it is "por confirmar". */
  whatsapp: string | null;
  location: string;
  locationFull: string;
  social: SocialLink[];
  photoCredit: string;
}
