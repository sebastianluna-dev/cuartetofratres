import { getGlobals } from "@/services/shared/read-cms";
import { mapAbout } from "./about.mapper";
import type { AboutContent } from "./about.types";

export async function getAboutData(): Promise<AboutContent> {
  const { about } = await getGlobals();
  return mapAbout(about);
}
