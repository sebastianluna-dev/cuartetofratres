import type { GlobalConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/lib/payload/access";
import { revalidateSiteGlobals } from "@/lib/payload/revalidate-site";

export const ContactSection: GlobalConfig = {
  slug: "contact-section",
  label: "Contacto (textos)",
  admin: { group: "Secciones" },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateSiteGlobals] },
  fields: [
    { name: "eyebrow", type: "text", label: "Rótulo", required: true, defaultValue: "Contacto" },
    { name: "title", type: "text", label: "Título", required: true },
    { name: "lead", type: "textarea", label: "Texto", required: true },
    {
      name: "notice",
      type: "text",
      label: "Aviso bajo el botón",
      required: true,
      defaultValue: "Te respondemos con propuesta de programa y duración.",
    },
    {
      name: "sentTitle",
      type: "text",
      label: "Título tras enviar",
      required: true,
      defaultValue: "Gracias.",
    },
    {
      name: "sentText",
      type: "textarea",
      label: "Texto tras enviar",
      required: true,
    },
  ],
};
