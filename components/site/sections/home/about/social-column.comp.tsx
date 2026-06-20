import Link from "next/link";
import { SocialIcon } from "@/components/site/shared/social-icon.comp";
import type { SocialLink } from "@/services/site-settings/site-settings.types";
import "./social-column.comp.css";

interface SocialColumnProps {
  links: readonly SocialLink[];
}

/** Top to bottom, as designed; the settings list them in another order. */
const ORDER: SocialLink["label"][] = ["YouTube", "Instagram", "Facebook"];

// The three networks beside the group photo: a thin ring with the glyph and
// the name under it. A network without a public URL yet is drawn but not
// linked, like in the footer.
export function SocialColumn({ links }: SocialColumnProps) {
  const ordered = ORDER.map((label) => links.find((link) => link.label === label)).filter(
    (link): link is SocialLink => link !== undefined,
  );

  return (
    <ul className="social-column" aria-label="Redes del cuarteto">
      {ordered.map((link) => {
        const content = (
          <>
            <span className="social-column__ring">
              <SocialIcon network={link.label} />
            </span>
            <span className="social-column__name">{link.label}</span>
          </>
        );
        return (
          <li key={link.label} className="social-column__item">
            {link.href ? (
              <Link href={link.href} className="social-column__link" target="_blank" rel="noopener noreferrer">
                {content}
              </Link>
            ) : (
              <span
                className="social-column__link social-column__link_pending"
                title={`${link.label}: por confirmar`}
                aria-label={`${link.label}, por confirmar`}
              >
                {content}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
