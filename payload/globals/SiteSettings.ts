import type { GlobalConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/lib/payload/access";
import { revalidateSiteGlobals } from "@/lib/payload/revalidate-site";

// Contact data and social links, read by the footer, the contact section and
// the metadata. An empty social URL means "not public yet": the footer then
// shows the name without a link.
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Datos del sitio",
  admin: { group: "Sitio" },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateSiteGlobals] },
  fields: [
    { name: "tagline", type: "textarea", label: "Lema", required: true },
    {
      type: "row",
      fields: [
        { name: "email", type: "email", label: "Correo de contacto", required: true, admin: { width: "50%" } },
        {
          name: "whatsapp",
          type: "text",
          label: "WhatsApp",
          admin: {
            width: "50%",
            description: "Sólo dígitos con código de país, ej.: 522291234567. Vacío = «por confirmar».",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "location", type: "text", label: "Ciudad", required: true, admin: { width: "50%" } },
        { name: "locationFull", type: "text", label: "Ciudad, estado y país", required: true, admin: { width: "50%" } },
      ],
    },
    {
      name: "social",
      type: "group",
      label: "Redes",
      fields: [
        { name: "instagram", type: "text", label: "Instagram (URL)" },
        { name: "facebook", type: "text", label: "Facebook (URL)" },
        { name: "youtube", type: "text", label: "YouTube (URL)" },
      ],
    },
    {
      name: "photoCredit",
      type: "text",
      label: "Crédito de fotografía",
      required: true,
      defaultValue: "Fotografía: archivo del cuarteto",
    },
  ],
};
