import localFont from "next/font/local";

// Fonts of the site. The files live in public/fonts; next/font reads them at
// build time and serves them hashed from /_next/static/media, so nothing
// requests /fonts/* by hand and there is no flash of unstyled text at load.
//
// Loading, for the first screen on a phone (Lighthouse's LCP is the hero's
// name): only Fratres (that name) and Mulish are preloaded; the rest arrive
// when the first screen's CSS asks for them. Each face comes in two subsets,
// and the latin-ext one is its own family with a `unicode-range`, set first
// in the tokens' stacks (globals.css): the browser skips it for every Spanish
// letter and downloads it only when a text holds a letter such as «ř» or «ő».

// next/font takes only literal options, so each extension family below spells
// out the same settings: never preloaded, no fallback of its own (the main
// family follows it in the stack) and Google's latin-ext range, the one the
// -latin-ext files were cut to.

/**
 * Body text. Latin subsets of Google's Mulish, self-hosted. Variable
 * font, 200–1000; the site uses 300 for copy and 500/600 for labels.
 */
export const mulish = localFont({
  src: [{ path: "../../public/fonts/mulish-latin.woff2", weight: "200 1000", style: "normal" }],
  variable: "--font-mulish",
  display: "swap",
});

export const mulishExt = localFont({
  src: [{ path: "../../public/fonts/mulish-latin-ext.woff2", weight: "200 1000", style: "normal" }],
  variable: "--font-mulish-ext",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: [],
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    },
  ],
});

/**
 * Display face for the big uppercase titles (the name in the hero, section
 * titles, members' names). Preloaded: the hero's name is the largest thing on
 * the first screen, so the page counts as loaded only once this face is in.
 */
export const fratresDisplay = localFont({
  src: [{ path: "../../public/fonts/fratres-display.woff2", weight: "400", style: "normal" }],
  variable: "--font-fratres",
  display: "swap",
});

/**
 * Labels, names and buttons: the condensed uppercase voice of the page. Latin
 * subsets of Google's Barlow Condensed, self-hosted like the rest.
 */
export const barlowCondensed = localFont({
  src: [
    { path: "../../public/fonts/barlow-condensed-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/barlow-condensed-600-latin.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/barlow-condensed-400-italic-latin.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/barlow-condensed-500-italic-latin.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-barlow-condensed",
  display: "swap",
  preload: false,
});

export const barlowCondensedExt = localFont({
  src: [
    { path: "../../public/fonts/barlow-condensed-500-latin-ext.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/barlow-condensed-600-latin-ext.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/barlow-condensed-400-italic-latin-ext.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/barlow-condensed-500-italic-latin-ext.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-barlow-condensed-ext",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: [],
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    },
  ],
});

/**
 * The section titles («Repertorio», «Cartelera», «Conoce al cuarteto»…): the
 * calligraphic face the owner picked in the review panel. Google's Italianno,
 * Latin subsets, self-hosted. A script with a small body, so the titles are
 * set larger than the face they replaced (see `.section-title`).
 */
export const italianno = localFont({
  src: [{ path: "../../public/fonts/italianno-400-latin.woff2", weight: "400", style: "normal" }],
  variable: "--font-italianno",
  display: "swap",
  preload: false,
});

export const italiannoExt = localFont({
  src: [{ path: "../../public/fonts/italianno-400-latin-ext.woff2", weight: "400", style: "normal" }],
  variable: "--font-italianno-ext",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: [],
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    },
  ],
});

/**
 * The italic accent: centred section titles and the word that answers a title
 * in capitals. Only the italic of Google's Instrument Serif is used.
 */
export const instrumentSerif = localFont({
  src: [{ path: "../../public/fonts/instrument-serif-400-italic-latin.woff2", weight: "400", style: "italic" }],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: false,
});

export const instrumentSerifExt = localFont({
  src: [{ path: "../../public/fonts/instrument-serif-400-italic-latin-ext.woff2", weight: "400", style: "italic" }],
  variable: "--font-instrument-serif-ext",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: [],
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    },
  ],
});

/** Every font variable, for the root element of the site and of the 404. */
export const FONT_VARIABLES = [
  mulish,
  mulishExt,
  fratresDisplay,
  barlowCondensed,
  barlowCondensedExt,
  italianno,
  italiannoExt,
  instrumentSerif,
  instrumentSerifExt,
]
  .map((font) => font.variable)
  .join(" ");
