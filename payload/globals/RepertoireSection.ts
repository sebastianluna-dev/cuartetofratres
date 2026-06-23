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
    {
      name: "title",
      type: "text",
      label: "Título",
      required: true,
      defaultValue: "Repertorio",
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
