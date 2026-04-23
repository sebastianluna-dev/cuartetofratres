export interface UpcomingEvent {
  id: string;
  title: string;
  /** ISO date, local to the venue. */
  date: string;
  /** "HH:mm", 24 h. */
  time: string;
  city: string;
  image: {
    src: string;
    position: string;
  };
}

// Dates are edited here until the quartet has a calendar of its own.
export const UPCOMING_EVENTS: readonly UpcomingEvent[] = [
  {
    id: "temporada-2026",
    title: "Concierto de temporada",
    date: "2026-10-24",
    time: "20:00",
    city: "Boca del Río, Veracruz",
    image: { src: "/images/event-temporada.jpg", position: "46% 42%" },
  },
  {
    id: "borodin-schubert-2026",
    title: "Borodin y Schubert",
    date: "2026-11-08",
    time: "19:30",
    city: "Xalapa, Veracruz",
    image: { src: "/images/event-borodin-schubert.jpg", position: "64% 50%" },
  },
];
