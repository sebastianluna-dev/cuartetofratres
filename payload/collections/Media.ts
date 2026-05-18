import type { CollectionConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/lib/payload/access";

// Photos of the site. Locally they are written to `media/` (ignored by git);
// on Vercel the storage plugin sends them to Vercel Blob (payload.config.ts).
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Imagen", plural: "Imágenes" },
  admin: {
    useAsTitle: "alt",
    group: "Contenido",
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  upload: {
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Texto alternativo",
      required: true,
      admin: { description: "Lo que lee un lector de pantalla y lo que se muestra si la foto no carga." },
    },
  ],
};
