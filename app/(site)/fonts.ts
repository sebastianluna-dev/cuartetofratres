import localFont from "next/font/local";

// Fonts of the site. The files live in public/fonts; next/font reads them at
// build time and serves them hashed from /_next/static/media, so nothing
// requests /fonts/* by hand and there is no flash of unstyled text at load.

/** Headings and the player's numerals. Latin subsets of Google's Forum, self-hosted. */
export const forum = localFont({
  src: [
    { path: "../../public/fonts/forum-latin.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/forum-latin-ext.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-forum",
  display: "swap",
});

/**
 * Body text. Latin subsets of Google's Mulish, self-hosted like Forum. Variable
 * font, 200–1000; the site uses 300 for copy and 500/600 for labels.
 */
export const mulish = localFont({
  src: [
    { path: "../../public/fonts/mulish-latin.woff2", weight: "200 1000", style: "normal" },
    { path: "../../public/fonts/mulish-latin-ext.woff2", weight: "200 1000", style: "normal" },
  ],
  variable: "--font-mulish",
  display: "swap",
});

/**
 * Display face for the big uppercase titles (the name in the hero, section
 * titles, members' names). Not preloaded: it is only a handful of lines and
 * `swap` falls back to Forum, which has the same tone, until it arrives.
 */
export const fratresDisplay = localFont({
  src: [{ path: "../../public/fonts/fratres-display.woff2", weight: "400", style: "normal" }],
  variable: "--font-fratres",
  display: "swap",
  preload: false,
});

/**
 * Labels, names and buttons: the condensed uppercase voice of the page. Latin
 * subsets of Google's Barlow Condensed, self-hosted like the rest.
 */
export const barlowCondensed = localFont({
  src: [
    { path: "../../public/fonts/barlow-condensed-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/barlow-condensed-500-latin-ext.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/barlow-condensed-600-latin.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/barlow-condensed-600-latin-ext.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/barlow-condensed-400-italic-latin.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/barlow-condensed-400-italic-latin-ext.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/barlow-condensed-500-italic-latin.woff2", weight: "500", style: "italic" },
    { path: "../../public/fonts/barlow-condensed-500-italic-latin-ext.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-barlow-condensed",
  display: "swap",
});

/**
 * The italic accent: centred section titles and the word that answers a title
 * in capitals. Only the italic of Google's Instrument Serif is used.
 */
export const instrumentSerif = localFont({
  src: [
    { path: "../../public/fonts/instrument-serif-400-italic-latin.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/instrument-serif-400-italic-latin-ext.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});
