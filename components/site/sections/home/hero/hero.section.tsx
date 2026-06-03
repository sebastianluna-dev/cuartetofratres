import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUpcomingEvents } from "@/services/events/events.service";
import { getHeroData } from "@/services/hero/hero.service";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import { EventCard } from "./event-card.comp";
import "./hero.section.css";

const MAX_EVENT_CARDS = 2;

// First screen: the name and the next two dates on the left, the group photo
// against the right edge, centred. The photo is the LCP, hence `priority`.
export async function HeroSection() {
  const [hero, events, settings] = await Promise.all([
    getHeroData(),
    getUpcomingEvents(MAX_EVENT_CARDS),
    getSiteSettingsData(),
  ]);

  return (
    <section id="inicio" className="section section_theme_ink hero">
      {/* The real size of the file gives the frame the photo's own ratio on
          desktop, so the vignette lands exactly on its edges. */}
      <div
        className="hero__media"
        style={{ "--photo-width": hero.image.width, "--photo-height": hero.image.height } as CSSProperties}
      >
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes={`(max-width: 767px) 100vw, min(64vw, ${hero.image.width}px)`}
          className="hero__photo"
          quality={100}
          style={{ objectPosition: hero.imagePosition }}
        />
      </div>

      <div className="hero__inner">
        <h1 className="hero__title">{hero.title}</h1>
        <p className="hero__lead">{hero.lead}</p>

        <div className="hero__row">
          {events.length > 0 && (
            <ul className="hero__events" aria-label="Próximas presentaciones">
              {events.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
          )}
          <Link href="#repertorio" className="hero__listen">
            {hero.listenLabel}
          </Link>
        </div>

        <p className="hero__location">
          <span className="hero__location-rule" aria-hidden="true" />
          {settings.location}
        </p>
      </div>
    </section>
  );
}
