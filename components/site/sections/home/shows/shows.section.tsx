import { Reveal } from "@/components/site/shared/reveal.comp";
import { MAX_SHOW_POSTERS, SHOWS_COPY } from "@/constants/events.const";
import { getUpcomingEvents } from "@/services/events/events.service";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import { ShowPosters } from "./show-posters.comp";
import "./shows.section.css";

const TITLE_ID = "cartelera-titulo";

// The next dates as posters, on ivory, ending with the invitation poster.
// With no upcoming date published the whole section is left out: an empty
// listing would only say the quartet is idle. No link on the page points to
// its anchor, so nothing dangles.
export async function ShowsSection() {
  const [settings, events] = await Promise.all([getSiteSettingsData(), getUpcomingEvents(MAX_SHOW_POSTERS)]);
  if (events.length === 0) return null;

  return (
    <section id="cartelera" className="section section_theme_white shows" aria-labelledby={TITLE_ID}>
      <div className="section__inner">
        <Reveal>
          <h2 id={TITLE_ID} className="section-title">
            {SHOWS_COPY.title}
          </h2>
        </Reveal>
        <ShowPosters events={events} location={settings.location} labelledBy={TITLE_ID} />
      </div>
    </section>
  );
}
