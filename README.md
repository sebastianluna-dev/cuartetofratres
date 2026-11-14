# Cuarteto Fratres

Public site of **Cuarteto Fratres**, a string quartet based in Boca del Río, Veracruz. A single page in Next.js: a hero with the four players on a stage, the next dates as posters, their profiles, a repertoire with a player, an introduction to the quartet and a contact form. Every piece of content is edited in **Payload CMS** (`/admin`), which lives in the same app, and the form's requests are stored there.

## Requirements

- **Node 20.9+** (Next 16's requirement) for the app; **Node 22.18+** for the `cms:*` scripts, which let Node strip the TypeScript types with no transpiler.
- **Postgres** for Payload. Any one will do locally; in production, Prisma Postgres (the Vercel integration).
- Environment variables in `.env.local` (copy `.env.example` and fill it in): `PAYLOAD_SECRET`, `DATABASE_URI`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_ENV` (only `production` turns Google Analytics on), `NEXT_PUBLIC_GA_MEASUREMENT_ID` and, outside local, `BLOB_READ_WRITE_TOKEN`.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run cms:migrate          # creates Payload's tables in DATABASE_URI
npm run cms:seed             # loads the content of constants/ and the photos in public/images
npm run cms:user -- admin@ejemplo.com "Name" <password>
npm run dev                  # site at http://localhost:3000, CMS at /admin
```

The site also works against an empty database: every service falls back to the content in `constants/` (see "Content"), so the seed is only needed in order to edit.

## Available commands

| Command                                   | What it does                                                               |
| ----------------------------------------- | -------------------------------------------------------------------------- |
| `npm run dev`                             | Development server.                                                        |
| `npm run build`                           | Production build.                                                          |
| `npm run start`                           | Serves the production build.                                               |
| `npm run lint`                            | ESLint.                                                                    |
| `npm run typecheck`                       | `next typegen` + `tsc --noEmit`, the same CI runs.                         |
| `npm run test`                            | Vitest, one pass.                                                          |
| `npm run test:watch`                      | Vitest in watch mode.                                                      |
| `npm run test:coverage`                   | Vitest with coverage (v8) over `lib`, `constants`, `hooks` and `services`. |
| `npm run format` / `npm run format:check` | Prettier over the repo.                                                    |
| `npm run cms:migrate`                     | Runs Payload's pending migrations against `DATABASE_URI`.                  |
| `npm run cms:migrate -- create <name>`    | Generates a migration in `migrations/` from the config.                    |
| `npm run cms:migrate -- status`           | Lists which migrations the database has already run.                       |
| `npm run cms:generate`                    | Regenerates `payload-types.ts` and the admin's import map.                 |
| `npm run cms:seed`                        | Loads the initial content (idempotent across the collections).             |
| `npm run cms:user`                        | Creates a CMS admin user from the terminal.                                |
| `npm run cms:export`                      | Exports the local CMS (content and files) to `cms-export/`.                |
| `npm run cms:sync -- --dry-run`           | Lists what `cms:sync` would change in the database of `.env.prod-sync`.    |
| `npm run cms:sync`                        | Writes `cms-export/` into that database (production), after a backup.      |

The `cms:*` scripts run with `node --import ./scripts/alias-loader.mjs`, a resolution hook that understands the aliases in `tsconfig.json`: Payload's CLI does not resolve them under Node 24.

`.github/workflows/ci.yml` runs `lint`, `typecheck`, `test` and `build` on every push to `main` and on every pull request. The build prerenders the home page from Payload, so CI brings up an empty Postgres: the migrations run inside the build itself and the page comes out with the default content.

## Route map

The home page, `/`, has an anchor per section, in page order: `#inicio`, `#repertorio`, `#cuarteto`, `#integrantes`, `#cartelera` and `#contacto`. The anchors live in `constants/navigation.const.ts`. The home page has no top bar and no menu: the hero carries only the label and the name with the four musicians (`heroLayout` in `config/site.config.ts`: `centered`, the name on one line over them, or `split`, the name in two lines on the left and the four on the right from 1100px up), and the rest of the page is reached by scrolling (the invitation poster of the dates and the contact section itself lead to the form). The footer does not repeat the navigation.

Every poster of a date opens a window with its detail (`components/site/sections/home/shows/event-dialog.comp.tsx`): a native `<dialog>`, so the focus, the Escape key and the backdrop come from the browser. It reads as a printed concert programme: a cream sheet with a calendar leaf, the photo under it and the works with a dotted leader to their composer; on the phone it is a sheet that rises from the bottom with the button held at its foot. With no tickets link, the button leads to the contact form. The row of posters always ends with the invitation poster, which leads to the contact form. With no upcoming date published, the whole «Cartelera» section is left out of the page.

Each musician has a page of their own, `/integrantes/<slug>` (`app/(site)/integrantes/[slug]/page.tsx`): the portrait (the musician's cut-out, whole at its 2:3), the instrument, the name and the biography, then the rest of the quartet. The portraits of the home page's «Conoce al cuarteto» row link to these pages; the biography is no longer shown on the home page. The slug comes from the short name («José Sánchez» → `jose-sanchez`), so renaming a musician in the CMS changes the address of their page. The pages are prerendered at build time; one added later in the CMS is rendered on its first visit, and a save in `/admin` expires them like the home page. These pages have a bar of their own (`sections/member/header`): only the monogram, which leads to the home page, and an arrow on the right back to the members' row; no section menu.

Next also generates `/robots.txt`, `/sitemap.xml` (the home page and the musicians' pages), `/icon.svg` and `/opengraph-image`, and Payload serves its panel at `/admin` and its REST API at `/api/*` (`app/(payload)`).

## Content

Everything the visitor sees is edited in `/admin`. The **Globals** hold each section's copy and the **collections** hold what repeats:

| In the CMS                                | What it holds                                                                                                                                                                                                                                                                                   |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Secciones › Portada (`hero`)              | Title, text and the «Escuchar» button. The photo, its framing and the caption of the dates are stored but no longer drawn (see below).                                                                                                                                                          |
| Secciones › El cuarteto (`about`)         | Title, text and the group's photo.                                                                                                                                                                                                                                                              |
| Secciones › Repertorio / Contacto         | Each section's copy (titles, notes, empty state, the message shown after sending).                                                                                                                                                                                                              |
| Sitio › Datos del sitio (`site-settings`) | Tagline, email, WhatsApp, city, networks and the photography credit. The email, WhatsApp and networks show up beside the contact letter, under the section's text; a network with no URL is shown without a link.                                                                               |
| Contenido › Integrantes (`members`)       | The four musicians, with desk order, instrument, short name, profile, portrait and framing. The portrait must be a cut-out on a transparent ground (WebP or PNG, 2:3, the head at the same height in all four): the section fades it into the stage.                                            |
| Contenido › Presentaciones (`events`)     | Dates with time, city and photo, plus the window's detail (description, programme, venue, prices and tickets link). The dates section shows the next two **published** ones as posters; one without the «Publicada» box is stored without reaching the site, and past ones stay on as a record. |
| Contenido › Repertorio (`tracks`)         | Works with composer, category, recording (from `Grabaciones`) and the excerpt's length.                                                                                                                                                                                                         |
| Contenido › Categorías (`categories`)     | The repertoire's tabs, with a name and a short label. Five at most (the filter does not fit on a phone with more); «Todo» is added by the site. One with works in it cannot be deleted.                                                                                                         |
| Contenido › Imágenes (`media`)            | The photos, with mandatory alternative text. Stored in `media/` locally; in Vercel Blob on Vercel.                                                                                                                                                                                              |
| Solicitudes › Solicitudes de contacto     | What arrives from the form (see below).                                                                                                                                                                                                                                                         |

`constants/` is still the launch content: `npm run cms:seed` writes it, and it is the field-by-field fallback while a Global or a collection is empty, so a fresh database never leaves the page blank. The dates are the exception: the hero only shows the ones published in the CMS and, when there are none, it shows no dates at all (the ones in `events.const.ts` only serve the seed). `navigation.const.ts` (anchors) and `contact.const.ts` (field lengths) are structure, not content, and only change in code.

The components never read Payload: each section asks `services/<domain>/*.service.ts` for its data, which maps the Payload document to a type of its own (`*.mapper.ts`, `*.types.ts`). Every read goes through `services/shared/read-cms.ts`, which gathers the six Globals and the three collections into two queries, deduplicated per request with `cache()` and kept between requests with `unstable_cache`. On save in `/admin`, the hooks in `lib/payload/revalidate-site.ts` expire those tags and the home page, so the change shows on the next visit.

The launch photos are in `public/images` (JPEG at quality 82, the group's photo in the hall at 92; the four portraits are transparent WebP cut-outs; `next/image` serves AVIF/WebP) and the fonts in `public/fonts` (Fratres Display for the titles in capitals, Italianno for the section titles, Instrument Serif italic for the accent, Barlow Condensed for labels and Mulish for copy; all but the first are Latin subsets from Google Fonts, under the SIL Open Font License). Only Fratres (the hero's name, the largest thing on the first screen) and Mulish are preloaded; each Google face also has a latin-ext file declared as its own family with a `unicode-range` (`app/(site)/fonts.ts`), downloaded only when a text holds a letter such as «ř».

The hero's stage is art direction, not content: the four full cut-outs in `public/images/stage` are placed by hand in `constants/hero-stage.const.ts`, so that the heads read the same size although the photos were framed differently. A new photo of a musician means a new cut-out there and new numbers in that file. Behind them, the staff lines carry a few bars of real music engraved on the server (`constants/hero-music.const.ts`: Borodin's String Quartet No. 2 and Pachelbel's Canon, after the LilyPond incipits on English Wikipedia; `lib/engrave-staff-music.ts` lays every note on its line or space of the curves in `lib/staff-lines.ts`). The music is static on purpose: every fragment shows at once and only sways with the lines. Its glyphs are outlines from the Bravura font, under the SIL Open Font License 1.1 (`lib/music-glyphs.OFL.txt`); a new face moved on the stage may need its fragments moved too, in `HERO_MUSIC_FRAGMENTS`. The lines of the hero's frame (the label over the name, the link to the members) are fixed copy in `constants/hero.const.ts`, like the labels of the posters in `constants/events.const.ts`.

## Repertoire player

The programme shows six works per page (`REPERTOIRE_PAGE_SIZE` in `constants/repertoire.const.ts`); with more, a pager sits at the foot of the column, level with the bottom of the player's card. Six rows, the filters and the pager fit beside the card, so neither a filter nor a page changes the section's height on the desktop. Changing filter goes back to the first page, and the rows of each new page grow into place. The player (`hooks/use-sample-player.hook.ts`) plays the recording uploaded to each work in `/admin › Grabaciones` through one `<audio>` element, so only one work sounds at a time; a work with no recording is simulated by a clock over its length, and only then does the «Reproducción simulada» line show. It never starts on its own; previous and next wrap around the list; the length shown is the file's own once it has loaded. The player does not say who plays: it presents every recording as the quartet's, so only the quartet's own recordings (or others' with their permission) may be published. The «Intérpretes» field of a recording is an internal record for the editors and is not shown. The interface: the work as a record on the paper, with no card (a square group photo, `RECORD_PHOTO` in `constants/repertoire.const.ts` (art direction, not the CMS), cut into a disc that turns while the work plays and stops on pause), its category, title and composer, a thin progress line and the transport in words («Anterior · Reproducir · Siguiente»); the filters as chips, the programme numbered as in a Spotify list (the number turns into play, or pause on the sounding work, under the pointer, and into an equaliser while the work sounds) with a thumbnail per work, and a mini player in the bottom-right corner that appears while a work plays and the card has scrolled away (`hooks/use-in-view.hook.ts`). The mini player is the same record, small: it is the play/pause button, and its grooves are the progress (the played part is a pale ring that widens from the edge towards the label, `lib/mini-player-card.ts`). A paper card with the status, the work, the clocks, the progress line and «Anterior · Siguiente» slides out to the left of the record while the pointer is over the player or the keyboard focus is inside it, hides 380 ms after both have left, and stays open while the work is paused; on a touch screen the first tap on the record opens the card, the following ones play or pause, a tap elsewhere closes it and, while the work plays, it closes on its own after six seconds untouched (`hooks/use-mini-player-card.hook.ts`). While the mini player is there, it publishes the room it takes at the bottom of the screen and the footer pads itself by that much, so the site credit is never under the record. On the phone the record sits above the programme, the whole width and not sticky, with play and pause on its label, no category or words under it and the title on one line that slides when it does not fit, resting two seconds at its start before each trip (`marquee-title.comp.tsx`, `hooks/use-marquee.hook.ts`; still under reduced motion), and the list keeps the room of a full page so a short filter does not move what follows; the mini player behaves as on the desktop (`hooks/use-mini-player-presence.hook.ts`). The player's fixed labels («Sonando ahora» in the mini player, «Mostrar la obra» on its record before the first tap, the `aria-label`s of the controls) live in `PLAYER_COPY` in `constants/repertoire.const.ts`, not in the CMS.

## Contact form

Three fields —name, email or WhatsApp, and details— posted to a server action (`services/contact/contact.actions.ts`), so it works before the page hydrates. The validation (`contact.validation.ts`) returns every error at once and caps the lengths on the server too.

Every valid request is stored as a document of the `contact-requests` collection, with the «Nueva» status. The team reads it in **/admin › Solicitudes de contacto**, marks it «Respondida» or «Descartada» and leaves internal notes; the visitor's data is read-only. Nobody can create requests through the REST API (`create: nobody`): the server action writes with Payload's local API, which does not go through access control, and is the only door in. If the database fails, the visitor sees an error asking them to write straight to the email address and the failure is left in the log (`lib/logger.ts`).

## The architecture in short

- **`app/(site)/`**: layout, page, `landing-page.tsx` (composes the sections according to `config/site.config.ts`), 404, error boundary and the Open Graph image. `robots.ts`, `sitemap.ts` and `global-not-found.tsx` stay in `app/`: with two root layouts, the 404 for routes that do not exist is served by `global-not-found.tsx`.
- **`app/(payload)/`**: Payload's panel and API, generated from its template; only `custom.css` is ours.
- **`payload.config.ts`** and **`payload/`**: the CMS config, one collection or Global per file. Access in `lib/payload/access.ts` (two roles, admin and editor; only an admin manages users and deletes requests); `lib/payload/limit-documents.ts` and `prevent-delete-in-use.ts` are the hooks that put the design's limits into words (the cap on categories, a category in use).
- **`migrations/`**: the database schema. Development _push_ is never used (`push: false`): after changing a collection, `npm run cms:migrate -- create <name>` and `npm run cms:migrate`.
- **`components/site/sections/`**: `shell/` (footer, notice screen), `member/` (the two sections of a musician's page: `profile` and `others`) and `home/` (one folder per section: `hero`, `shows`, `members`, `repertoire`, `about`, `contact`). Every `.section.tsx` or `.comp.tsx` file imports its own `.css`.
- **`components/site/shared/`**: the pieces several sections use (logo, the linked portrait of a musician, ornamental staff, the staff lines of the stages, the one-line title that fills its column and the section header built on it, the music engraved on a stage's staff lines, `Reveal`, analytics).
- **`hooks/`**: blocks appearing as they enter the screen, and the player's transport.
- **`lib/`**: pure functions with a test beside them (`*.test.ts`).
- **`services/`**: one folder per domain (`hero`, `about`, `members`, `events`, `repertoire`, `contact`, `site-settings`) with a service, a mapper and types; `shared/` holds the cached read of the CMS and the image mapping. `contact/` also holds the validation and the server action.
- **`scripts/`**: migrations, seed, user creation and type generation, outside Next.

## Copying the local content to production

The design reads its content from the CMS, so a deploy alone keeps production's old texts and photos. To make production's CMS match the local one:

1. Deploy the code first (its build runs the pending migrations on the production database).
2. `npm run cms:export` writes the local CMS to `cms-export/` (ignored by git): `content.json` and a copy of every image and recording it uses. It only reads `localhost`.
3. `npx vercel env pull .env.prod-sync --environment=production` brings production's variables into a file Next does not load on its own, so neither `next dev` nor `next start` can reach production by mistake.
4. `npm run cms:sync -- --dry-run` lists every change; `npm run cms:sync` saves a backup of production to `cms-export/backup-<time>.json` and applies them. Rows are matched by a stable key (file name, label, title, desk order), never by id; uploads missing in production go to Vercel Blob. A second run reports nothing to change.
5. Delete `.env.prod-sync`.

`cms:sync` reads only `.env.prod-sync` and refuses `localhost` and a missing Blob token (unless the file sets `CMS_SYNC_REHEARSAL=1`, for rehearsing against a throwaway local database).

## Deploying on Vercel

1. Connect **Prisma Postgres** from Vercel's marketplace. The integration creates `<PREFIX>_POSTGRES_URL`; `payload.config.ts` uses `DATABASE_URI` when it exists and, failing that, `CUARTETO_FRATRES_DATABASE_POSTGRES_URL`.
2. Create a **Vercel Blob** store and connect it to the project: define `BLOB_READ_WRITE_TOKEN` and the CMS images are uploaded there.
3. Define `PAYLOAD_SECRET` (a long random string), `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_APP_ENV=production`.
4. Deploy. Pending migrations run on their own as Payload starts in production (`prodMigrations`), during the build as well.
5. Create the first user from your machine, pointing at the production database: `DATABASE_URI="<url>" npm run cms:user -- <email> "<Name>" <password>`.
6. To load the initial content, run `npm run cms:seed` with that `DATABASE_URI` **and** the store's `BLOB_READ_WRITE_TOKEN`: without the token the photos would be written to your disk and would 404 in production.

The code conventions are in `AGENTS.md`; the known debt, in `IMPROVEMENTS.md`; the mechanical tasks, in `todos.md`.

The musicians' photos are code, not CMS content: `constants/member-photos.const.ts` holds one transparent cut-out per musician (keyed by the slug of their page) with its framing for each place it appears — the hero's stage, the musician's page and the rows of portraits — and the fades of the edges that photo cuts. In `/admin › Integrantes` only the biography can be edited: name, instrument, order and short name are read-only (the short name gives the page's address), musicians cannot be added or removed, and the portrait fields are hidden.
