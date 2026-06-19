import Link from "next/link";
import { SocialIcon } from "@/components/site/shared/social-icon.comp";
import type { SocialLink } from "@/services/site-settings/site-settings.types";
import "./social-column.comp.css";

interface SocialColumnProps {
  links: readonly SocialLink[];
}

/** Top to bottom, as designed; the settings list them in another order. */
const ORDER: SocialLink["label"][] = ["YouTube", "Instagram", "Facebook"];

// The three networks as round icon buttons beside the group photo. A network
// without a public URL yet is drawn but not linked, like in the footer.
export function SocialColumn({ links }: SocialColumnProps) {
  const ordered = ORDER.map((label) => links.find((link) => link.label === label)).filter(
    (link): link is SocialLink => link !== undefined,
  );

  return (
    <ul className="social-column" aria-label="Redes del cuarteto">
      {ordered.map((link) => (
        <li key={link.label} className="social-column__item">
          {link.href ? (
            <Link
              href={link.href}
              className="social-column__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
            >
              <SocialIcon network={link.label} />
            </Link>
          ) : (
            <span
              className="social-column__link social-column__link_pending"
              title={`${link.label}: por confirmar`}
              aria-label={`${link.label}, por confirmar`}
            >
              <SocialIcon network={link.label} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
