import type { RepertoireSection, Track } from "@/payload-types";
import { REPERTOIRE_SECTION_DEFAULTS, type Track as TrackDefault } from "@/constants/repertoire.const";
import type { RepertoireContent, TrackContent } from "./repertoire.types";

export function mapTrack(track: Track): TrackContent {
  return {
    id: String(track.id),
    title: track.title,
    composer: track.composer,
    category: track.category,
    durationSeconds: track.durationSeconds,
  };
}

export function mapDefaultTrack(track: TrackDefault): TrackContent {
  return { ...track };
}

export function mapRepertoireSection(section: RepertoireSection, tracks: TrackContent[]): RepertoireContent {
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
    tracks,
  };
}
