import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUpcomingEvents } from "@/services/events/events.service";
import { getHeroData } from "@/services/hero/hero.service";
import { EventCards } from "./event-cards.comp";
import "./hero.section.css";

const MAX_EVENT_CARDS = 2;

/** Width / height of the photo's frame on the phone; the same 11 / 10 as hero.section.css. */
const PHONE_FRAME_RATIO = 11 / 10;

// First screen: the name and the next two dates on the left, the group photo
// against the right edge, centred. The photo is the LCP, hence `priority`.
export async function HeroSection() {
  const [hero, events] = await Promise.all([getHeroData(), getUpcomingEvents(MAX_EVENT_CARDS)]);

  // On the phone the photo is cropped to fill a taller frame, so it is drawn
  // wider than the screen: next/image must request that width, not 100vw.
  const phoneWidthVw = Math.ceil((hero.image.width / hero.image.height / PHONE_FRAME_RATIO) * 100);

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
          sizes={`(max-width: 767px) ${phoneWidthVw}vw, min(64vw, ${hero.image.width}px)`}
          className="hero__photo"
          quality={100}
          style={{ objectPosition: hero.imagePosition }}
        />
      </div>

      <div className="hero__inner">
        <h1 className="hero__title">{hero.title}</h1>
        <p className="hero__lead">{hero.lead}</p>

        {/* DOM order is heading → cards → listen button (the tab order on
            desktop); the phone shows the button first through CSS `order`. */}
        <div className="hero__row">
          {events.length > 0 && (
            <>
              <h2 id="proximas-presentaciones" className="hero__events-heading">
                {hero.eventsHeading}
              </h2>
              <EventCards events={events} labelledBy="proximas-presentaciones" />
            </>
          )}
          <Link href="#repertorio" className="hero__listen">
            {hero.listenLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
