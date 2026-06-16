export interface NavItem {
  label: string;
  href: string;
}

// Anchors of the one-page site. The header, the mobile menu and the footer
// read the same list, so a renamed section changes everywhere at once.
// Contact is one more section here, not a call to action apart.
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "El cuarteto", href: "#cuarteto" },
  { label: "Integrantes", href: "#integrantes" },
  { label: "Repertorio", href: "#repertorio" },
  { label: "Contacto", href: "#contacto" },
];
