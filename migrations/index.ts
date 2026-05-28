import * as migration_20260528_171204_initial from "./20260528_171204_initial";

export const migrations = [
  {
    up: migration_20260528_171204_initial.up,
    down: migration_20260528_171204_initial.down,
    name: "20260528_171204_initial",
  },
];
