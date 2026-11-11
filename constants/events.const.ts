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
  tickets?: { url?: string; prices?: { amount: string; label?: string }[] };
}

// Seed of the `events` collection (`npm run cms:seed`) and nothing else: the
// hero reads the CMS only, so with no published date it shows no dates.
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
    tickets: { url: "https://www.boletia.com/eventos/cuarteto-fratres-borodin-schubert" },
  },
];

/** Fixed labels of the event window: structure, not content, so they stay in code. */
export const EVENT_DIALOG_LABELS = {
  program: "Programa",
  venue: "Lugar",
  directions: "Cómo llegar",
  ticketsHeading: "Entradas",
  tickets: "Comprar boletos",
  inquire: "Solicitar informes",
  close: "Cerrar",
} as const;

/** Dates shown as posters; the invitation poster always closes the row. */
export const MAX_SHOW_POSTERS = 2;

/**
 * Fixed copy of the dates section: the button of a poster, the invitation
 * poster that leads to the contact form and the poster shown while no date is
 * published.
 */
export const SHOWS_COPY = {
  program: "Ver programa",
  invitation: {
    top: "Tu",
    topNote: "Fecha · Tu lugar",
    side: "Programa a la medida",
    title: "Bodas, ceremonias y eventos",
    where: "Conciertos · Bodas · Eventos privados",
    note: "Te respondemos con una propuesta de programa.",
    action: "Solicitar informes",
  },
  pending: {
    top: "Pronto",
    topNote: "Nuevas fechas",
    title: "Próximas fechas por anunciar",
  },
} as const;
