export interface NavItem {
  label: string;
  href: string;
}

// Anchors of the one-page site. The header, the mobile menu and the footer
// read the same list, so a renamed section changes everywhere at once.
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "El cuarteto", href: "#cuarteto" },
  { label: "Integrantes", href: "#integrantes" },
  { label: "Repertorio", href: "#repertorio" },
];

export const CONTACT_NAV_ITEM: NavItem = { label: "Contacto", href: "#contacto" };
