import { Logo } from "@/components/site/shared/logo.comp";
import { SITE_CREDIT, SITE_NAME } from "@/constants/site.const";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import "./footer.section.css";

const CURRENT_YEAR = 2026;

interface FooterProps {
  /** Cream under the home page's contact section ("ivory" is the light one); ink at the foot of a musician's dark page. */
  theme?: "ivory" | "ink";
}

// Last line of the page: the name, what the quartet is and who made the site.
// The contact details and the networks are in the contact section, so they
// are not repeated here.
export async function Footer({ theme = "ivory" }: FooterProps) {
  const settings = await getSiteSettingsData();
  const onInk = theme === "ink";

  return (
    <footer className={`site-footer site-footer_theme_${theme}`}>
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          {/* On a musician's page the monogram leads home; on the home page, to its top. */}
          <Logo theme={onInk ? "ivory" : "ink"} height={34} href={onInk ? "/" : "#inicio"} />
          <p className="site-footer__name">
            {SITE_NAME} <span className="site-footer__year">© {CURRENT_YEAR}</span>
          </p>
        </div>
        <p className="site-footer__tagline">{settings.tagline}</p>
        <p className="site-footer__credit">
          {SITE_CREDIT.label}{" "}
          <a href={SITE_CREDIT.href} className="site-footer__credit-link" target="_blank" rel="noopener">
            {SITE_CREDIT.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
