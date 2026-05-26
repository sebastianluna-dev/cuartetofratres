import { getGlobals } from "@/services/shared/read-cms";
import { mapHero } from "./hero.mapper";
import type { HeroContent } from "./hero.types";

export async function getHeroData(): Promise<HeroContent> {
  const { hero } = await getGlobals();
  return mapHero(hero);
}
