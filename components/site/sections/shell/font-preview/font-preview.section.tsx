"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { NAV_ITEMS } from "@/constants/navigation.const";
import { TITLE_FONT_OPTIONS, type TitleFontOption } from "@/constants/title-fonts.const";
import "./font-preview.section.css";

const STORAGE_KEY = "cf-title-font";
const SIZE_KEY = "cf-title-size";
/** Size of the titles in percent of their own: the slider's range and step. */
const SIZE_MIN = 60;
const SIZE_MAX = 160;
const SIZE_STEP = 5;
const SIZE_DEFAULT = 100;
const FONTS_LINK_ID = "font-preview-fonts";
const TITLES = ".section-title";
const GROUPS = ["Serif", "Caligráficas"] as const;

function readKey(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

const readStored = () => readKey(STORAGE_KEY);
const readSize = () => readKey(SIZE_KEY) ?? String(SIZE_DEFAULT);

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

function store(key: string, value: string | null): void {
  try {
    if (value) window.localStorage.setItem(key, value);
    else window.localStorage.removeItem(key);
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

/**
 * Writes the face and the size on every section title. With no face the
 * titles keep their own (only the size changes); at 100% and no face,
 * everything is taken off.
 */
function apply(font: TitleFontOption | null, sizePercent: number): void {
  const faceProperties = ["font-family", "font-style", "font-weight", "text-transform", "letter-spacing"];
  document.querySelectorAll<HTMLElement>(TITLES).forEach((title) => {
    const style = title.style;
    if (font) {
      style.setProperty("font-family", font.family);
      style.setProperty("font-style", font.italic ? "italic" : "normal");
      style.setProperty("font-weight", String(font.weight ?? 400));
      style.setProperty("text-transform", font.uppercase ? "uppercase" : "none");
      style.setProperty("letter-spacing", `${font.tracking ?? 0}em`);
    } else {
      faceProperties.forEach((property) => style.removeProperty(property));
    }
    const factor = (font?.scale ?? 1) * (sizePercent / 100);
    if (factor === 1) style.removeProperty("font-size");
    else style.setProperty("font-size", `calc(clamp(52px, 7vw, 104px) * ${factor})`);
  });
}

// Review tool, never rendered in production: a floating panel to try the
// faces of propuestas-rediseno/10 and /11 on the real section titles, with
// shortcuts to each section. The choice is kept in this browser only.
export function FontPreview() {
  const [open, setOpen] = useState(false);
  const stored = useSyncExternalStore(subscribe, readStored, () => null);
  const storedSize = useSyncExternalStore(subscribe, readSize, () => String(SIZE_DEFAULT));
  const active = TITLE_FONT_OPTIONS.find((option) => option.id === stored) ?? null;
  const current = active?.id ?? null;
  const size = Math.min(SIZE_MAX, Math.max(SIZE_MIN, Number(storedSize) || SIZE_DEFAULT));

  // The titles follow the stored choice, on load and after every change.
  useEffect(() => {
    if (active) loadFonts();
    apply(active, size);
  }, [active, size]);

  const choose = (font: TitleFontOption | null) => store(STORAGE_KEY, font?.id ?? null);
  const resize = (percent: number) => store(SIZE_KEY, percent === SIZE_DEFAULT ? null : String(percent));

  const toggle = () => {
    loadFonts();
    setOpen((value) => !value);
  };

  return (
    <aside className={`font-preview${open ? " font-preview_open" : ""}`} aria-label="Revisión de fuentes">
      <button type="button" className="font-preview__toggle" aria-expanded={open} onClick={toggle}>
        <span className="font-preview__dot" aria-hidden="true" />
        Fuentes · {active ? active.name : "Actual"}
        {size !== SIZE_DEFAULT && ` · ${size}%`}
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

          <div className="font-preview__size">
            <label className="font-preview__heading" htmlFor="font-preview-size">
              Tamaño · {size}%
            </label>
            <div className="font-preview__size-row">
              <input
                id="font-preview-size"
                type="range"
                className="font-preview__range"
                min={SIZE_MIN}
                max={SIZE_MAX}
                step={SIZE_STEP}
                value={size}
                onChange={(event) => resize(Number(event.target.value))}
              />
              <button
                type="button"
                className="font-preview__chip"
                disabled={size === SIZE_DEFAULT}
                onClick={() => resize(SIZE_DEFAULT)}
              >
                100%
              </button>
            </div>
          </div>

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
