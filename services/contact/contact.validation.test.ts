import { describe, expect, it } from "vitest";
import { validateContactForm } from "./contact.validation";

function form(entries: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(entries)) data.set(key, value);
  return data;
}

describe("validateContactForm", () => {
  it("accepts a complete request and trims the fields", () => {
    const result = validateContactForm(
      form({
        name: "  Ana  ",
        contact: "ana@ejemplo.com",
        eventType: "boda",
        date: "12/12/2026",
        place: "Xalapa",
        details: "",
      }),
    );
    expect(result).toEqual({
      ok: true,
      value: {
        name: "Ana",
        contact: "ana@ejemplo.com",
        eventType: "boda",
        date: "12/12/2026",
        place: "Xalapa",
        details: "",
      },
    });
  });

  it("reports every missing field at once", () => {
    const result = validateContactForm(form({ eventType: "no-existe" }));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(Object.keys(result.fields).sort()).toEqual(["contact", "eventType", "name"]);
  });

  it("caps the length of the free text", () => {
    const result = validateContactForm(
      form({ name: "Ana", contact: "ana", eventType: "privado", details: "x".repeat(2001) }),
    );
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.fields.details).toMatch(/Máximo/);
  });
});
