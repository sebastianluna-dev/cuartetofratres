import { CONTACT_LIMITS, EVENT_TYPES, type EventType } from "@/constants/contact.const";
import type { ContactFieldErrors, ContactRequest } from "./contact.types";

export type ContactValidation = { ok: true; value: ContactRequest } | { ok: false; fields: ContactFieldErrors };

function text(formData: FormData, key: string): string {
  const raw = formData.get(key);
  return typeof raw === "string" ? raw.trim() : "";
}

function isEventType(value: string): value is EventType {
  return EVENT_TYPES.some((option) => option.value === value);
}

/**
 * Reads the contact form and reports every problem at once, so the visitor
 * fixes the form in one go. Lengths are capped on the server too: the
 * `maxLength` attributes only help honest browsers.
 */
export function validateContactForm(formData: FormData): ContactValidation {
  const fields: ContactFieldErrors = {};

  const name = text(formData, "name");
  if (!name) fields.name = "Escribe tu nombre.";
  else if (name.length > CONTACT_LIMITS.name) fields.name = `Máximo ${CONTACT_LIMITS.name} caracteres.`;

  const contact = text(formData, "contact");
  if (!contact) fields.contact = "Deja un correo o un WhatsApp para responderte.";
  else if (contact.length > CONTACT_LIMITS.contact) fields.contact = `Máximo ${CONTACT_LIMITS.contact} caracteres.`;

  const eventTypeRaw = text(formData, "eventType");
  const eventType: EventType = isEventType(eventTypeRaw) ? eventTypeRaw : "concierto";
  if (!isEventType(eventTypeRaw)) fields.eventType = "Elige el tipo de evento.";

  const date = text(formData, "date");
  if (date.length > CONTACT_LIMITS.date) fields.date = `Máximo ${CONTACT_LIMITS.date} caracteres.`;

  const place = text(formData, "place");
  if (place.length > CONTACT_LIMITS.place) fields.place = `Máximo ${CONTACT_LIMITS.place} caracteres.`;

  const details = text(formData, "details");
  if (details.length > CONTACT_LIMITS.details) fields.details = `Máximo ${CONTACT_LIMITS.details} caracteres.`;

  if (Object.keys(fields).length > 0) return { ok: false, fields };
  return { ok: true, value: { name, contact, eventType, date, place, details } };
}
