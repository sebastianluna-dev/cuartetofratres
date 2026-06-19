import type { GlobalConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/lib/payload/access";
import { revalidateSiteGlobals } from "@/lib/payload/revalidate-site";

// Texts of the section; the works are the `tracks` collection.
export const RepertoireSection: GlobalConfig = {
  slug: "repertoire-section",
  label: "Repertorio (textos)",
  admin: { group: "Secciones" },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateSiteGlobals] },
  fields: [
    { name: "eyebrow", type: "text", label: "Rótulo", required: true, defaultValue: "Repertorio" },
    {
      name: "title",
      type: "text",
      label: "Título",
      required: true,
      defaultValue: "Del clásico al pop, con el mismo cuidado.",
    },
    {
      name: "note",
      type: "textarea",
      label: "Nota bajo la lista",
      required: true,
      admin: { description: "Ej.: «Las cuatro obras están en repertorio; las grabaciones se subirán…»." },
    },
    {
      name: "unavailableLabel",
      type: "text",
      label: "Aviso de obra sin grabación",
      required: true,
      defaultValue: "Grabación próximamente",
      admin: { description: "Junto a las obras que aún no tienen archivo de audio." },
    },
    {
      name: "emptyState",
      type: "group",
      label: "Categoría sin obras",
      fields: [
        { name: "title", type: "text", label: "Título", required: true, defaultValue: "Repertorio en preparación" },
        { name: "text", type: "textarea", label: "Texto", required: true },
        {
          name: "ctaLabel",
          type: "text",
          label: "Texto del botón",
          required: true,
          defaultValue: "Consultar repertorio",
        },
      ],
    },
  ],
};
