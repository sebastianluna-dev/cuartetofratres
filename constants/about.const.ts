export interface AboutDefaults {
  title: string;
  lead: string;
  /** `width`/`height`: real pixels of the file, which give the frame its proportions. */
  photo: { src: string; alt: string; width: number; height: number };
}

export const ABOUT_DEFAULTS: AboutDefaults = {
  title: "Nuestra música",
  lead: "Cuarteto Fratres reúne a cuatro músicos con trayectoria orquestal en México: Jesús Medina y Lucía Paredes en los violines, Ricardo Sánchez en la viola y Alfonso Pérez en el violonchelo. Han tocado en la Filarmónica de Boca del Río y la Orquesta Sinfónica de Xalapa, y han tomado clases con maestros como Pablo Ferrández e Ilya Kaler.\n\nTocan con la misma exigencia en una sala de concierto que en una ceremonia privada: el programa se elige para el lugar y para quien escucha.",
  photo: {
    src: "/images/cuarteto-sala.jpg",
    alt: "Los cuatro integrantes del Cuarteto Fratres con sus instrumentos, en una sala de conciertos",
    width: 1448,
    height: 1086,
  },
};

/**
 * The four together, cut out of the square group photo, standing in front of
 * the section's title. Art direction, not CMS content: the overlap with the
 * title depends on where the heads sit in this file. `width`/`height` are the
 * file's own pixels.
 */
export const ABOUT_GROUP = {
  src: "/images/cuarteto-grupo.webp",
  alt: "Los cuatro integrantes del Cuarteto Fratres con sus instrumentos: dos violines, viola y violonchelo",
  width: 1195,
  height: 1174,
} as const;

/** Fixed copy of the about section's frame. */
export const ABOUT_COPY = {
  heading: "El cuarteto",
} as const;

/** What the quartet plays for, as the contact section lists it. */
export const OCCASIONS: readonly string[] = [
  "Conciertos y actividades culturales",
  "Bodas y ceremonias",
  "Eventos privados",
];
