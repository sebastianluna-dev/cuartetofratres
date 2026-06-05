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
    alt: string;
    position: string;
  };
  // Detail of the window that opens from the card; the seed may leave it out.
  description?: string;
  program?: { title: string; composer?: string }[];
  venue?: { name?: string; address?: string; mapsUrl?: string };
  tickets?: { url?: string; price?: string };
}

// Seed of the `events` collection and fallback while it is empty. The hero
// shows them in order and only the ones still ahead (lib/upcoming-events.ts).
export const UPCOMING_EVENTS: readonly UpcomingEvent[] = [
  {
    id: "temporada-2026",
    title: "Concierto de temporada",
    date: "2026-10-24",
    time: "20:00",
    city: "Boca del Río, Veracruz",
    image: { src: "/images/event-temporada.jpg", alt: "Próxima presentación del cuarteto", position: "46% 42%" },
    description:
      "Programa de cámara con obras del repertorio clásico y latinoamericano del cuarteto. Entrada libre hasta completar aforo.",
    program: [
      { title: "Cuarteto núm. 2 en Re mayor", composer: "Aleksandr Borodín" },
      { title: "Danzas Latinoamericanas", composer: "José Elizondo" },
    ],
  },
  {
    id: "borodin-schubert-2026",
    title: "Borodin y Schubert",
    date: "2026-11-08",
    time: "19:30",
    city: "Xalapa, Veracruz",
    image: { src: "/images/event-borodin-schubert.jpg", alt: "Cuarteto Fratres en concierto", position: "64% 50%" },
    program: [
      { title: "Cuarteto núm. 2 en Re mayor", composer: "Aleksandr Borodín" },
      { title: "Cuarteto núm. 14 «La muerte y la doncella»", composer: "Franz Schubert" },
    ],
  },
];

/** Fixed labels of the event window: structure, not content, so they stay in code. */
export const EVENT_DIALOG_LABELS = {
  program: "Programa",
  venue: "Lugar",
  directions: "Cómo llegar",
  tickets: "Comprar boletos",
  inquire: "Solicitar informes",
  close: "Cerrar",
} as const;
