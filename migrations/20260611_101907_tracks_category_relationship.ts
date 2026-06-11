import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

// Hand-written on top of the generated one: the column arrives nullable, is
// filled from the old enum through the labels the categories migration
// inserted, and only then becomes NOT NULL. The enum type can be dropped
// only after the column that used it is gone.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tracks" ADD COLUMN "category_id" integer;
  UPDATE "tracks" t SET "category_id" = c."id" FROM "categories" c
    WHERE c."label" = CASE t."category"::text
      WHEN 'clasico' THEN 'Clásico y cámara'
      WHEN 'latam' THEN 'Mexicana y latinoamericana'
      WHEN 'bodas' THEN 'Bodas y ceremonias'
      WHEN 'pop' THEN 'Pop y contemporáneo'
    END;
  ALTER TABLE "tracks" ALTER COLUMN "category_id" SET NOT NULL;
  ALTER TABLE "tracks" ADD CONSTRAINT "tracks_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "tracks_category_idx" ON "tracks" USING btree ("category_id");
  ALTER TABLE "tracks" DROP COLUMN "category";
  DROP TYPE "public"."enum_tracks_category";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tracks_category" AS ENUM('clasico', 'latam', 'bodas', 'pop');
  ALTER TABLE "tracks" ADD COLUMN "category" "enum_tracks_category";
  UPDATE "tracks" t SET "category" = (CASE c."label"
      WHEN 'Clásico y cámara' THEN 'clasico'
      WHEN 'Mexicana y latinoamericana' THEN 'latam'
      WHEN 'Bodas y ceremonias' THEN 'bodas'
      WHEN 'Pop y contemporáneo' THEN 'pop'
    END)::"enum_tracks_category"
    FROM "categories" c WHERE c."id" = t."category_id";
  ALTER TABLE "tracks" ALTER COLUMN "category" SET NOT NULL;
  ALTER TABLE "tracks" DROP CONSTRAINT "tracks_category_id_categories_id_fk";
  DROP INDEX "tracks_category_idx";
  ALTER TABLE "tracks" DROP COLUMN "category_id";`);
}
