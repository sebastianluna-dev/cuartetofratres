import type { CollectionConfig } from "payload";
import { isAdminOrEditor, nobody } from "@/lib/payload/access";

// What the contact form saves. Created only from the server action through the
// local API (which bypasses access), so nobody can create one through the REST
// API; editors read and triage them, only an admin deletes.
export const ContactRequests: CollectionConfig = {
  slug: "contact-requests",
  labels: { singular: "Solicitud de contacto", plural: "Solicitudes de contacto" },
  admin: {
    useAsTitle: "name",
    group: "Solicitudes",
    defaultColumns: ["createdAt", "name", "eventType", "date", "status"],
  },
  access: {
    read: isAdminOrEditor,
    create: nobody,
    update: isAdminOrEditor,
    delete: ({ req }) => req.user?.role === "admin",
  },
  defaultSort: "-createdAt",
  fields: [
    {
      name: "status",
      type: "select",
      label: "Estado",
      required: true,
      defaultValue: "new",
      options: [
        { label: "Nueva", value: "new" },
        { label: "Respondida", value: "answered" },
        { label: "Descartada", value: "discarded" },
      ],
      admin: { position: "sidebar" },
    },
    {
      type: "row",
      fields: [
        { name: "name", type: "text", label: "Nombre", required: true, admin: { width: "50%", readOnly: true } },
        {
          name: "contact",
          type: "text",
          label: "Correo o WhatsApp",
          required: true,
          admin: { width: "50%", readOnly: true },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "eventType",
          type: "select",
          label: "Tipo de evento",
          required: true,
          options: [
            { label: "Concierto", value: "concierto" },
            { label: "Boda", value: "boda" },
            { label: "Ceremonia", value: "ceremonia" },
            { label: "Privado", value: "privado" },
          ],
          admin: { width: "34%", readOnly: true },
        },
        { name: "date", type: "text", label: "Fecha", admin: { width: "33%", readOnly: true } },
        { name: "place", type: "text", label: "Lugar", admin: { width: "33%", readOnly: true } },
      ],
    },
    {
      name: "details",
      type: "textarea",
      label: "Detalles",
      admin: { readOnly: true },
    },
    {
      name: "notes",
      type: "textarea",
      label: "Notas internas",
      admin: { description: "Sólo las ve el equipo: qué se respondió, propuesta enviada, etc." },
    },
  ],
};
