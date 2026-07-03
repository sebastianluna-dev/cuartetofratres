import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "repertoire_section" ALTER COLUMN "title" SET DEFAULT 'Repertorio';
  ALTER TABLE "contact_requests" DROP COLUMN "event_type";
  ALTER TABLE "contact_requests" DROP COLUMN "date";
  ALTER TABLE "contact_requests" DROP COLUMN "place";
  DROP TYPE "public"."enum_contact_requests_event_type";`);
}

/* The generated `down` added `event_type` as NOT NULL with no default, which
   cannot be applied to a table that already holds requests. It comes back
   with a default so the rows can be filled, and the default is dropped again
   right after, leaving the column as it was. */
export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contact_requests_event_type" AS ENUM('concierto', 'boda', 'ceremonia', 'privado');
  ALTER TABLE "repertoire_section" ALTER COLUMN "title" SET DEFAULT 'Del clásico al pop, con el mismo cuidado.';
  ALTER TABLE "contact_requests" ADD COLUMN "event_type" "enum_contact_requests_event_type" NOT NULL DEFAULT 'concierto';
  ALTER TABLE "contact_requests" ALTER COLUMN "event_type" DROP DEFAULT;
  ALTER TABLE "contact_requests" ADD COLUMN "date" varchar;
  ALTER TABLE "contact_requests" ADD COLUMN "place" varchar;`);
}
