import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

// The hint beside the title of the members section is gone with the accordion
// it explained. The Global already has its row, so the way back adds the
// column with a value before making it required again.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "members_section" DROP COLUMN "hint";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "members_section" ADD COLUMN "hint" varchar NOT NULL DEFAULT 'Pulsa un retrato para leer su semblanza.';
  ALTER TABLE "members_section" ALTER COLUMN "hint" DROP DEFAULT;`);
}
