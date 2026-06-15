import type { CollectionConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/lib/payload/access";
import { revalidateCatalog, revalidateCatalogAfterDelete } from "@/lib/payload/revalidate-site";

// The recordings the repertoire player streams. Locally they are written to
// `audio/` (ignored by git); on Vercel the storage plugin sends them to
// Vercel Blob straight from the browser (payload.config.ts).
export const Audio: CollectionConfig = {
  slug: "audio",
  labels: { singular: "Grabación", plural: "Grabaciones" },
  admin: {
    useAsTitle: "title",
    group: "Contenido",
    description: "MP3, M4A, OGG o WAV. Se asignan a las obras en Contenido › Repertorio.",
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  // Replacing a file changes the URL the tracks point at.
  hooks: {
    afterChange: [revalidateCatalog],
    afterDelete: [revalidateCatalogAfterDelete],
  },
  upload: {
    staticDir: "audio",
    mimeTypes: ["audio/mpeg", "audio/mp4", "audio/x-m4a", "audio/ogg", "audio/wav", "audio/x-wav"],
    // Image-only tools that make no sense for sound.
    crop: false,
    focalPoint: false,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Título",
      required: true,
      admin: { description: "Ej.: «Borodin — Notturno (fragmento)»." },
    },
  ],
};
