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
