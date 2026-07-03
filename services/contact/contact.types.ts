export interface ContactRequest {
  name: string;
  contact: string;
  details: string;
}

export type ContactFieldErrors = Partial<Record<keyof ContactRequest, string>>;

/** What the form receives back from the server action. */
export type ContactFormState =
  { status: "idle" } | { status: "error"; message: string; fields?: ContactFieldErrors } | { status: "sent" };
