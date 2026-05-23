export interface HeroDefaults {
  title: string;
  lead: string;
  image: { src: string; alt: string; position: string };
  listenLabel: string;
}

// Default content of the hero: what the seed writes to the CMS and what the
// site shows while the `hero` Global is still empty.
export const HERO_DEFAULTS: HeroDefaults = {
  title: "Cuarteto Fratres",
  lead: "Cuatro instrumentos que se escuchan entre sí. Música de cámara preparada obra por obra, para salas de concierto, ceremonias y celebraciones.",
  image: { src: "/images/hero.jpg", alt: "Cuarteto Fratres, cuarteto de cuerdas", position: "78% 50%" },
  listenLabel: "Escuchar al cuarteto",
};
