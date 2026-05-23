export interface Pillar {
  title: string;
  text: string;
}

export interface AboutDefaults {
  eyebrow: string;
  title: string;
  lead: string;
  pillars: readonly Pillar[];
  photo: { src: string; alt: string };
  photoCaption: string;
}

export const ABOUT_DEFAULTS: AboutDefaults = {
  eyebrow: "El cuarteto",
  title: "El sonido se construye escuchando",
  lead: "Cuarteto Fratres reúne a cuatro músicos con formación profesional y actividad orquestal en México. Trabajan el repertorio de cámara con la misma exigencia en una sala de concierto que en una ceremonia privada: el programa se elige para el lugar y para quien escucha.",
  pillars: [
    {
      title: "Interpretación",
      text: "Cada obra se aborda desde su propio lenguaje. El fraseo, el color y la articulación se deciden en el atril.",
    },
    {
      title: "Preparación",
      text: "Los programas se estudian por separado y se afinan en conjunto, con el tiempo que cada repertorio exige.",
    },
    {
      title: "Ensamble",
      text: "Afinación, ataque y respiración común son el trabajo diario del cuarteto. De ahí sale su sonido.",
    },
  ],
  photo: {
    src: "/images/cuarteto-escalinata.jpg",
    alt: "Los cuatro integrantes del Cuarteto Fratres en una escalinata",
  },
  photoCaption: "Cuarteto Fratres — Boca del Río, Veracruz",
};
