import { getGlobals } from "@/services/shared/read-cms";
import { mapSiteSettings } from "./site-settings.mapper";
import type { SiteSettingsContent } from "./site-settings.types";

export async function getSiteSettingsData(): Promise<SiteSettingsContent> {
  const { siteSettings } = await getGlobals();
  return mapSiteSettings(siteSettings);
}
