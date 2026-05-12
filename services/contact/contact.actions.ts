"use server";

import { logError, logInfo, logWarning } from "@/lib/logger";
import type { ContactFormState } from "./contact.types";
import { validateContactForm } from "./contact.validation";

const WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL;

/**
 * Receives the contact form. With `CONTACT_WEBHOOK_URL` set, the request is
 * POSTed there as JSON (a Zapier/Make hook, a small mail relay); without it,
 * it is only logged, which is what local development does. Either way the
 * visitor gets the same confirmation: the form must not depend on a third
 * party being up to feel finished.
 */
export async function sendContactRequest(_previous: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const validation = validateContactForm(formData);
  if (!validation.ok) {
    return { status: "error", message: "Revisa los campos marcados.", fields: validation.fields };
  }

  const request = validation.value;

  if (!WEBHOOK_URL) {
    logInfo("contact", "Solicitud de contacto recibida (sin webhook configurado)", { request });
    return { status: "sent" };
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...request, receivedAt: new Date().toISOString() }),
    });
    if (!response.ok) {
      logWarning("contact", "El webhook de contacto respondió con error", { status: response.status, request });
      return { status: "error", message: "No pudimos enviar tu solicitud. Escríbenos directo al correo." };
    }
    return { status: "sent" };
  } catch (error) {
    logError("contact", "No se pudo entregar la solicitud de contacto", error, { request });
    return { status: "error", message: "No pudimos enviar tu solicitud. Escríbenos directo al correo." };
  }
}
