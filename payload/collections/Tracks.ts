import type { CollectionConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/lib/payload/access";
import { revalidateCatalog, revalidateCatalogAfterDelete } from "@/lib/payload/revalidate-site";

export const Tracks: CollectionConfig = {
  slug: "tracks",
  labels: { singular: "Obra", plural: "Repertorio" },
  admin: {
    useAsTitle: "title",
    group: "Contenido",
    defaultColumns: ["order", "title", "composer", "category"],
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
          type: "select",
          label: "Categoría",
          required: true,
          options: [
            { label: "Clásico y cámara", value: "clasico" },
            { label: "Mexicana y latinoamericana", value: "latam" },
            { label: "Bodas y ceremonias", value: "bodas" },
            { label: "Pop y contemporáneo", value: "pop" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "durationSeconds",
      type: "number",
      label: "Duración del fragmento (segundos)",
      required: true,
      defaultValue: 210,
      min: 1,
      admin: { description: "Hasta que existan las grabaciones, el reproductor sólo simula esta duración." },
    },
  ],
};
