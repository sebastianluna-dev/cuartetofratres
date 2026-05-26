import Image from "next/image";
import Link from "next/link";
import { UPCOMING_EVENTS } from "@/constants/events.const";
import { SITE_LOCATION, SITE_NAME } from "@/constants/site.const";
import { selectUpcoming, todayIso } from "@/lib/upcoming-events";
import { EventCard } from "./event-card.comp";
import "./hero.section.css";

const MAX_EVENT_CARDS = 2;

// First screen: the group photo to the right, the name and the next two
// dates to the left. The photo is the LCP, hence `priority`.
export function HeroSection() {
  const events = selectUpcoming(UPCOMING_EVENTS, todayIso()).slice(0, MAX_EVENT_CARDS);

  return (
    <section id="inicio" className="section section_theme_ink hero">
      <Image
        src="/images/hero.jpg"
        alt="Cuarteto Fratres, cuarteto de cuerdas"
        fill
        priority
        sizes="100vw"
        className="hero__photo"
      />
      <div className="hero__shade hero__shade_side_left" />
      <div className="hero__shade hero__shade_side_bottom" />

      <div className="hero__inner">
        <h1 className="hero__title">{SITE_NAME}</h1>
        <p className="hero__lead">
          Cuatro instrumentos que se escuchan entre sí. Música de cámara preparada obra por obra, para salas de
          concierto, ceremonias y celebraciones.
        </p>

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
            {"Escuchar al "}
            <br />
            cuarteto
          </Link>
        </div>

        <p className="hero__location">
          <span className="hero__location-rule" aria-hidden="true" />
          {SITE_LOCATION}
        </p>
      </div>
    </section>
  );
}
