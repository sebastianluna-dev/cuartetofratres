"use client";

import { useEffect, useRef } from "react";
import { NAV_ITEMS } from "@/constants/navigation.const";
import { useSectionSpy } from "@/hooks/use-section-spy.hook";
import "./floating-nav.section.css";

const HERO_ID = "inicio";
const ANCHORS = NAV_ITEMS.map((item) => item.href);

// Pill fixed to the bottom of the screen once the hero is behind: the sections
// of the page with the current one marked by an ivory pill that slides under the
// links. On the phone the list scrolls sideways and follows the current link.
export function FloatingNav() {
  const { pastHero, activeIndex } = useSectionSpy(HERO_ID, ANCHORS);
  const listRef = useRef<HTMLUListElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  // The indicator is moved on the node: its place comes from measuring the
  // link, and nothing else in the tree depends on it.
  useEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const place = () => {
      const link =
        activeIndex >= 0 ? list.querySelectorAll<HTMLElement>(".floating-nav__link")[activeIndex] : undefined;
      if (!link) return;
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.style.transform = `translateX(${link.offsetLeft}px)`;
      if (list.scrollWidth > list.clientWidth) {
        list.scrollTo({ left: link.offsetLeft - list.clientWidth / 2 + link.offsetWidth / 2, behavior: "smooth" });
      }
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [activeIndex]);

  const classes = [
    "floating-nav",
    pastHero ? "floating-nav_visible" : "",
    activeIndex >= 0 ? "floating-nav_has_active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={classes} aria-label="Secciones de la página">
      <ul ref={listRef} className="floating-nav__list">
        <li className="floating-nav__indicator-item" aria-hidden="true">
          <span ref={indicatorRef} className="floating-nav__indicator" />
        </li>
        {NAV_ITEMS.map((item, index) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="floating-nav__link"
              aria-current={index === activeIndex ? "true" : undefined}
              tabIndex={pastHero ? undefined : -1}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
