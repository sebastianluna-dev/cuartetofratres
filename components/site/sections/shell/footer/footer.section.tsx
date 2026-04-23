import Link from "next/link";
import { Logo } from "@/components/site/shared/logo.comp";
import { StaffOrnament } from "@/components/site/shared/staff-ornament.comp";
import { NAV_ITEMS } from "@/constants/navigation.const";
import { CONTACT_EMAIL, SITE_LOCATION, SITE_NAME, SITE_TAGLINE, SOCIAL_NETWORKS } from "@/constants/site.const";
import { buildMailtoUrl } from "@/lib/build-mailto-url";
import "./footer.section.css";

const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Logo theme="ivory" height={62} />
            <p className="site-footer__name">{SITE_NAME}</p>
            <p className="site-footer__description">{SITE_TAGLINE}</p>
          </div>

          <nav className="site-footer__column" aria-label="Secciones">
            <span className="site-footer__heading">Secciones</span>
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="site-footer__link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-footer__column">
            <span className="site-footer__heading">Contacto</span>
            <Link href={buildMailtoUrl(CONTACT_EMAIL)} className="site-footer__link">
              {CONTACT_EMAIL}
            </Link>
            <span className="site-footer__text">WhatsApp por confirmar</span>
            <span className="site-footer__text">{SITE_LOCATION}</span>
          </div>

          <div className="site-footer__column">
            <span className="site-footer__heading">Redes</span>
            {SOCIAL_NETWORKS.map((network) => (
              <span key={network} className="site-footer__text">
                {network}
              </span>
            ))}
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>
            © {CURRENT_YEAR} {SITE_NAME}. Todos los derechos reservados.
          </span>
          <StaffOrnament theme="ivory" width={160} />
          <span>Fotografía: archivo del cuarteto</span>
        </div>
      </div>
    </footer>
  );
}
