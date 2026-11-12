import { ArrowIcon } from "@/components/site/shared/arrow-icon.comp";
import { Logo } from "@/components/site/shared/logo.comp";
import { CONTACT_ANCHOR, NAV_ITEMS } from "@/constants/navigation.const";
import { HeaderMobileMenu } from "./header-mobile-menu.comp";
import "./header.section.css";

interface HeaderProps {
  /** "/" on the other pages, so the anchors lead back to the home page; empty on the home page itself. */
  homeHref?: string;
}

// Thin bar over the top of the hero, scrolling away with it. Contact is set
// apart as the call to action; under 1100px the section links move into the
// phone menu and only the monogram, contact and the menu's toggle stay.
export function Header({ homeHref = "" }: HeaderProps) {
  const contact = NAV_ITEMS.find((item) => item.href === CONTACT_ANCHOR);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo theme="lime" height={42} href={homeHref || "#inicio"} />

        <nav className="site-header__nav" aria-label="Secciones">
          {NAV_ITEMS.filter((item) => item.href !== CONTACT_ANCHOR).map((item) => (
            <a key={item.href} href={`${homeHref}${item.href}`} className="site-header__link">
              {item.label}
            </a>
          ))}
        </nav>

        {contact && (
          <a href={`${homeHref}${contact.href}`} className="site-header__contact">
            {contact.label}
            <span className="site-header__contact-mark">
              <ArrowIcon direction="up-right" className="site-header__contact-icon" />
            </span>
          </a>
        )}
        <HeaderMobileMenu homeHref={homeHref} />
      </div>
    </header>
  );
}
