import { Reveal } from "@/components/site/shared/reveal.comp";
import { MAX_SHOW_POSTERS, SHOWS_COPY } from "@/constants/events.const";
import { getUpcomingEvents } from "@/services/events/events.service";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import { ShowPosters } from "./show-posters.comp";
import "./shows.section.css";

const TITLE_ID = "cartelera-titulo";

// The next dates as posters, on ivory. The row always ends with the
// invitation poster; with no date published, a poster says so instead of
// leaving the section out, so its anchor in the nav never dangles.
export async function ShowsSection() {
  const [settings, events] = await Promise.all([getSiteSettingsData(), getUpcomingEvents(MAX_SHOW_POSTERS)]);

  return (
    <section id="cartelera" className="section section_theme_ivory shows" aria-labelledby={TITLE_ID}>
      <div className="section__inner">
        <Reveal>
          <h2 id={TITLE_ID} className="section-title section-title_face_display">
            {SHOWS_COPY.title}
          </h2>
        </Reveal>
        <ShowPosters events={events} location={settings.location} labelledBy={TITLE_ID} />
      </div>
    </section>
  );
}
