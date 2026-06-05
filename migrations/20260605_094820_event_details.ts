import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "events_program" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"composer" varchar
  );
  
  ALTER TABLE "events" ADD COLUMN "description" varchar;
  ALTER TABLE "events" ADD COLUMN "venue_name" varchar;
  ALTER TABLE "events" ADD COLUMN "venue_address" varchar;
  ALTER TABLE "events" ADD COLUMN "venue_maps_url" varchar;
  ALTER TABLE "events" ADD COLUMN "tickets_url" varchar;
  ALTER TABLE "events" ADD COLUMN "tickets_price" varchar;
  ALTER TABLE "events_program" ADD CONSTRAINT "events_program_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_program_order_idx" ON "events_program" USING btree ("_order");
  CREATE INDEX "events_program_parent_id_idx" ON "events_program" USING btree ("_parent_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "events_program" CASCADE;
  ALTER TABLE "events" DROP COLUMN "description";
  ALTER TABLE "events" DROP COLUMN "venue_name";
  ALTER TABLE "events" DROP COLUMN "venue_address";
  ALTER TABLE "events" DROP COLUMN "venue_maps_url";
  ALTER TABLE "events" DROP COLUMN "tickets_url";
  ALTER TABLE "events" DROP COLUMN "tickets_price";`);
}
