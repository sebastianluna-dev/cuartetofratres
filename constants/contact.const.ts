/** Upper bounds of the contact form fields; the server action enforces them too. */
export const CONTACT_LIMITS = {
  name: 120,
  contact: 160,
  details: 2000,
} as const;

export interface ContactSectionDefaults {
  title: string;
  lead: string;
  sentTitle: string;
  sentText: string;
}

export const CONTACT_SECTION_DEFAULTS: ContactSectionDefaults = {
  title: "Cuéntanos de tu ocasión",
  lead: "Conciertos y actividades culturales, bodas y ceremonias, eventos privados. Cuéntanos en el formulario la fecha, el lugar y la duración prevista, y te respondemos con una propuesta de programa.",
  sentTitle: "Gracias.",
  sentText: "Te respondemos al correo o WhatsApp que dejaste, con propuesta de programa y duración.",
};

/**
 * Fixed copy of the contact section's frame: the letter the form is written
 * on, its button and the captions of the contact details under it.
 */
export const CONTACT_COPY = {
  addressee: "Para: Cuarteto Fratres",
  submit: "Enviar solicitud",
  submitting: "Enviando…",
  email: "Correo",
  whatsapp: "WhatsApp",
  whatsappPending: "Por confirmar",
  social: "Redes",
} as const;
