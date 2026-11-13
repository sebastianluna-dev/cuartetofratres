"use client";

import { useActionState } from "react";
import { ArrowIcon } from "@/components/site/shared/arrow-icon.comp";
import { CONTACT_COPY, CONTACT_LIMITS } from "@/constants/contact.const";
import { sendContactRequest } from "@/services/contact/contact.actions";
import type { ContactFormState } from "@/services/contact/contact.types";
import { ContactField } from "./contact-field.comp";
import "./contact-form.comp.css";

const INITIAL_STATE: ContactFormState = { status: "idle" };

interface ContactFormProps {
  /** Small print under the submit button. */
  sentTitle: string;
  sentText: string;
}

// Plain form posted to a server action: it works before hydration and the
// browser keeps what was typed if validation sends it back. `useActionState`
// only adds the pending flag and the message under the button.
export function ContactForm({ sentTitle, sentText }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(sendContactRequest, INITIAL_STATE);
  const errors = state.status === "error" ? (state.fields ?? {}) : {};

  if (state.status === "sent") {
    return (
      <div className="contact-form contact-form_sent" role="status">
        <h3 className="contact-form__sent-title">{sentTitle}</h3>
        <p className="contact-form__sent-text">{sentText}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="contact-form" noValidate>
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

      <ContactField
        label="Detalles"
        name="details"
        maxLength={CONTACT_LIMITS.details}
        error={errors.details}
        multiline
      />

      {/* Last line of the letter: the button on the left, the message beside it. */}
      <div className="contact-form__footer">
        <button type="submit" className="pill-button pill-button_variant_ink contact-form__submit" disabled={pending}>
          {pending ? CONTACT_COPY.submitting : CONTACT_COPY.submit}
          <ArrowIcon className="pill-button__icon" />
        </button>
        {/* Only the error message lives here now; the region stays in the DOM so it is announced. */}
        <p className="contact-form__notice" aria-live="polite">
          {state.status === "error" ? state.message : null}
        </p>
      </div>
    </form>
  );
}
