import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "repertoire_section" DROP COLUMN "player_note";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "repertoire_section" ADD COLUMN "player_note" varchar DEFAULT 'Solo suena una pista a la vez y nunca arranca sola.' NOT NULL;`);
}
