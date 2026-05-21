import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import { Users } from "@/payload/collections/Users";
import { Media } from "@/payload/collections/Media";
import { Members } from "@/payload/collections/Members";
import { Events } from "@/payload/collections/Events";
import { Tracks } from "@/payload/collections/Tracks";
import { ContactRequests } from "@/payload/collections/ContactRequests";
import { Hero } from "@/payload/globals/Hero";
import { About } from "@/payload/globals/About";
import { MembersSection } from "@/payload/globals/MembersSection";
import { RepertoireSection } from "@/payload/globals/RepertoireSection";
import { ContactSection } from "@/payload/globals/ContactSection";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Uploads go to Vercel Blob whenever its token exists (every Vercel
// deployment); locally they are written to `media/`, which git ignores.
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? "",
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Cuarteto Fratres",
    },
  },
  collections: [Members, Events, Tracks, Media, ContactRequests, Users],
  globals: [Hero, About, MembersSection, RepertoireSection, ContactSection],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(BLOB_TOKEN),
      token: BLOB_TOKEN ?? "",
      collections: { media: true },
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
