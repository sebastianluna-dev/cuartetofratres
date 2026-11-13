/** Share of the photo, in percent, that fades out on an edge the photo itself cuts. */
export interface PhotoFades {
  left?: number;
  right?: number;
  bottom?: number;
}

/** How one cut-out sits in one frame: its `object-position` and its fades. */
export interface PhotoArt {
  position: string;
  fades: PhotoFades;
}

export interface MemberPhoto {
  /** Transparent cut-out from the green-screen shoot, 1024 × 1536 (2:3). */
  src: string;
  alt: string;
  /** The musician's own page: the whole cut-out in a 2:3 frame. */
  page: PhotoArt;
  /** The home page's row of four and the «others» row: a 3:5 frame, cropped. */
  portrait: PhotoArt;
}

// The musicians' photos are art direction, not CMS content: the same cut-out
// stands on the hero's stage, on each musician's page and in the rows of
// portraits, and every frame is set by hand for that photo. The fades only
// touch the edges the photo itself cuts (measured on the files): Alfonso's
// cello runs off the left, right and bottom edges, so his fades are the widest;
// Jesús's violin scroll just reaches the left edge. A new photo means new
// numbers here. Keyed by the slug of the musician's page.
export const MEMBER_PHOTOS: Readonly<Record<string, MemberPhoto>> = {
  "jesus-medina": {
    src: "/images/stage/jesus-medina.webp",
    alt: "Jesús Guadalupe Medina con su violín al hombro",
    page: { position: "50% 0%", fades: { left: 5, bottom: 22 } },
    portrait: { position: "18% 0%", fades: { left: 8, right: 12, bottom: 26 } },
  },
  "lucia-paredes": {
    src: "/images/stage/lucia-paredes.webp",
    alt: "Lucía Montserrat Paredes con su violín",
    page: { position: "50% 0%", fades: { bottom: 22 } },
    portrait: { position: "50% 0%", fades: { left: 12, right: 12, bottom: 26 } },
  },
  "jose-sanchez": {
    src: "/images/stage/ricardo-sanchez.webp",
    alt: "José Ricardo Sánchez con su viola",
    page: { position: "50% 0%", fades: { bottom: 22 } },
    portrait: { position: "50% 0%", fades: { left: 12, right: 12, bottom: 26 } },
  },
  "alfonso-perez": {
    src: "/images/stage/alfonso-perez.webp",
    alt: "Alfonso Pérez con su violoncello",
    page: { position: "50% 0%", fades: { left: 14, right: 16, bottom: 30 } },
    portrait: { position: "46% 0%", fades: { left: 14, right: 24, bottom: 30 } },
  },
};
