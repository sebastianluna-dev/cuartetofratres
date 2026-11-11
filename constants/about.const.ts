export interface AboutDefaults {
  title: string;
  lead: string;
  photo: { src: string; alt: string };
}

export const ABOUT_DEFAULTS: AboutDefaults = {
  title: "El sonido se construye escuchando",
  lead: "Cuarteto Fratres reúne a cuatro músicos con formación profesional y actividad orquestal en México. Trabajan el repertorio de cámara con la misma exigencia en una sala de concierto que en una ceremonia privada: el programa se elige para el lugar y para quien escucha.",
  photo: {
    src: "/images/cuarteto-estudio.jpg",
    alt: "Los cuatro integrantes del Cuarteto Fratres con sus instrumentos",
  },
};

/** Fixed copy of the about section's frame. */
export const ABOUT_COPY = {
  heading: "El cuarteto",
  label: "(04) · Quiénes somos",
} as const;

/** What the quartet plays for, as the contact section lists it. */
export const OCCASIONS: readonly string[] = [
  "Conciertos y actividades culturales",
  "Bodas y ceremonias",
  "Eventos privados",
];
