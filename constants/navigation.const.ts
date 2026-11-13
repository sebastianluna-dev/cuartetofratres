export interface NavItem {
  label: string;
  href: string;
}

/** Anchor of the contact section: the hero links to it as the first screen's call to action. */
export const CONTACT_ANCHOR = "#contacto";

// Anchors of the one-page site, in page order. Every link to a section reads
// this list, so a renamed section changes everywhere at once.
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Cartelera", href: "#cartelera" },
  { label: "Integrantes", href: "#integrantes" },
  { label: "Repertorio", href: "#repertorio" },
  { label: "El cuarteto", href: "#cuarteto" },
  { label: "Contacto", href: CONTACT_ANCHOR },
];
