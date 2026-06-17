import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

// Data only: the hint of the members section described the accordion
// ("pass the cursor or press a name"), which the strip gallery replaced. A
// hint the editors already rewrote is left alone.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "members_section"
    SET "hint" = 'Pulsa un retrato para leer su semblanza.'
    WHERE "hint" = 'Pasa el cursor o pulsa un nombre para ver su retrato y su semblanza.';`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "members_section"
    SET "hint" = 'Pasa el cursor o pulsa un nombre para ver su retrato y su semblanza.'
    WHERE "hint" = 'Pulsa un retrato para leer su semblanza.';`);
}
