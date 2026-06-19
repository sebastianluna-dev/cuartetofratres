import type { Category, RepertoireSection, Track } from "@/payload-types";
import {
  CATEGORIES,
  REPERTOIRE_SECTION_DEFAULTS,
  type RepertoireCategorySeed,
  type Track as TrackDefault,
} from "@/constants/repertoire.const";
import type { CategoryContent, RepertoireContent, TrackContent } from "./repertoire.types";

export function mapCategory(category: Category): CategoryContent {
  return { id: String(category.id), label: category.label, shortLabel: category.shortLabel || category.label };
}

export function mapDefaultCategory(category: RepertoireCategorySeed): CategoryContent {
  return { id: category.id, label: category.label, shortLabel: category.shortLabel || category.label };
}

function labelOf(categoryId: string | null): string {
  return CATEGORIES.find((category) => category.id === categoryId)?.label ?? "";
}

/**
 * The relationship arrives populated (depth ≥ 1) or as a bare id; only the
 * populated form carries the label. A track whose category is missing keeps
 * `categoryId: null` and shows under "Todo" alone.
 */
export function mapTrack(track: Track): TrackContent {
  const category = typeof track.category === "object" && track.category ? mapCategory(track.category) : null;
  return {
    id: String(track.id),
    title: track.title,
    composer: track.composer,
    categoryId: category?.id ?? null,
    categoryLabel: category?.label ?? "",
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
    eyebrow: section.eyebrow || defaults.eyebrow,
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
