"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/constants/navigation.const";
import "./header-mobile-menu.comp.css";

interface HeaderMobileMenuProps {
  theme: "ink" | "ivory";
}

// Two-line toggle and a full-screen ink panel with the same links as the
// desktop nav. Closes on Escape and after choosing a link.
export function HeaderMobileMenu({ theme }: HeaderMobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className={`header-menu-toggle header-menu-toggle_theme_${theme}${open ? " header-menu-toggle_open" : ""}`}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="menu-movil"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="header-menu-toggle__bar" />
        <span className="header-menu-toggle__bar" />
      </button>

      <div id="menu-movil" className={`header-mobile-menu${open ? " header-mobile-menu_open" : ""}`}>
        <nav className="header-mobile-menu__links" aria-label="Secciones">
          {NAV_ITEMS.map((item, index) => (
            <a key={item.href} href={item.href} className="header-mobile-menu__link" onClick={close}>
              <span className="header-mobile-menu__index">0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
