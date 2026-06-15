import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "audio" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric
  );
  
  ALTER TABLE "tracks" ADD COLUMN "audio_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "audio_id" integer;
  ALTER TABLE "repertoire_section" ADD COLUMN "unavailable_label" varchar DEFAULT 'Grabación próximamente' NOT NULL;
  CREATE INDEX "audio_updated_at_idx" ON "audio" USING btree ("updated_at");
  CREATE INDEX "audio_created_at_idx" ON "audio" USING btree ("created_at");
  CREATE UNIQUE INDEX "audio_filename_idx" ON "audio" USING btree ("filename");
  ALTER TABLE "tracks" ADD CONSTRAINT "tracks_audio_id_audio_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."audio"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audio_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."audio"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "tracks_audio_idx" ON "tracks" USING btree ("audio_id");
  CREATE INDEX "payload_locked_documents_rels_audio_id_idx" ON "payload_locked_documents_rels" USING btree ("audio_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "audio" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "audio" CASCADE;
  ALTER TABLE "tracks" DROP CONSTRAINT "tracks_audio_id_audio_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_audio_fk";
  
  DROP INDEX "tracks_audio_idx";
  DROP INDEX "payload_locked_documents_rels_audio_id_idx";
  ALTER TABLE "tracks" DROP COLUMN "audio_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "audio_id";
  ALTER TABLE "repertoire_section" DROP COLUMN "unavailable_label";`);
}
