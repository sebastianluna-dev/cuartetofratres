"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { NAV_ITEMS } from "@/constants/navigation.const";
import { TITLE_FONT_OPTIONS, type TitleFontOption } from "@/constants/title-fonts.const";
import "./font-preview.section.css";

const STORAGE_KEY = "cf-title-font";
const FONTS_LINK_ID = "font-preview-fonts";
const TITLES = ".section-title";
const GROUPS = ["Serif", "Caligráficas"] as const;

function readStored(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// The choice lives in localStorage; the component reads it as an external
// store, so the server renders «Actual» and the browser catches up after.
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function store(id: string | null): void {
  try {
    if (id) window.localStorage.setItem(STORAGE_KEY, id);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Private mode: the choice simply does not survive a reload.
  }
  listeners.forEach((listener) => listener());
}

/** One stylesheet with every face, added the first time the panel is used. */
function loadFonts(): void {
  if (document.getElementById(FONTS_LINK_ID)) return;
  const link = document.createElement("link");
  link.id = FONTS_LINK_ID;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?${TITLE_FONT_OPTIONS.map((font) => `family=${font.google}`).join("&")}&display=swap`;
  document.head.appendChild(link);
}

/** Writes the face on every section title, or takes it off with `null`. */
function apply(font: TitleFontOption | null): void {
  document.querySelectorAll<HTMLElement>(TITLES).forEach((title) => {
    const style = title.style;
    if (!font) {
      ["font-family", "font-style", "font-weight", "text-transform", "letter-spacing", "font-size"].forEach(
        (property) => style.removeProperty(property),
      );
      return;
    }
    style.setProperty("font-family", font.family);
    style.setProperty("font-style", font.italic ? "italic" : "normal");
    style.setProperty("font-weight", String(font.weight ?? 400));
    style.setProperty("text-transform", font.uppercase ? "uppercase" : "none");
    style.setProperty("letter-spacing", `${font.tracking ?? 0}em`);
    style.setProperty("font-size", `calc(clamp(52px, 7vw, 104px) * ${font.scale ?? 1})`);
  });
}

// Review tool, never rendered in production: a floating panel to try the
// faces of propuestas-rediseno/10 and /11 on the real section titles, with
// shortcuts to each section. The choice is kept in this browser only.
export function FontPreview() {
  const [open, setOpen] = useState(false);
  const stored = useSyncExternalStore(subscribe, readStored, () => null);
  const active = TITLE_FONT_OPTIONS.find((option) => option.id === stored) ?? null;
  const current = active?.id ?? null;

  // The titles follow the stored choice, on load and after every click.
  useEffect(() => {
    if (active) loadFonts();
    apply(active);
  }, [active]);

  const choose = (font: TitleFontOption | null) => store(font?.id ?? null);

  const toggle = () => {
    loadFonts();
    setOpen((value) => !value);
  };

  return (
    <aside className={`font-preview${open ? " font-preview_open" : ""}`} aria-label="Revisión de fuentes">
      <button type="button" className="font-preview__toggle" aria-expanded={open} onClick={toggle}>
        <span className="font-preview__dot" aria-hidden="true" />
        Fuentes · {active ? active.name : "Actual"}
      </button>

      {open && (
        <div className="font-preview__panel">
          <p className="font-preview__heading">Ir a la sección</p>
          <nav className="font-preview__sections" aria-label="Secciones">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="font-preview__chip">
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className={`font-preview__font${current === null ? " font-preview__font_current" : ""}`}
            aria-pressed={current === null}
            onClick={() => choose(null)}
          >
            Actual (sin cambios)
          </button>
          {GROUPS.map((group) => (
            <div key={group} className="font-preview__group">
              <p className="font-preview__heading">{group}</p>
              <div className="font-preview__fonts">
                {TITLE_FONT_OPTIONS.filter((font) => font.group === group).map((font) => (
                  <button
                    key={font.id}
                    type="button"
                    className={`font-preview__font${current === font.id ? " font-preview__font_current" : ""}`}
                    aria-pressed={current === font.id}
                    style={{ fontFamily: font.family, fontStyle: font.italic ? "italic" : "normal" }}
                    onClick={() => choose(font)}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
