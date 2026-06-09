import type { RepertoireSection, Track } from "@/payload-types";
import {
  CATEGORIES,
  REPERTOIRE_SECTION_DEFAULTS,
  type RepertoireCategorySeed,
  type Track as TrackDefault,
} from "@/constants/repertoire.const";
import type { CategoryContent, RepertoireContent, TrackContent } from "./repertoire.types";

export function mapDefaultCategory(category: RepertoireCategorySeed): CategoryContent {
  return { id: category.id, label: category.label, shortLabel: category.shortLabel || category.label };
}

function labelOf(categoryId: string | null): string {
  return CATEGORIES.find((category) => category.id === categoryId)?.label ?? "";
}

export function mapTrack(track: Track): TrackContent {
  return {
    id: String(track.id),
    title: track.title,
    composer: track.composer,
    categoryId: track.category,
    categoryLabel: labelOf(track.category),
    durationSeconds: track.durationSeconds,
  };
}

export function mapDefaultTrack(track: TrackDefault): TrackContent {
  return {
    id: track.id,
    title: track.title,
    composer: track.composer,
    categoryId: track.categoryId,
    categoryLabel: labelOf(track.categoryId),
    durationSeconds: track.durationSeconds,
  };
}

export function mapRepertoireSection(
  section: RepertoireSection,
  categories: CategoryContent[],
  tracks: TrackContent[],
): RepertoireContent {
  const defaults = REPERTOIRE_SECTION_DEFAULTS;
  return {
    title: section.title || defaults.title,
    note: section.note || defaults.note,
    playerNote: section.playerNote || defaults.playerNote,
    emptyState: {
      title: section.emptyState?.title || defaults.emptyState.title,
      text: section.emptyState?.text || defaults.emptyState.text,
      ctaLabel: section.emptyState?.ctaLabel || defaults.emptyState.ctaLabel,
    },
    categories,
    tracks,
  };
}
