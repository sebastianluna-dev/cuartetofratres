import { Reveal } from "@/components/site/shared/reveal.comp";
import { MAX_SHOW_POSTERS } from "@/constants/events.const";
import { getUpcomingEvents } from "@/services/events/events.service";
import { getHeroData } from "@/services/hero/hero.service";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import { ShowPosters } from "./show-posters.comp";
import "./shows.section.css";

const TITLE_ID = "presentaciones-titulo";

// The next dates as posters, on ivory. The row always ends with the
// invitation poster; with no date published, a poster says so instead of
// leaving the section out, so its anchor in the nav never dangles.
export async function ShowsSection() {
  const [hero, settings, events] = await Promise.all([
    getHeroData(),
    getSiteSettingsData(),
    getUpcomingEvents(MAX_SHOW_POSTERS),
  ]);

  return (
    <section id="presentaciones" className="section section_theme_ivory shows" aria-labelledby={TITLE_ID}>
      <div className="section__inner">
        <Reveal>
          <h2 id={TITLE_ID} className="section-title">
            {hero.eventsHeading}
          </h2>
        </Reveal>
        <ShowPosters events={events} location={settings.location} labelledBy={TITLE_ID} />
      </div>
    </section>
  );
}
