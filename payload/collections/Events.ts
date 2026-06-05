import type { CollectionConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/lib/payload/access";
import { revalidateCatalog, revalidateCatalogAfterDelete } from "@/lib/payload/revalidate-site";

// Upcoming concerts. The hero shows the next two whose date has not passed;
// past ones stay here as history and never need deleting.
export const Events: CollectionConfig = {
  slug: "events",
  labels: { singular: "Presentación", plural: "Presentaciones" },
  admin: {
    useAsTitle: "title",
    group: "Contenido",
    defaultColumns: ["date", "title", "city"],
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
  defaultSort: "date",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Título",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "date",
          type: "date",
          label: "Fecha",
          required: true,
          admin: { width: "50%", date: { pickerAppearance: "dayOnly", displayFormat: "d 'de' MMMM yyyy" } },
        },
        {
          name: "time",
          type: "text",
          label: "Hora",
          required: true,
          defaultValue: "20:00",
          admin: { width: "50%", description: "Formato de 24 horas, ej.: 19:30." },
        },
      ],
    },
    {
      name: "city",
      type: "text",
      label: "Ciudad",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Foto de la tarjeta",
      required: true,
    },
    {
      name: "imagePosition",
      type: "text",
      label: "Encuadre de la foto",
      defaultValue: "50% 50%",
      admin: { description: "Valor de object-position. Ej.: «46% 42%»." },
    },
    // Everything below only shows in the window that opens from the card;
    // all of it is optional so a date can be announced before the details.
    {
      name: "description",
      type: "textarea",
      label: "Descripción",
      admin: { description: "Se muestra en la ventana que abre la tarjeta. Los saltos de línea se respetan." },
    },
    {
      name: "program",
      type: "array",
      label: "Programa",
      labels: { singular: "Obra", plural: "Obras" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "title", type: "text", label: "Obra", required: true, admin: { width: "60%" } },
            { name: "composer", type: "text", label: "Compositor", admin: { width: "40%" } },
          ],
        },
      ],
    },
    {
      name: "venue",
      type: "group",
      label: "Lugar",
      fields: [
        { name: "name", type: "text", label: "Recinto" },
        { name: "address", type: "text", label: "Dirección" },
        {
          name: "mapsUrl",
          type: "text",
          label: "Enlace a Google Maps",
          admin: { description: "Opcional: vacío, el enlace «Cómo llegar» se arma con recinto, dirección y ciudad." },
        },
      ],
    },
    {
      name: "tickets",
      type: "group",
      label: "Boletos",
      fields: [
        {
          name: "url",
          type: "text",
          label: "Enlace de venta",
          admin: {
            description:
              "Con enlace, la ventana muestra «Comprar boletos»; sin él, «Solicitar informes» lleva al formulario.",
          },
        },
        {
          name: "price",
          type: "text",
          label: "Precio (texto)",
          admin: { description: "Ej.: «$250 general · $150 estudiantes»." },
        },
      ],
    },
  ],
};
