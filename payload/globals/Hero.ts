import type { GlobalConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/lib/payload/access";
import { revalidateSiteGlobals } from "@/lib/payload/revalidate-site";

export const Hero: GlobalConfig = {
  slug: "hero",
  label: "Portada",
  admin: { group: "Secciones" },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateSiteGlobals] },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Título (H1)",
      required: true,
      admin: { description: "Se muestra en mayúsculas con la fuente de display." },
    },
    {
      name: "lead",
      type: "textarea",
      label: "Texto de presentación",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Foto de fondo",
      required: true,
    },
    {
      name: "imagePosition",
      type: "text",
      label: "Encuadre en escritorio",
      defaultValue: "78% 50%",
      admin: { description: "Valor de object-position. El cuarteto debe quedar a la derecha del texto." },
    },
    {
      name: "listenLabel",
      type: "text",
      label: "Texto del botón «Escuchar»",
      required: true,
      defaultValue: "Escuchar al cuarteto",
    },
  ],
};
