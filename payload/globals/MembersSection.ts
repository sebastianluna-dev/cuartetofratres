import type { GlobalConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/lib/payload/access";
import { revalidateSiteGlobals } from "@/lib/payload/revalidate-site";

// Only the texts of the section: the musicians themselves are the `members`
// collection.
export const MembersSection: GlobalConfig = {
  slug: "members-section",
  label: "Integrantes (textos)",
  admin: { group: "Secciones" },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateSiteGlobals] },
  fields: [
    { name: "eyebrow", type: "text", label: "Rótulo", required: true, defaultValue: "Integrantes" },
    { name: "title", type: "text", label: "Título", required: true },
    {
      name: "hint",
      type: "text",
      label: "Indicación",
      required: true,
      admin: { description: "Sólo en escritorio, junto al título. Ej.: «Pasa el cursor o pulsa un nombre…»." },
    },
  ],
};
