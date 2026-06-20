import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

// The note under the list of works is gone. The Global already has its row,
// so the way back adds the column with a value before making it required.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "repertoire_section" DROP COLUMN "note";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "repertoire_section" ADD COLUMN "note" varchar NOT NULL DEFAULT 'Las cuatro obras están en repertorio; las grabaciones de estudio se subirán en cuanto estén listas.';
  ALTER TABLE "repertoire_section" ALTER COLUMN "note" DROP DEFAULT;`);
}
