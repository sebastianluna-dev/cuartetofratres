import type { CollectionConfig } from "payload";
import { MAX_CATEGORIES } from "@/constants/repertoire.const";
import { anyone, isAdminOrEditor } from "@/lib/payload/access";
import { limitDocuments } from "@/lib/payload/limit-documents";
import { revalidateCatalog, revalidateCatalogAfterDelete } from "@/lib/payload/revalidate-site";

// The tabs of the repertoire. Capped because the filter strip only fits so
// many on a phone; "Todo" is added by the site and is not a document.
export const Categories: CollectionConfig = {
  slug: "categories",
  labels: { singular: "Categoría", plural: "Categorías" },
  admin: {
    useAsTitle: "label",
    group: "Contenido",
    defaultColumns: ["order", "label", "shortLabel"],
    description: `Las pestañas del repertorio, ${MAX_CATEGORIES} como máximo. «Todo» siempre va primero y no se edita.`,
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    beforeValidate: [
      limitDocuments(
        "categories",
        MAX_CATEGORIES,
        `Sólo puede haber ${MAX_CATEGORIES} categorías. Edita o borra una existente.`,
      ),
    ],
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
          admin: { width: "20%", description: "Orden de las pestañas, de izquierda a derecha." },
        },
        {
          name: "label",
          type: "text",
          label: "Nombre",
          required: true,
          admin: {
            width: "80%",
            description: "Se muestra en la tarjeta de la obra que suena. Ej.: «Clásico y cámara».",
          },
        },
      ],
    },
    {
      name: "shortLabel",
      type: "text",
      label: "Etiqueta corta",
      admin: {
        description: "Lo que se lee en la pestaña del filtro; vacía, se usa el nombre completo. Ej.: «Cámara».",
      },
    },
  ],
};
