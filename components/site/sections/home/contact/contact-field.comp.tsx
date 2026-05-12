import "./contact-field.comp.css";

interface ContactFieldProps {
  label: string;
  name: string;
  maxLength: number;
  error?: string;
  multiline?: boolean;
  autoComplete?: string;
}

// Underlined text field. The label wraps the control, so clicking the caption
// focuses it and no `id` has to be generated.
export function ContactField({ label, name, maxLength, error, multiline = false, autoComplete }: ContactFieldProps) {
  const errorId = `${name}-error`;

  return (
    <label className={`contact-field${error ? " contact-field_invalid" : ""}`}>
      <span className="contact-field__label">{label}</span>
      {multiline ? (
        <textarea
          name={name}
          rows={3}
          maxLength={maxLength}
          className="contact-field__control contact-field__control_kind_textarea"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      ) : (
        <input
          type="text"
          name={name}
          maxLength={maxLength}
          autoComplete={autoComplete}
          className="contact-field__control"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      )}
      {error && (
        <span id={errorId} className="contact-field__error">
          {error}
        </span>
      )}
    </label>
  );
}
