import type { GlobalConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/lib/payload/access";
import { revalidateSiteGlobals } from "@/lib/payload/revalidate-site";

export const About: GlobalConfig = {
  slug: "about",
  label: "El cuarteto",
  admin: { group: "Secciones" },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateSiteGlobals] },
  fields: [
    { name: "eyebrow", type: "text", label: "Rótulo", required: true, defaultValue: "El cuarteto" },
    { name: "title", type: "text", label: "Título", required: true },
    { name: "lead", type: "textarea", label: "Texto de presentación", required: true },
    { name: "photo", type: "upload", relationTo: "media", label: "Foto del grupo", required: true },
  ],
};
