"use client";

import { useActionState } from "react";
import { CONTACT_LIMITS, EVENT_TYPES } from "@/constants/contact.const";
import { sendContactRequest } from "@/services/contact/contact.actions";
import type { ContactFormState } from "@/services/contact/contact.types";
import { ContactField } from "./contact-field.comp";
import { EventTypePicker } from "./event-type-picker.comp";
import "./contact-form.comp.css";

const INITIAL_STATE: ContactFormState = { status: "idle" };

// Plain form posted to a server action: it works before hydration and the
// browser keeps what was typed if validation sends it back. `useActionState`
// only adds the pending flag and the message under the button.
export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactRequest, INITIAL_STATE);
  const errors = state.status === "error" ? (state.fields ?? {}) : {};

  if (state.status === "sent") {
    return (
      <div className="contact-form contact-form_sent" role="status">
        <h3 className="contact-form__sent-title">Gracias.</h3>
        <p className="contact-form__sent-text">
          Te respondemos al correo o WhatsApp que dejaste, con propuesta de programa y duración.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="contact-form" noValidate>
      <div className="contact-form__row">
        <ContactField
          label="Nombre"
          name="name"
          maxLength={CONTACT_LIMITS.name}
          error={errors.name}
          autoComplete="name"
        />
        <ContactField
          label="Correo o WhatsApp"
          name="contact"
          maxLength={CONTACT_LIMITS.contact}
          error={errors.contact}
          autoComplete="email"
        />
      </div>

      <EventTypePicker options={EVENT_TYPES} error={errors.eventType} />

      <div className="contact-form__row">
        <ContactField label="Fecha" name="date" maxLength={CONTACT_LIMITS.date} error={errors.date} />
        <ContactField label="Lugar" name="place" maxLength={CONTACT_LIMITS.place} error={errors.place} />
      </div>

      <ContactField
        label="Detalles"
        name="details"
        maxLength={CONTACT_LIMITS.details}
        error={errors.details}
        multiline
      />

      <button type="submit" className="button button_variant_ink contact-form__submit" disabled={pending}>
        {pending ? "Enviando…" : "Enviar solicitud"}
      </button>
      <p className="contact-form__notice" aria-live="polite">
        {state.status === "error" ? state.message : "Te respondemos con propuesta de programa y duración."}
      </p>
    </form>
  );
}
