import { ArrowIcon } from "@/components/site/shared/arrow-icon.comp";
import { Logo } from "@/components/site/shared/logo.comp";
import { CONTACT_ANCHOR, NAV_ITEMS } from "@/constants/navigation.const";
import "./header.section.css";

// Thin bar over the top of the hero: it scrolls away with it, and from there
// on the floating nav takes over. Contact is set apart as the call to action;
// under 1100px the section links leave and only the monogram and contact stay.
export function Header() {
  const contact = NAV_ITEMS.find((item) => item.href === CONTACT_ANCHOR);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo theme="lime" height={42} />

        <nav className="site-header__nav" aria-label="Secciones">
          {NAV_ITEMS.filter((item) => item.href !== CONTACT_ANCHOR).map((item) => (
            <a key={item.href} href={item.href} className="site-header__link">
              {item.label}
            </a>
          ))}
        </nav>

        {contact && (
          <a href={contact.href} className="site-header__contact">
            {contact.label}
            <span className="site-header__contact-mark">
              <ArrowIcon direction="up-right" className="site-header__contact-icon" />
            </span>
          </a>
        )}
      </div>
    </header>
  );
}
