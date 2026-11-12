export interface HeroDefaults {
  title: string;
  lead: string;
  /** `width`/`height`: real pixels of the file, which cap how big the hero draws it. */
  image: { src: string; alt: string; position: string; width: number; height: number };
  listenLabel: string;
  /** Heading of the upcoming events, shown on the phone only. */
  eventsHeading: string;
}

// Default content of the hero: what the seed writes to the CMS and what the
// site shows while the `hero` Global is still empty.
export const HERO_DEFAULTS: HeroDefaults = {
  title: "Cuarteto Fratres",
  lead: "Cuatro instrumentos que se escuchan entre sí. Música de cámara preparada obra por obra, para salas de concierto, ceremonias y celebraciones.",
  image: {
    src: "/images/hero.jpg",
    alt: "Cuarteto Fratres, cuarteto de cuerdas",
    position: "78% 50%",
    width: 1672,
    height: 941,
  },
  listenLabel: "Escuchar al cuarteto",
  eventsHeading: "Próximas presentaciones",
};

/**
 * Fixed copy of the hero's frame. It is not in the CMS: these lines belong to
 * the composition (the label over the name, the link to the members),
 * not to what the quartet edits.
 */
export const HERO_COPY = {
  kicker: "Cuarteto de cuerdas",
  membersLink: "Conoce al cuarteto",
  occasions: "Conciertos · Ceremonias · Eventos privados",
} as const;
