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

The `cms:*` scripts run with `node --import ./scripts/alias-loader.mjs`, a resolution hook that understands the aliases in `tsconfig.json`: Payload's CLI does not resolve them under Node 24.

`.github/workflows/ci.yml` runs `lint`, `typecheck`, `test` and `build` on every push to `main` and on every pull request. The build prerenders the home page from Payload, so CI brings up an empty Postgres: the migrations run inside the build itself and the page comes out with the default content.

## Route map

A single URL, `/`, with an anchor per section, in page order: `#inicio`, `#presentaciones`, `#integrantes`, `#repertorio`, `#cuarteto` and `#contacto`. The anchors live in `constants/navigation.const.ts`, where the top bar and the floating nav read them. The top bar lies over the hero and scrolls away with it; from there on, a pill fixed to the bottom of the screen (`sections/shell/floating-nav`) carries the sections and marks the one being read, so the footer does not repeat the navigation.

Every poster of a date opens a window with its detail (`components/site/sections/home/shows/event-dialog.comp.tsx`): a native `<dialog>`, so the focus, the Escape key and the backdrop come from the browser. With no tickets link, the button leads to the contact form. The row of posters always ends with the invitation poster, which leads to the contact form; with no date published, a poster says so, and the section stays in place.

Next also generates `/robots.txt`, `/sitemap.xml`, `/icon.svg` and `/opengraph-image`, and Payload serves its panel at `/admin` and its REST API at `/api/*` (`app/(payload)`).

## Content

Everything the visitor sees is edited in `/admin`. The **Globals** hold each section's copy and the **collections** hold what repeats:

| In the CMS                                | What it holds                                                                                                                                                                                                                                                                                   |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Secciones › Portada (`hero`)              | Title, text, the «Escuchar» button and the title of the dates section. The photo and its framing are stored but the hero no longer draws them (see below).                                                                                                                                      |
| Secciones › El cuarteto (`about`)         | Title, text and the group's photo.                                                                                                                                                                                                                                                              |
| Secciones › Repertorio / Contacto         | Each section's copy (titles, notes, empty state, the message shown after sending).                                                                                                                                                                                                              |
| Sitio › Datos del sitio (`site-settings`) | Tagline, email, WhatsApp, city, networks and the photography credit. The networks show up at the foot of the contact letter; one with no URL is shown without a link.                                                                                                                           |
| Contenido › Integrantes (`members`)       | The four musicians, with desk order, instrument, short name, profile, portrait and framing. The portrait must be a cut-out on a transparent ground (WebP or PNG, 2:3, the head at the same height in all four): the section fades it into the stage.                                            |
| Contenido › Presentaciones (`events`)     | Dates with time, city and photo, plus the window's detail (description, programme, venue, prices and tickets link). The dates section shows the next two **published** ones as posters; one without the «Publicada» box is stored without reaching the site, and past ones stay on as a record. |
| Contenido › Repertorio (`tracks`)         | Works with composer, category and the excerpt's length.                                                                                                                                                                                                                                         |
| Contenido › Categorías (`categories`)     | The repertoire's tabs, with a name and a short label. Five at most (the filter does not fit on a phone with more); «Todo» is added by the site. One with works in it cannot be deleted.                                                                                                         |
| Contenido › Imágenes (`media`)            | The photos, with mandatory alternative text. Stored in `media/` locally; in Vercel Blob on Vercel.                                                                                                                                                                                              |
| Solicitudes › Solicitudes de contacto     | What arrives from the form (see below).                                                                                                                                                                                                                                                         |

`constants/` is still the launch content: `npm run cms:seed` writes it, and it is the field-by-field fallback while a Global or a collection is empty, so a fresh database never leaves the page blank. The dates are the exception: the hero only shows the ones published in the CMS and, when there are none, it shows no dates at all (the ones in `events.const.ts` only serve the seed). `navigation.const.ts` (anchors) and `contact.const.ts` (field lengths) are structure, not content, and only change in code.

The components never read Payload: each section asks `services/<domain>/*.service.ts` for its data, which maps the Payload document to a type of its own (`*.mapper.ts`, `*.types.ts`). Every read goes through `services/shared/read-cms.ts`, which gathers the six Globals and the three collections into two queries, deduplicated per request with `cache()` and kept between requests with `unstable_cache`. On save in `/admin`, the hooks in `lib/payload/revalidate-site.ts` expire those tags and the home page, so the change shows on the next visit.

