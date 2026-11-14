import { HERO_MUSIC_FRAGMENTS, HERO_MUSIC_STAGES, RUNNING_MUSIC_FRAGMENTS } from "@/constants/hero-music.const";
import { HERO_STAGE_FIGURES } from "@/constants/hero-stage.const";
import {
  MEMBER_MUSIC_STAGES,
  MEMBER_OTHERS_MUSIC_STAGES,
  MEMBER_STAGE_FIGURE,
  MEMBERS_MUSIC_STAGES,
} from "@/constants/members.const";

/**
 * Every staff of engraved music on the site: the stage it is laid out on
 * (wide and on the phone), who stands on it and what is written. Each one is
 * served as a static SVG file per layout (app/(site)/partituras), so the
 * music is not inlined in the page twice (HTML and RSC payload) and the
 * browser fetches only the layout it shows.
 */
export const STAFF_DRAWINGS = {
  hero: { stages: HERO_MUSIC_STAGES, figures: HERO_STAGE_FIGURES, fragments: HERO_MUSIC_FRAGMENTS },
  members: { stages: MEMBERS_MUSIC_STAGES, figures: [], fragments: RUNNING_MUSIC_FRAGMENTS },
  member: { stages: MEMBER_MUSIC_STAGES, figures: MEMBER_STAGE_FIGURE, fragments: HERO_MUSIC_FRAGMENTS },
  "member-others": { stages: MEMBER_OTHERS_MUSIC_STAGES, figures: [], fragments: RUNNING_MUSIC_FRAGMENTS },
} as const;

export type StaffDrawingName = keyof typeof STAFF_DRAWINGS;

export const STAFF_VIEWS = ["wide", "phone"] as const;

export type StaffView = (typeof STAFF_VIEWS)[number];

/**
 * The ink of the music: --color-text-on-ink, written out because an SVG shown
 * as an image cannot read the page's tokens. Every staff sits on ink; each
 * section dims it with its own opacity.
 */
export const STAFF_MUSIC_INK = "#f2f4f3";
