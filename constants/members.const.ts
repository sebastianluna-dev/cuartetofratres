export type Instrument = "Violín" | "Viola" | "Violonchelo";

export interface Member {
  /** Stable key for React lists and for the accordion state. */
  id: string;
  name: string;
  instrument: Instrument;
  /** One-line summary shown in the compact (mobile) card. */
  short: string;
  bio: string;
  photo: {
    src: string;
    /** `object-position` of the portrait: where the face sits in the frame. */
    position: string;
  };
}

// Order follows the seating of a string quartet: first violin, second violin,
// viola, cello. The number shown next to each name comes from the index.
export const MEMBERS: readonly Member[] = [
  {
    id: "jesus-medina",
    name: "Jesús Guadalupe Medina Corrales",
    instrument: "Violín",
    short: "Culiacán, Sinaloa. Concertino de la Filarmónica de Boca del Río y Veracruz.",
    bio: "Originario de Culiacán, Sinaloa. Inició el violín a los quince años con la maestra Marli Calderón, se formó en la Orquesta Escuela Carlos Chávez y fue concertino de esa agrupación. Desde 2024 es concertino de la Orquesta Filarmónica de Boca del Río y Veracruz. Su talento vocal lo llevó al Instituto Schiller para Niños Cantores en Mexicali y a compartir escenario con el tenor Luciano Pavarotti. Obtuvo el Primer Lugar en el Concurso para Jóvenes Solistas de la Orquesta de Baja California (2014) y el Concurso de Solistas de la Orquesta Escuela Carlos Chávez (2019).",
    photo: { src: "/images/jesus-medina.jpg", position: "50% 28%" },
  },
  {
    id: "lucia-paredes",
    name: "Lucía Montserrat Paredes García",
    instrument: "Violín",
    short: "Tlaxcala. Camerata de Coahuila y Filarmónica de Boca del Río.",
    bio: "Originaria de Tlaxcala. Comenzó a los nueve años en la Casa de Música de su ciudad y realizó sus estudios profesionales en el Instituto Superior de Música del Estado de Veracruz. Ha formado parte de la Camerata de Coahuila y de la Filarmónica de Boca del Río. Ha sido integrante de la Orquesta Sinfónica Juvenil del Estado de Veracruz, con giras nacionales y proyectos discográficos, y del ensamble de música antigua Corazón con Manos. Ha tomado clases magistrales con Ilya Kaler, Lisa Kim y Robert McDuffie, y se especializa en Musicoterapia.",
    photo: { src: "/images/lucia-paredes.jpg", position: "50% 30%" },
  },
  {
    id: "ricardo-sanchez",
    name: "José Ricardo Sánchez Jiménez",
    instrument: "Viola",
    short: "Coatepec, Veracruz. Principal de violas de la Sinfónica Juvenil del Estado de Veracruz.",
    bio: "Originario de Coatepec, Veracruz. Estudia en la Facultad de Música de la Universidad Veracruzana con Yurii Inti Bullón y es Principal de Violas de la Orquesta Sinfónica Juvenil del Estado de Veracruz. Su formación inició en 2014 en la Orquesta Esperanza Azteca. Ha participado en clases magistrales con Christopher Lowry, Elías Goldstein, Milán Milisavljevic y Honggang Li, y colabora con la Camerata Latinoamericana además de la Orquesta Sinfónica de Xalapa.",
    photo: { src: "/images/ricardo-sanchez.jpg", position: "50% 34%" },
  },
  {
    id: "alfonso-perez",
    name: "Alfonso Pérez Valencia",
    instrument: "Violonchelo",
    short: "Xalapa, Veracruz. Violonchelista principal de la Filarmónica de Boca del Río.",
    bio: "Originario de Xalapa, Veracruz. Comenzó sus estudios a los tres años y se formó en el CIMI y en la Universidad Veracruzana. Es violonchelista principal de la Filarmónica de Boca del Río y director artístico de Ensamble Carmesí. Ha sido finalista en dos ediciones del Concurso Nacional de Violonchelo del INBAL y ha participado en festivales de América, Europa y Asia, entre ellos Prisma Festival en Canadá y Esker Festival en Irlanda, con maestros como Thomas Mesa, Pablo Ferrández y Álvaro Bitrán.",
    photo: { src: "/images/alfonso-perez.jpg", position: "50% 30%" },
  },
];
