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
  /** Fades the foot into a curve instead of a straight edge (where the photo cuts a wide instrument). */
  roundBottom?: boolean;
  /**
   * On the phone, how much closer the portrait comes, from the top: the cut-outs
   * are shot at different distances, and Alfonso's, the closest, sets the size
   * of the faces in the row of two.
   */
  phoneZoom?: number;
}

/**
 * The hand-drawn note that names the instrument on a musician's page: where
 * its text starts, in percent of the photo's frame (it may stand outside it),
 * and which way its line curves down to the instrument.
 */
export interface InstrumentNote {
  x: number;
  y: number;
  points: "left" | "right";
}

export interface MemberPhoto {
  /** Transparent cut-out from the green-screen shoot, 1024 × 1536 (2:3). */
  src: string;
  alt: string;
  /** The musician's own page: the whole cut-out in a 2:3 frame. */
  page: PhotoArt;
  /** The note pointing at the instrument on that page. */
  note: InstrumentNote;
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
    // The violin rests on his left shoulder, high on the frame's left.
    note: { x: -6, y: 6, points: "right" },
    portrait: { position: "18% 0%", fades: { left: 8, right: 12, bottom: 26 }, phoneZoom: 1.38 },
  },
  "lucia-paredes": {
    src: "/images/stage/lucia-paredes.webp",
    alt: "Lucía Montserrat Paredes con su violín",
    page: { position: "50% 0%", fades: { bottom: 22 } },
    // The violin held upright in front of her, low in the centre.
    note: { x: 70, y: 40, points: "left" },
    portrait: { position: "50% 0%", fades: { left: 12, right: 12, bottom: 26 }, phoneZoom: 1.5 },
  },
  "jose-sanchez": {
    src: "/images/stage/ricardo-sanchez.webp",
    alt: "José Ricardo Sánchez con su viola",
    page: { position: "50% 0%", fades: { bottom: 22 } },
    // The viola held upright in front of him, low in the centre.
    note: { x: 72, y: 38, points: "left" },
    portrait: { position: "50% 0%", fades: { left: 12, right: 12, bottom: 26 }, phoneZoom: 1.42 },
  },
  "alfonso-perez": {
    src: "/images/stage/alfonso-perez.webp",
    alt: "Alfonso Pérez con su violoncello",
    page: { position: "50% 0%", fades: { left: 14, right: 16, bottom: 30 }, roundBottom: true },
    // The cello's body fills the lower half, right of centre; his face is left.
    note: { x: -8, y: 50, points: "right" },
    portrait: { position: "46% 0%", fades: { left: 14, right: 24, bottom: 30 } },
  },
};
