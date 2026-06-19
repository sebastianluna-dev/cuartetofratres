import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

// The caption under the group photo is gone. The Global already has its row,
// so the way back adds the column with a value before making it required.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about" DROP COLUMN "photo_caption";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about" ADD COLUMN "photo_caption" varchar NOT NULL DEFAULT 'Cuarteto Fratres — Boca del Río, Veracruz';
  ALTER TABLE "about" ALTER COLUMN "photo_caption" DROP DEFAULT;`);
}
