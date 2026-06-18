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
