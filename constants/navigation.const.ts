export interface NavItem {
  label: string;
  href: string;
}

/** Anchor of the contact section: the top bar shows it apart, as its call to action. */
export const CONTACT_ANCHOR = "#contacto";

// Anchors of the one-page site, in page order. The top bar and the floating
// nav read the same list, so a renamed section changes everywhere at once.
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Presentaciones", href: "#presentaciones" },
  { label: "Integrantes", href: "#integrantes" },
  { label: "Repertorio", href: "#repertorio" },
  { label: "El cuarteto", href: "#cuarteto" },
  { label: "Contacto", href: CONTACT_ANCHOR },
];
