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
      label: "Encuadre en teléfono",
      defaultValue: "78% 50%",
      admin: {
        description:
          "Valor de object-position del recorte en el teléfono, donde la foto se corta por los lados para que el cuarteto llene el ancho. El primer número mueve el recorte: más alto, más a la derecha. Ej.: «82% 50%». En escritorio la foto se ve completa.",
      },
    },
    {
      name: "eventsHeading",
      type: "text",
      label: "Rótulo de las próximas presentaciones",
      required: true,
      defaultValue: "Próximas presentaciones",
      admin: {
        description:
          "Sólo se ve en el teléfono, entre el botón «Escuchar» y las tarjetas. En escritorio nombra la lista para los lectores de pantalla.",
      },
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
