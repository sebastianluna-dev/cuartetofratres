import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

// The repertoire section gets the eyebrow the other sections have, and the
// word «Repertorio» moves there: a title still reading «Repertorio» becomes
// a phrase. A title the editors already rewrote is left alone.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "repertoire_section" ALTER COLUMN "title" SET DEFAULT 'Del clásico al pop, con el mismo cuidado.';
  ALTER TABLE "repertoire_section" ADD COLUMN "eyebrow" varchar DEFAULT 'Repertorio' NOT NULL;
  UPDATE "repertoire_section" SET "title" = 'Del clásico al pop, con el mismo cuidado.' WHERE "title" = 'Repertorio';`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "repertoire_section" SET "title" = 'Repertorio' WHERE "title" = 'Del clásico al pop, con el mismo cuidado.';
  ALTER TABLE "repertoire_section" ALTER COLUMN "title" SET DEFAULT 'Repertorio';
  ALTER TABLE "repertoire_section" DROP COLUMN "eyebrow";`);
}
