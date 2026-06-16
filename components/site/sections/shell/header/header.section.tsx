"use client";

import Link from "next/link";
import { Logo } from "@/components/site/shared/logo.comp";
import { NAV_ITEMS } from "@/constants/navigation.const";
import { useHeaderScroll } from "@/hooks/use-header-scroll.hook";
import { HeaderMobileMenu } from "./header-mobile-menu.comp";
import "./header.section.css";

const HERO_ID = "inicio";

// Fixed over the page. Transparent (ivory text) while the dark hero is under
// it and solid ivory (ink text) from the first light section on; the whole
// header is a Client Component because that state drives every child colour.
export function Header() {
  const pastHero = useHeaderScroll(HERO_ID);
  const theme = pastHero ? "ink" : "ivory";

  return (
    <header className={`site-header site-header_theme_${theme}`}>
      <div className="site-header__inner">
        <Logo theme={theme} height={46} />

        <nav className="site-header__nav" aria-label="Secciones">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="site-header__link">
              {item.label}
            </Link>
          ))}
        </nav>

        <HeaderMobileMenu theme={theme} />
      </div>
    </header>
  );
}
