import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "repertoire_section" DROP COLUMN "eyebrow";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "repertoire_section" ADD COLUMN "eyebrow" varchar DEFAULT 'Repertorio' NOT NULL;`);
}
