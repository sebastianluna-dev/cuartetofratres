import * as migration_20260528_171204_initial from "./20260528_171204_initial";
import * as migration_20260603_101512_hero_events_heading from "./20260603_101512_hero_events_heading";

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
];
