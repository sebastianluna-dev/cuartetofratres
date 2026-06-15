import type { CollectionConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/lib/payload/access";
import { revalidateCatalog, revalidateCatalogAfterDelete } from "@/lib/payload/revalidate-site";

export const Tracks: CollectionConfig = {
  slug: "tracks",
  labels: { singular: "Obra", plural: "Repertorio" },
  admin: {
    useAsTitle: "title",
    group: "Contenido",
    defaultColumns: ["order", "title", "composer", "category", "audio"],
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidateCatalog],
    afterDelete: [revalidateCatalogAfterDelete],
  },
  defaultSort: "order",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "order",
          type: "number",
          label: "Orden",
          required: true,
          defaultValue: 1,
          admin: { width: "20%" },
        },
        {
          name: "title",
          type: "text",
          label: "Título",
          required: true,
          admin: { width: "80%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "composer",
          type: "text",
          label: "Compositor",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "category",
          type: "relationship",
          relationTo: "categories",
          label: "Categoría",
          required: true,
          admin: { width: "50%", description: "Las categorías se editan en Contenido › Categorías." },
        },
      ],
    },
    {
      name: "audio",
      type: "upload",
      relationTo: "audio",
      label: "Grabación",
      admin: { description: "Sin grabación, la obra se lista pero no se puede reproducir." },
    },
    {
      name: "durationSeconds",
      type: "number",
      label: "Duración (segundos), sólo hasta que cargue el archivo",
      required: true,
      defaultValue: 210,
      min: 1,
      admin: { description: "Se muestra mientras el navegador lee la duración real; con grabación, manda el archivo." },
    },
  ],
};
