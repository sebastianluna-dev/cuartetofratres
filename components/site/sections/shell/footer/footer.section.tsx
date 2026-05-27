import Link from "next/link";
import { Logo } from "@/components/site/shared/logo.comp";
import { StaffOrnament } from "@/components/site/shared/staff-ornament.comp";
import { NAV_ITEMS } from "@/constants/navigation.const";
import { SITE_NAME } from "@/constants/site.const";
import { buildMailtoUrl } from "@/lib/build-mailto-url";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import "./footer.section.css";

const CURRENT_YEAR = 2026;

export async function Footer() {
  const settings = await getSiteSettingsData();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Logo theme="ivory" height={62} />
            <p className="site-footer__name">{SITE_NAME}</p>
            <p className="site-footer__description">{settings.tagline}</p>
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
            <Link href={buildMailtoUrl(settings.email)} className="site-footer__link">
              {settings.email}
            </Link>
            {settings.whatsapp ? (
              <Link href={`https://wa.me/${settings.whatsapp}`} className="site-footer__link" target="_blank">
                WhatsApp: +{settings.whatsapp}
              </Link>
            ) : (
              <span className="site-footer__text">WhatsApp por confirmar</span>
            )}
            <span className="site-footer__text">{settings.location}</span>
          </div>

          <div className="site-footer__column">
            <span className="site-footer__heading">Redes</span>
            {settings.social.map((network) =>
              network.href ? (
                <Link key={network.label} href={network.href} className="site-footer__link" target="_blank">
                  {network.label}
                </Link>
              ) : (
                <span key={network.label} className="site-footer__text">
                  {network.label}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>
            © {CURRENT_YEAR} {SITE_NAME}. Todos los derechos reservados.
          </span>
          <StaffOrnament theme="ivory" width={160} />
          <span>{settings.photoCredit}</span>
        </div>
      </div>
    </footer>
  );
}
