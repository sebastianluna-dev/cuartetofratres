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
    { name: "title", type: "text", label: "Título", required: true, defaultValue: "Repertorio" },
    {
      name: "note",
      type: "textarea",
      label: "Nota bajo la lista",
      required: true,
      admin: { description: "Ej.: «Las cuatro obras están en repertorio; las grabaciones se subirán…»." },
    },
    {
      name: "playerNote",
      type: "text",
      label: "Nota del reproductor",
      required: true,
      defaultValue: "Solo suena una pista a la vez y nunca arranca sola.",
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
