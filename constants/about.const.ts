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
