import * as migration_20260528_171204_initial from "./20260528_171204_initial";
import * as migration_20260603_101512_hero_events_heading from "./20260603_101512_hero_events_heading";
import * as migration_20260605_094820_event_details from "./20260605_094820_event_details";
import * as migration_20260610_104433_categories from "./20260610_104433_categories";
import * as migration_20260611_101907_tracks_category_relationship from "./20260611_101907_tracks_category_relationship";
import * as migration_20260615_100612_audio from "./20260615_100612_audio";

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
];
