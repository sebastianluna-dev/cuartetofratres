import * as migration_20260528_171204_initial from "./20260528_171204_initial";
import * as migration_20260603_101512_hero_events_heading from "./20260603_101512_hero_events_heading";
import * as migration_20260605_094820_event_details from "./20260605_094820_event_details";
import * as migration_20260610_104433_categories from "./20260610_104433_categories";
import * as migration_20260611_101907_tracks_category_relationship from "./20260611_101907_tracks_category_relationship";
import * as migration_20260615_100612_audio from "./20260615_100612_audio";
import * as migration_20260616_094137_event_published from "./20260616_094137_event_published";
import * as migration_20260617_103512_member_short_name_origin from "./20260617_103512_member_short_name_origin";
import * as migration_20260617_142210_members_hint from "./20260617_142210_members_hint";
import * as migration_20260618_113045_members_hint_removed from "./20260618_113045_members_hint_removed";
import * as migration_20260618_160730_about_pillars_removed from "./20260618_160730_about_pillars_removed";
import * as migration_20260619_110842_about_caption_removed from "./20260619_110842_about_caption_removed";
import * as migration_20260619_154020_repertoire_eyebrow from "./20260619_154020_repertoire_eyebrow";
import * as migration_20260619_164510_repertoire_player_note_removed from "./20260619_164510_repertoire_player_note_removed";
import * as migration_20260619_173355_member_origin_removed from "./20260619_173355_member_origin_removed";

export const migrations = [
  {
    up: migration_20260528_171204_initial.up,
    down: migration_20260528_171204_initial.down,
    name: "20260528_171204_initial",
  },
  {
    up: migration_20260603_101512_hero_events_heading.up,
    down: migration_20260603_101512_hero_events_heading.down,
    name: "20260603_101512_hero_events_heading",
  },
  {
    up: migration_20260605_094820_event_details.up,
    down: migration_20260605_094820_event_details.down,
    name: "20260605_094820_event_details",
  },
  {
    up: migration_20260610_104433_categories.up,
    down: migration_20260610_104433_categories.down,
    name: "20260610_104433_categories",
  },
  {
    up: migration_20260611_101907_tracks_category_relationship.up,
    down: migration_20260611_101907_tracks_category_relationship.down,
    name: "20260611_101907_tracks_category_relationship",
  },
  {
    up: migration_20260615_100612_audio.up,
    down: migration_20260615_100612_audio.down,
    name: "20260615_100612_audio",
  },
  {
    up: migration_20260616_094137_event_published.up,
    down: migration_20260616_094137_event_published.down,
    name: "20260616_094137_event_published",
  },
  {
    up: migration_20260617_103512_member_short_name_origin.up,
    down: migration_20260617_103512_member_short_name_origin.down,
    name: "20260617_103512_member_short_name_origin",
  },
  {
    up: migration_20260617_142210_members_hint.up,
    down: migration_20260617_142210_members_hint.down,
    name: "20260617_142210_members_hint",
  },
  {
    up: migration_20260618_113045_members_hint_removed.up,
    down: migration_20260618_113045_members_hint_removed.down,
    name: "20260618_113045_members_hint_removed",
  },
  {
    up: migration_20260618_160730_about_pillars_removed.up,
    down: migration_20260618_160730_about_pillars_removed.down,
    name: "20260618_160730_about_pillars_removed",
  },
  {
    up: migration_20260619_110842_about_caption_removed.up,
    down: migration_20260619_110842_about_caption_removed.down,
    name: "20260619_110842_about_caption_removed",
  },
  {
    up: migration_20260619_154020_repertoire_eyebrow.up,
    down: migration_20260619_154020_repertoire_eyebrow.down,
    name: "20260619_154020_repertoire_eyebrow",
  },
  {
    up: migration_20260619_164510_repertoire_player_note_removed.up,
    down: migration_20260619_164510_repertoire_player_note_removed.down,
    name: "20260619_164510_repertoire_player_note_removed",
  },
  {
    up: migration_20260619_173355_member_origin_removed.up,
    down: migration_20260619_173355_member_origin_removed.down,
    name: "20260619_173355_member_origin_removed",
  },
];
