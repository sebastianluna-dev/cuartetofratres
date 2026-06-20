export type EventType = "concierto" | "boda" | "ceremonia" | "privado";

export interface EventTypeOption {
  value: EventType;
  label: string;
}

export const EVENT_TYPES: readonly EventTypeOption[] = [
  { value: "concierto", label: "Concierto" },
  { value: "boda", label: "Boda" },
  { value: "ceremonia", label: "Ceremonia" },
  { value: "privado", label: "Privado" },
];

/** Upper bounds of the contact form fields; the server action enforces them too. */
export const CONTACT_LIMITS = {
  name: 120,
  contact: 160,
  date: 60,
  place: 160,
  details: 2000,
} as const;

export interface ContactSectionDefaults {
  title: string;
  lead: string;
  sentTitle: string;
  sentText: string;
}

export const CONTACT_SECTION_DEFAULTS: ContactSectionDefaults = {
  title: "Cuéntanos qué ocasión quieres acompañar con música.",
  lead: "Conciertos y actividades culturales, bodas y ceremonias, eventos privados. Escríbenos con la fecha, el lugar y la duración prevista y te enviamos propuesta de programa.",
  sentTitle: "Gracias.",
  sentText: "Te respondemos al correo o WhatsApp que dejaste, con propuesta de programa y duración.",
};
