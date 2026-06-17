import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

// The one-line summary ("Culiacán, Sinaloa. Concertino de…") gives way to a
// short name and an origin. Both are filled from what is already there before
// the old column goes: the origin is the summary up to its first full stop and
// the short name is given name + first surname (second-to-last word), the
// same rule as `lib/shorten-name.ts`; two-word names stay whole.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "members" ADD COLUMN "short_name" varchar;
  ALTER TABLE "members" ADD COLUMN "origin" varchar;
  UPDATE "members" SET
    "short_name" = CASE
      WHEN array_length(string_to_array(btrim("name"), ' '), 1) >= 3
        THEN split_part(btrim("name"), ' ', 1) || ' ' ||
          (string_to_array(btrim("name"), ' '))[array_length(string_to_array(btrim("name"), ' '), 1) - 1]
      ELSE btrim("name")
    END,
    "origin" = NULLIF(btrim(split_part("short", '.', 1)), '');
  ALTER TABLE "members" ALTER COLUMN "short_name" SET NOT NULL;
  ALTER TABLE "members" DROP COLUMN "short";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "members" ADD COLUMN "short" varchar;
  UPDATE "members" SET "short" = COALESCE("origin" || '.', "short_name");
  ALTER TABLE "members" ALTER COLUMN "short" SET NOT NULL;
  ALTER TABLE "members" DROP COLUMN "short_name";
  ALTER TABLE "members" DROP COLUMN "origin";`);
}
