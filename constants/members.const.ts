export type InstrumentCode = "violin" | "viola" | "cello";

export const INSTRUMENT_LABELS: Record<InstrumentCode, string> = {
  violin: "Violín",
  viola: "Viola",
  cello: "Violonchelo",
};

export interface MembersSectionDefaults {
  eyebrow: string;
  title: string;
}

export const MEMBERS_SECTION_DEFAULTS: MembersSectionDefaults = {
  eyebrow: "Integrantes",
  title: "Cuatro trayectorias, un mismo atril.",
};

export interface Member {
  /** Stable key for React lists and for the gallery state. */
  id: string;
  name: string;
  instrument: InstrumentCode;
  /** Given name and first surname, as read on the portrait strip. */
  shortName: string;
  /** City and state, shown under the name; may be missing. */
  origin?: string;
  bio: string;
  photo: {
    src: string;
    alt: string;
    /** `object-position` of the portrait: where the face sits in the frame. */
    position: string;
  };
}

// Order follows the seating of a string quartet: first violin, second violin,
// viola, cello. Seed of the `members` collection and fallback while it is empty.
export const MEMBERS: readonly Member[] = [
  {
    id: "jesus-medina",
    name: "Jesús Guadalupe Medina Corrales",
    instrument: "violin",
    shortName: "Jesús Medina",
    origin: "Culiacán, Sinaloa",
    bio: "Originario de Culiacán, Sinaloa. Inició el violín a los quince años con la maestra Marli Calderón, se formó en la Orquesta Escuela Carlos Chávez y fue concertino de esa agrupación. Desde 2024 es concertino de la Orquesta Filarmónica de Boca del Río y Veracruz. Su talento vocal lo llevó al Instituto Schiller para Niños Cantores en Mexicali y a compartir escenario con el tenor Luciano Pavarotti. Obtuvo el Primer Lugar en el Concurso para Jóvenes Solistas de la Orquesta de Baja California (2014) y el Concurso de Solistas de la Orquesta Escuela Carlos Chávez (2019).",
    photo: { src: "/images/jesus-medina.jpg", alt: "Jesús Guadalupe Medina Corrales", position: "50% 28%" },
  },
  {
    id: "lucia-paredes",
    name: "Lucía Montserrat Paredes García",
    instrument: "violin",
    shortName: "Lucía Paredes",
    origin: "Tlaxcala",
    bio: "Originaria de Tlaxcala. Comenzó a los nueve años en la Casa de Música de su ciudad y realizó sus estudios profesionales en el Instituto Superior de Música del Estado de Veracruz. Ha formado parte de la Camerata de Coahuila y de la Filarmónica de Boca del Río. Ha sido integrante de la Orquesta Sinfónica Juvenil del Estado de Veracruz, con giras nacionales y proyectos discográficos, y del ensamble de música antigua Corazón con Manos. Ha tomado clases magistrales con Ilya Kaler, Lisa Kim y Robert McDuffie, y se especializa en Musicoterapia.",
    photo: { src: "/images/lucia-paredes.jpg", alt: "Lucía Montserrat Paredes García", position: "50% 30%" },
  },
  {
    id: "ricardo-sanchez",
    name: "José Ricardo Sánchez Jiménez",
    instrument: "viola",
    shortName: "José Sánchez",
    origin: "Coatepec, Veracruz",
    bio: "Originario de Coatepec, Veracruz. Estudia en la Facultad de Música de la Universidad Veracruzana con Yurii Inti Bullón y es Principal de Violas de la Orquesta Sinfónica Juvenil del Estado de Veracruz. Su formación inició en 2014 en la Orquesta Esperanza Azteca. Ha participado en clases magistrales con Christopher Lowry, Elías Goldstein, Milán Milisavljevic y Honggang Li, y colabora con la Camerata Latinoamericana además de la Orquesta Sinfónica de Xalapa.",
    photo: { src: "/images/ricardo-sanchez.jpg", alt: "José Ricardo Sánchez Jiménez", position: "50% 34%" },
  },
  {
    id: "alfonso-perez",
    name: "Alfonso Pérez Valencia",
    instrument: "cello",
    shortName: "Alfonso Pérez",
    origin: "Xalapa, Veracruz",
    bio: "Originario de Xalapa, Veracruz. Comenzó sus estudios a los tres años y se formó en el CIMI y en la Universidad Veracruzana. Es violonchelista principal de la Filarmónica de Boca del Río y director artístico de Ensamble Carmesí. Ha sido finalista en dos ediciones del Concurso Nacional de Violonchelo del INBAL y ha participado en festivales de América, Europa y Asia, entre ellos Prisma Festival en Canadá y Esker Festival en Irlanda, con maestros como Thomas Mesa, Pablo Ferrández y Álvaro Bitrán.",
    photo: { src: "/images/alfonso-perez.jpg", alt: "Alfonso Pérez Valencia", position: "50% 30%" },
  },
];
