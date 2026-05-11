import type { EventType } from "@/constants/contact.const";

export interface ContactRequest {
  name: string;
  contact: string;
  eventType: EventType;
  date: string;
  place: string;
  details: string;
}

export type ContactFieldErrors = Partial<Record<keyof ContactRequest, string>>;

/** What the form receives back from the server action. */
export type ContactFormState =
  { status: "idle" } | { status: "error"; message: string; fields?: ContactFieldErrors } | { status: "sent" };
