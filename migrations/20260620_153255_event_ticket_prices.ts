import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

// The free-text price ("$250 general · $150 estudiantes") becomes one row per
// price, amount and label apart. The old text is split on the separators the
// site already accepted (·, / and |), and each part on its first space:
// "$250 general" → "$250" + "general". The way back joins the rows again.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "events_tickets_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"amount" varchar NOT NULL,
  	"label" varchar
  );

  ALTER TABLE "events_tickets_prices" ADD CONSTRAINT "events_tickets_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_tickets_prices_order_idx" ON "events_tickets_prices" USING btree ("_order");
  CREATE INDEX "events_tickets_prices_parent_id_idx" ON "events_tickets_prices" USING btree ("_parent_id");
  INSERT INTO "events_tickets_prices" ("_order", "_parent_id", "id", "amount", "label")
  SELECT
    parts.ordinality::integer,
    parts.event_id,
    parts.event_id::text || '-' || parts.ordinality::text,
    split_part(parts.part, ' ', 1),
    NULLIF(btrim(substr(parts.part, length(split_part(parts.part, ' ', 1)) + 1)), '')
  FROM (
    SELECT e."id" AS event_id, btrim(t.part) AS part, t.ordinality
    FROM "events" e,
      LATERAL regexp_split_to_table(e."tickets_price", '\\s*[·/|]\\s*') WITH ORDINALITY AS t(part, ordinality)
    WHERE e."tickets_price" IS NOT NULL
  ) AS parts
  WHERE parts.part <> '';
  ALTER TABLE "events" DROP COLUMN "tickets_price";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ADD COLUMN "tickets_price" varchar;
  UPDATE "events" e SET "tickets_price" = joined.text
  FROM (
    SELECT "_parent_id", string_agg("amount" || COALESCE(' ' || "label", ''), ' · ' ORDER BY "_order") AS text
    FROM "events_tickets_prices"
    GROUP BY "_parent_id"
  ) AS joined
  WHERE joined."_parent_id" = e."id";
  DROP TABLE "events_tickets_prices" CASCADE;`);
}
