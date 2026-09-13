import { CATEGORIES, TRACKS } from "@/constants/repertoire.const";
import { mapAbout } from "@/services/about/about.mapper";
import { getCatalog, getGlobals } from "@/services/shared/read-cms";
import { mapCategory, mapDefaultCategory, mapDefaultTrack, mapRepertoireSection, mapTrack } from "./repertoire.mapper";
import type { RepertoireContent } from "./repertoire.types";

export async function getRepertoireData(): Promise<RepertoireContent> {
  const [{ repertoireSection, about }, catalog] = await Promise.all([getGlobals(), getCatalog()]);
  const cmsCategories = (catalog.categories ?? []).map(mapCategory);
  const mapped = catalog.tracks.map(mapTrack);
  // Both fall back together: the seed tracks point at the seed categories.
  const useCms = mapped.length > 0;
  // The card's cover is the group photo of "El cuarteto", so one upload
  // serves both blocks.
  return mapRepertoireSection(
    repertoireSection,
    mapAbout(about).photo,
    useCms ? cmsCategories : CATEGORIES.map(mapDefaultCategory),
    useCms ? mapped : TRACKS.map(mapDefaultTrack),
  );
}
