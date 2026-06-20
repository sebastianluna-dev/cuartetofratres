import type { SocialLink } from "@/services/site-settings/site-settings.types";

interface SocialIconProps {
  network: SocialLink["label"];
  /** Drawn size in px; the glyphs are 24×24. */
  size?: number;
}

// Thin outlined glyphs, drawn with the current text colour. Decorative: the
// link that wraps one carries the name.
export function SocialIcon({ network, size = 18 }: SocialIconProps) {
  const shared = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    "aria-hidden": true,
    focusable: false,
  } as const;

  if (network === "Instagram") {
    return (
      <svg {...shared}>
        <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4.4" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="16.8" cy="7.2" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (network === "Facebook") {
    return (
      <svg {...shared} strokeLinecap="square">
        <path d="M13.6 20.4V8.1c0-1.5.8-2.3 2.3-2.3h1.6" />
        <path d="M10.4 11.8h7" />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <rect x="2.8" y="5.8" width="18.4" height="12.4" rx="3.2" />
      <path d="M10.4 9.5 15.5 12l-5.1 2.5z" strokeLinejoin="round" />
    </svg>
  );
}
