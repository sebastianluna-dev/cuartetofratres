import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Users } from "@/payload/collections/Users";
import { Media } from "@/payload/collections/Media";
import { Audio } from "@/payload/collections/Audio";
import { Members } from "@/payload/collections/Members";
import { Events } from "@/payload/collections/Events";
import { Tracks } from "@/payload/collections/Tracks";
import { Categories } from "@/payload/collections/Categories";
import { ContactRequests } from "@/payload/collections/ContactRequests";
import { Hero } from "@/payload/globals/Hero";
import { About } from "@/payload/globals/About";
import { RepertoireSection } from "@/payload/globals/RepertoireSection";
import { ContactSection } from "@/payload/globals/ContactSection";
import { SiteSettings } from "@/payload/globals/SiteSettings";
import { migrations } from "@/migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// DATABASE_URI locally; on Vercel, the Prisma Postgres integration names the
// variable after the store, so its pooled URL is the fallback.
const DATABASE_URI = process.env.DATABASE_URI || process.env.CUARTETO_FRATRES_DATABASE_POSTGRES_URL;

// Uploads go to Vercel Blob whenever its token exists (every Vercel
// deployment); locally they are written to `media/` and `audio/`, which git
// ignores.
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? "",
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Cuarteto Fratres",
    },
  },
  collections: [Members, Events, Tracks, Categories, Media, Audio, ContactRequests, Users],
  globals: [Hero, About, RepertoireSection, ContactSection, SiteSettings],
  // Without `sharp`, Payload does not read the dimensions of what is uploaded
  // and `Media.width`/`height` stay null: next/image needs them.
  sharp,
  // Weight cap per file uploaded to the CMS: the design's exports were 2 MB
  // PNGs and nobody should have to know how to export light.
  upload: {
    limits: { fileSize: 8 * 1024 * 1024 },
    abortOnLimit: true,
  },
  // Nobody consumes the GraphQL API (the site reads Payload with the local API)
  // and building its schema is part of every cold start.
  graphQL: { disable: true },
  db: postgresAdapter({
    pool: {
      connectionString: DATABASE_URI,
    },
    // The schema only changes through migrations, in every environment: a
    // database touched by the dev push makes Payload stop and ask before
    // migrating, and a build has nobody to answer. After editing a collection,
    // `npm run cms:migrate -- create <nombre>` and then `npm run cms:migrate`.
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
    // Run on start in production (NODE_ENV=production): a fresh Vercel database
    // gets its tables on the first build without anyone running a command.
    prodMigrations: migrations,
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(BLOB_TOKEN),
      token: BLOB_TOKEN ?? "",
      collections: { media: true, audio: true },
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
