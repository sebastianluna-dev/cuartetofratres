import { CATEGORIES, TRACKS } from "@/constants/repertoire.const";
import { getCatalog, getGlobals } from "@/services/shared/read-cms";
import { mapCategory, mapDefaultCategory, mapDefaultTrack, mapRepertoireSection, mapTrack } from "./repertoire.mapper";
import type { RepertoireContent } from "./repertoire.types";

export async function getRepertoireData(): Promise<RepertoireContent> {
  const [{ repertoireSection }, catalog] = await Promise.all([getGlobals(), getCatalog()]);
  const cmsCategories = (catalog.categories ?? []).map(mapCategory);
  const mapped = catalog.tracks.map(mapTrack);
  // Both fall back together: the seed tracks point at the seed categories.
  const useCms = mapped.length > 0;
  return mapRepertoireSection(
    repertoireSection,
    useCms ? cmsCategories : CATEGORIES.map(mapDefaultCategory),
    useCms ? mapped : TRACKS.map(mapDefaultTrack),
  );
}
