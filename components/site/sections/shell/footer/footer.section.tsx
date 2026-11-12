import { Logo } from "@/components/site/shared/logo.comp";
import { SITE_NAME } from "@/constants/site.const";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import "./footer.section.css";

const CURRENT_YEAR = 2026;

// Last line of the page, on the same paper as the contact letter above it:
// the name, what the quartet is and the photo credit. The contact details and
// the networks are on the letter, so they are not repeated here.
export async function Footer() {
  const settings = await getSiteSettingsData();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Logo theme="olive" height={34} />
          <p className="site-footer__name">
            {SITE_NAME} <span className="site-footer__year">© {CURRENT_YEAR}</span>
          </p>
        </div>
        <p className="site-footer__tagline">{settings.tagline}</p>
        <p className="site-footer__credit">{settings.photoCredit}</p>
      </div>
    </footer>
  );
}
