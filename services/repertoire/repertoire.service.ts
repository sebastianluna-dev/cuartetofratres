import { CATEGORIES, TRACKS } from "@/constants/repertoire.const";
import { getCatalog, getGlobals } from "@/services/shared/read-cms";
import { mapDefaultCategory, mapDefaultTrack, mapRepertoireSection, mapTrack } from "./repertoire.mapper";
import type { RepertoireContent } from "./repertoire.types";

export async function getRepertoireData(): Promise<RepertoireContent> {
  const [{ repertoireSection }, { tracks }] = await Promise.all([getGlobals(), getCatalog()]);
  const categories = CATEGORIES.map(mapDefaultCategory);
  const mapped = tracks.map(mapTrack);
  return mapRepertoireSection(repertoireSection, categories, mapped.length > 0 ? mapped : TRACKS.map(mapDefaultTrack));
}
