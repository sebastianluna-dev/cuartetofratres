import type { CollectionConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/lib/payload/access";
import { revalidateCatalog, revalidateCatalogAfterDelete } from "@/lib/payload/revalidate-site";

// The four musicians are fixed: only their biography is edited here. Name,
// instrument and order are read-only, and the photo is art direction kept in
// code (constants/member-photos.const.ts), so its two fields are hidden: they
// stay in the schema (the seed still fills them) until a migration drops them.
export const Members: CollectionConfig = {
  slug: "members",
  labels: { singular: "Integrante", plural: "Integrantes" },
  admin: {
    useAsTitle: "name",
    group: "Contenido",
    defaultColumns: ["order", "name", "instrument"],
    description:
      "Aquí sólo se edita la semblanza de cada integrante. Las fotos y los nombres los cambia el equipo del sitio.",
  },
  access: {
    read: anyone,
    create: () => false,
    update: isAdminOrEditor,
    delete: () => false,
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
          admin: {
            width: "25%",
            readOnly: true,
            description: "1 = primer violín, 2 = segundo violín, 3 = viola, 4 = violoncello.",
          },
        },
        {
          name: "name",
          type: "text",
          label: "Nombre completo",
          required: true,
          admin: { width: "45%", readOnly: true },
        },
        {
          name: "instrument",
          type: "select",
          label: "Instrumento",
          required: true,
          options: [
            { label: "Violín", value: "violin" },
            { label: "Viola", value: "viola" },
            { label: "Violoncello", value: "cello" },
          ],
          admin: { width: "30%", readOnly: true },
        },
      ],
    },
    {
      name: "shortName",
      type: "text",
      label: "Nombre corto",
      required: true,
      admin: { readOnly: true, description: "Se lee en la tira del retrato y da la dirección de su página." },
    },
    {
      name: "bio",
      type: "textarea",
      label: "Semblanza",
      required: true,
      admin: { description: "Deja una línea en blanco entre párrafos." },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      label: "Retrato",
      required: true,
      admin: { hidden: true },
    },
    {
      name: "photoPosition",
      type: "text",
      label: "Encuadre del retrato",
      defaultValue: "50% 30%",
      admin: { hidden: true },
    },
  ],
};
