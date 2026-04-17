import type { SiteConfig } from "@/types/site-config.types";

// Which blocks of the home page are rendered. A section that is not ready
// (no photos yet, no confirmed dates) is switched off here instead of being
// commented out in landing-page.tsx.
export const siteConfig: SiteConfig = {
  home: {
    sections: {
      hero: true,
      about: true,
      members: true,
      repertoire: true,
      contact: true,
    },
  },
};