The launch photos are in `public/images` (JPEG at quality 82, the group's photo at 92; the four portraits are transparent WebP cut-outs; `next/image` serves AVIF/WebP) and the fonts in `public/fonts` (Fratres Display for the titles in capitals, Instrument Serif italic for the accent, Barlow Condensed for labels and Mulish for copy; all but the first are Latin subsets from Google Fonts).

The hero's stage is art direction, not content: the four full cut-outs in `public/images/stage` are placed by hand in `constants/hero-stage.const.ts`, so that the heads read the same size although the photos were framed differently. A new photo of a musician means a new cut-out there and new numbers in that file. The lines of the hero's frame (the label over the name, the link to the members, the seal) are fixed copy in `constants/hero.const.ts`, like the labels of the posters in `constants/events.const.ts`.

## Repertoire player

There are no studio recordings yet. The player (`hooks/use-sample-player.hook.ts`) simulates playback: it advances a clock over the work's length, never starts on its own and only ever "plays" one track at a time; previous and next wrap around the list. When the audio files exist, that hook is the only place that has to change; the interface is already built: the work's dark card (with the group's photo from «El cuarteto» as its cover under a treble clef, and the title on a marquee when it does not fit, `hooks/use-marquee.hook.ts`), the progress bar drawn as a staff whose notes light up as the music passes them, the filters as pills, the programme with a thumbnail per work and an equaliser, and a mini player pinned to the bottom of the screen (while it is there, the footer pads itself by its height so nothing ends up covered) that appears while a work plays and the card has scrolled away (`hooks/use-in-view.hook.ts`); on the phone there is no card and the bar is the whole player, with the staff swapped for a progress line along its bottom edge (the same slider, only another drawing): it appears when a work is chosen and stays while that work is in progress, even paused; it slides back down as soon as the card is in view again and, when what happens is a pause, it waits five seconds before leaving (`hooks/use-mini-player-presence.hook.ts`). The player's fixed labels («Sonando ahora» in the mini player, the `aria-label`s of the controls) live in `PLAYER_COPY` in `constants/repertoire.const.ts`, not in the CMS.

## Contact form

Three fields —name, email or WhatsApp, and details— posted to a server action (`services/contact/contact.actions.ts`), so it works before the page hydrates. The validation (`contact.validation.ts`) returns every error at once and caps the lengths on the server too.

Every valid request is stored as a document of the `contact-requests` collection, with the «Nueva» status. The team reads it in **/admin › Solicitudes de contacto**, marks it «Respondida» or «Descartada» and leaves internal notes; the visitor's data is read-only. Nobody can create requests through the REST API (`create: nobody`): the server action writes with Payload's local API, which does not go through access control, and is the only door in. If the database fails, the visitor sees an error asking them to write straight to the email address and the failure is left in the log (`lib/logger.ts`).

## The architecture in short

- **`app/(site)/`**: layout, page, `landing-page.tsx` (composes the sections according to `config/site.config.ts`), 404, error boundary and the Open Graph image. `robots.ts`, `sitemap.ts` and `global-not-found.tsx` stay in `app/`: with two root layouts, the 404 for routes that do not exist is served by `global-not-found.tsx`.
- **`app/(payload)/`**: Payload's panel and API, generated from its template; only `custom.css` is ours.
- **`payload.config.ts`** and **`payload/`**: the CMS config, one collection or Global per file. Access in `lib/payload/access.ts` (two roles, admin and editor; only an admin manages users and deletes requests); `lib/payload/limit-documents.ts` and `prevent-delete-in-use.ts` are the hooks that put the design's limits into words (the cap on categories, a category in use).
- **`migrations/`**: the database schema. Development _push_ is never used (`push: false`): after changing a collection, `npm run cms:migrate -- create <name>` and `npm run cms:migrate`.
- **`components/site/sections/`**: `shell/` (top bar, floating nav, footer, notice screen) and `home/` (one folder per section: `hero`, `shows`, `members`, `repertoire`, `about`, `contact`). Every `.section.tsx` or `.comp.tsx` file imports its own `.css`.
- **`components/site/shared/`**: the pieces several sections use (logo, ornamental staff, the staff lines of the stages, the one-line title that fills its column and the section header built on it, `Reveal`, analytics).
- **`hooks/`**: which section is being read (for the floating nav), blocks appearing as they enter the screen, and the player's transport.
- **`lib/`**: pure functions with a test beside them (`*.test.ts`).
- **`services/`**: one folder per domain (`hero`, `about`, `members`, `events`, `repertoire`, `contact`, `site-settings`) with a service, a mapper and types; `shared/` holds the cached read of the CMS and the image mapping. `contact/` also holds the validation and the server action.
- **`scripts/`**: migrations, seed, user creation and type generation, outside Next.

## Deploying on Vercel

1. Connect **Prisma Postgres** from Vercel's marketplace. The integration creates `<PREFIX>_POSTGRES_URL`; `payload.config.ts` uses `DATABASE_URI` when it exists and, failing that, `CUARTETO_FRATRES_DATABASE_POSTGRES_URL`.
2. Create a **Vercel Blob** store and connect it to the project: define `BLOB_READ_WRITE_TOKEN` and the CMS images are uploaded there.
3. Define `PAYLOAD_SECRET` (a long random string), `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_APP_ENV=production`.
4. Deploy. Pending migrations run on their own as Payload starts in production (`prodMigrations`), during the build as well.
5. Create the first user from your machine, pointing at the production database: `DATABASE_URI="<url>" npm run cms:user -- <email> "<Name>" <password>`.
6. To load the initial content, run `npm run cms:seed` with that `DATABASE_URI` **and** the store's `BLOB_READ_WRITE_TOKEN`: without the token the photos would be written to your disk and would 404 in production.

The code conventions are in `AGENTS.md`; the known debt, in `IMPROVEMENTS.md`; the mechanical tasks, in `todos.md`.
