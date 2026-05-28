"use server";

import { logError } from "@/lib/logger";
import { getPayload } from "@/lib/payload/get-payload";
import type { ContactFormState } from "./contact.types";
import { validateContactForm } from "./contact.validation";

/**
 * Receives the contact form and stores it as a `contact-requests` document,
 * where the team reads and triages it from /admin. The local API bypasses
 * access control on purpose: the collection lets nobody create through REST,
 * so this action is the only door in. Validation happens first and reports
 * every field at once.
 */
export async function sendContactRequest(_previous: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const validation = validateContactForm(formData);
  if (!validation.ok) {
    return { status: "error", message: "Revisa los campos marcados.", fields: validation.fields };
  }

  const request = validation.value;

  try {
    const payload = await getPayload();
    await payload.create({
      collection: "contact-requests",
      data: {
        status: "new",
        name: request.name,
        contact: request.contact,
        eventType: request.eventType,
        date: request.date || null,
        place: request.place || null,
        details: request.details || null,
      },
    });
    return { status: "sent" };
  } catch (error) {
    logError("contact", "No se pudo guardar la solicitud de contacto", error, { request });
    return { status: "error", message: "No pudimos enviar tu solicitud. Escríbenos directo al correo." };
  }
}
