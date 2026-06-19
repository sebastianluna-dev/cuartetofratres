import type { CollectionConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/lib/payload/access";
import { revalidateCatalog, revalidateCatalogAfterDelete } from "@/lib/payload/revalidate-site";

export const Members: CollectionConfig = {
  slug: "members",
  labels: { singular: "Integrante", plural: "Integrantes" },
  admin: {
    useAsTitle: "name",
    group: "Contenido",
    defaultColumns: ["order", "name", "instrument"],
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
          admin: { width: "25%", description: "1 = primer violín, 2 = segundo violín, 3 = viola, 4 = violonchelo." },
        },
        {
          name: "name",
          type: "text",
          label: "Nombre completo",
          required: true,
          admin: { width: "45%" },
        },
        {
          name: "instrument",
          type: "select",
          label: "Instrumento",
          required: true,
          options: [
            { label: "Violín", value: "violin" },
            { label: "Viola", value: "viola" },
            { label: "Violonchelo", value: "cello" },
          ],
          admin: { width: "30%" },
        },
      ],
    },
    {
      name: "shortName",
      type: "text",
      label: "Nombre corto",
      required: true,
      admin: { description: "Se lee en la tira del retrato. Ej.: «Jesús Medina»." },
    },
    {
      name: "bio",
      type: "textarea",
      label: "Semblanza",
      required: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      label: "Retrato",
      required: true,
    },
    {
      name: "photoPosition",
      type: "text",
      label: "Encuadre del retrato",
      defaultValue: "50% 30%",
      admin: { description: "Valor de object-position: dónde queda la cara dentro del recorte. Ej.: «50% 28%»." },
    },
  ],
};
