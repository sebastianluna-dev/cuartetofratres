# Pending improvements

Backlog of the project's technical debt and improvements. Every entry carries an **area**, a
**priority** (low · medium · high) and a guide on how to approach it.

> Last review: 2026-06-02. What is still open is at the top; what is already resolved is left
> noted with what was done, so it is not reopened.

---

## HIGH priority

### 1. Recordings of the repertoire — [Content]

**2026-11-13: the owner chose to publish these eight reference recordings in production for now**
(`npm run cms:sync` copies them). They play as the quartet's own; replace them with the quartet's
recordings as soon as there are any, and remove the two demo dates (5 and 20 December, the seeded
October dates moved forward for testing) once real ones exist.

The player plays real files now (`hooks/use-sample-player.hook.ts`). The local database holds eight
reference recordings by other ensembles, supplied for development (four works of the programme
plus two pop covers and two wedding covers: «Viva la Vida», «Skyfall», «Love Story», «Por una
cabeza»): their rights are unknown and some performers are «Por confirmar», so they must not be
uploaded to production. The pop covers are also songs under copyright. Replace them
with the quartet's own recordings. The player does not credit performers (the user's call, 2026-11-12),
so a recording by another ensemble would pass for the quartet's: do not publish one without their
permission. Piazzolla's and Elizondo's works are under
copyright as compositions too.

### 2. Notice of new contact requests — [Integration]

Requests are stored in `contact-requests`, but nobody is told one arrived: Payload has no email
adapter configured (it logs "Email will be written to console"). Add `@payloadcms/email-resend`
(or nodemailer over the quartet's Gmail) and an `afterChange` hook on create that mails the team
the request and a link to `/admin/collections/contact-requests/<id>`. A failure in that mail must
not fail the form: the request is already saved.

### 3. Rate limit on the contact action — [Security]

`sendContactRequest` accepts unlimited requests and every one is now a row in Postgres. Add a
honeypot field first (cheap, stops most bots) and then a window per IP; with a database already
there, a small `contact-attempts` table or a count of the last minutes' requests is enough.

## MEDIUM priority

### 4. Production content — [Content]

The Prisma Postgres database has its schema but no content, so production shows the defaults of
`constants/`. Once the Vercel Blob store exists, run `npm run cms:seed` against it with
`BLOB_READ_WRITE_TOKEN` set (README › Despliegue en Vercel) and create the team's users.

### 5. Draft and preview of the page — [CMS]

A save publishes at once. If the quartet starts editing long texts, enable `versions: { drafts:
true }` on the Globals and a preview route with `draftMode()`, so a change can be reviewed on the
real page before it goes live.

### 8. Redesign «punto medio»: what is left — [Design]

Every section now follows the approved redesign (`propuestas-rediseno/05-punto-medio.html`, with
the repertoire of `06-repertorio.html` R1 «Papel» and the contact of `07-contacto.html` C1
«Carta»). Left over:

- **Font review panel** (`sections/shell/font-preview`, `constants/title-fonts.const.ts`): a
  floating «Fuentes» panel, rendered only when `NEXT_PUBLIC_APP_ENV` is not `production`, that
  tries 25 faces on the section titles. Once a face is chosen, set it in `globals.css` (a token
  `--font-title` for `.section-title`, self-hosted in `public/fonts`) and delete the panel, its
  constants and its line in `landing-page.tsx`.
- **Hero Global**: `image`, `imagePosition` and `eventsHeading` are no longer drawn (the dates
  section is titled «Cartelera», fixed in `constants/events.const.ts`). Reuse them or drop the
  fields with a migration.
- **Fixed copy**: the hero's frame, the posters' labels, «Conoce al cuarteto», the letter's
  captions and the player's «Reproducción simulada» line live in `constants/`. Move them to the
  Globals (with a migration) if the quartet needs to edit them.
- **Three paper sections in a row** (repertoire, about, contact): the about section sits on the
  darker paper (`section_theme_paper`) to set it apart. Revisit if the page needs a dark band there.

## LOW priority

### 6. Deep link to an event — [UX]

The detail window only opens from its card. A `/#evento-<id>` hash that opens it on load would let
the quartet share a date on social media; read `location.hash` in `ShowPosters` and set `openId`.

### 7. Storybook for the shared pieces — [DX]

The reference project pilots Storybook on one component. Worth it here only if the design keeps
evolving; otherwise the sections are small enough to review in the page.

### 9. Hero music between the phone and the tablet — [Design]

The music on the hero's staff lines (`components/site/shared/staff-music.comp.tsx`, also on every musician's page) is
engraved on the server for two stages, the desktop one and the 390 × 844 phone, and stretched
with the lines like them (`preserveAspectRatio="none"`), so the notes always stay on their lines.
Where the stage's shape departs from those two (phone layouts 561–760 px wide, or a desktop window
narrower than its height), the glyphs stretch with it: wider on a tablet in portrait. If that
shows, add a third engraving for that band in `HERO_MUSIC_STAGES` and switch it in
`staff-music.comp.css`.

### 10. First load on a phone: what was tried — [Performance]

Measured on `next start` with Lighthouse's mobile throttling (1.6 Mbps, 150 ms, CPU ×4), median of 3–5 loads: LCP 2.61 s → 1.32 s on 2026-11-14 after preloading only Fratres and Mulish, moving latin-ext to on-demand families, the musicians' photos at quality 90 and the engraved staffs as static SVG files (the home HTML went from 463 KB to 139 KB). Tried and left out, so it is not retried blindly:

- `experimental.inlineCss`: FCP 0.79 → 0.56 s but LCP 1.32 → 2.05 s, because Next copies the CSS into both the HTML and the RSC payload (home 26 → 51 KB gzipped) and it applies to the Payload admin too (its HTML doubles).
- Splitting the client code: of the JavaScript the home loads, React and Next are ~115 KB gzipped and the site's own components ~20 KB; the 39 KB polyfill chunk is `noModule`, so modern browsers skip it. Lazy-loading the dialog or the player would save a few KB.

How to approach what is left: measure the production URL (CDN, compression) in a private window, so the browser's extensions do not count, before chasing more.

---

## Resolved

### ~~Contact form delivery~~ — RESOLVED (2026-05-28)

The form no longer depends on a webhook: every request is a `contact-requests` document that the
team triages in `/admin` (status and internal notes). `CONTACT_WEBHOOK_URL` is gone. The notice by
email is a separate item (#2).

### ~~Events calendar and editable content~~ — RESOLVED (2026-05-27)

Payload CMS runs inside the app: dates are the `events` collection, the musicians and the works
are collections and every section's texts are Globals. `constants/` stays as seed and fallback.

### ~~Social links~~ — RESOLVED (2026-05-27)

The networks are fields of the `site-settings` Global: a URL renders a link, an empty one the plain
label. `SOCIAL_NETWORKS` was removed.

### ~~Horizontal overflow on phones~~ — RESOLVED (2026-05-14)

The repertoire head was a wrapping column flex container, so its single line took the filters'
full row width and pushed the page to 531 px on a 390 px screen. `flex-wrap: nowrap` on the head
and `min-width: 0` on the filters fixed it; `AGENTS.md` now asks for real mobile emulation when
checking layout.

### ~~Hero cards overflowing under 480 px~~ — RESOLVED (2026-05-14)

The two event cards kept their 188 px desktop width. They are now a two-column grid with
`minmax(0, 1fr)` and the card takes 100 % of its cell.

## Shared `SocialIcon` left without a caller

**Area**: `components/site/shared/social-icon.comp.tsx` · **Priority**: low

The glyphs were only drawn by the about section's social column, which was
removed; the footer lists the networks as text. Either draw them in the
footer's "Redes" column or delete the component.

## `repertoire_section.title` default drifted from the config

**Area**: `migrations/` · **Priority**: low

The generator folded an unrelated `SET DEFAULT 'Repertorio'` into
`20260916_054325_contact_event_fields_removed`: the column default predated a
change to the global's `defaultValue`. The schema is now in line with the
config, but the migration does two things at once. Worth a look if another
default ever drifts.

## `about.photo` and `about.title` no longer shown

**Area:** CMS · **Priority:** low

Since the «Retablo» redesign (2026-11-12) the «El cuarteto» section shows a
fixed cut-out of the group (`ABOUT_GROUP` in `constants/about.const.ts`,
`public/images/cuarteto-grupo.webp`), placed by hand in front of the title, so
the photo uploaded to `/admin › Secciones › El cuarteto` is read but not drawn,
and since 2026-11-13 neither is its title (the big «El cuarteto» is the only title).
Either drop the field (migration, plus the seed and `about.mapper`) or let the
editors upload a transparent cut-out there and read it again. The cut-out was
redone with ChatGPT on 2026-11-13 (clean edges, no light rim).

## `site-settings.photoCredit` and `tagline` no longer shown

**Area:** CMS · **Priority:** low

Since 2026-11-13 the footer signs the site instead («Diseño y desarrollo: Sebastian Luna», `SITE_CREDIT`
in `constants/site.const.ts`), so the photo credit stored in `/admin › Ajustes del sitio` is read but
not drawn; nor, since the same day, is the tagline the footer used to show between the name and the
signature. Drop the fields (migration, seed and mapper) or bring them back somewhere else.

## Hero texts in the CMS no longer shown

**Area:** CMS · **Priority:** low

Since 2026-11-12 the hero shows only the label and the name over the stage:
the `lead` and `listenLabel` of `/admin › Secciones › Portada` (and the
`image` the stage replaced earlier) are read by `hero.mapper` but not drawn.
Drop them with a migration (and from the seed and the mapper), or bring them
back if the hero gets its text again.

## `members.photo` and `members.photo_position` no longer read

**Area:** CMS · **Priority:** low

Since 2026-11-13 the musicians' photos come from `constants/member-photos.const.ts` and the two
portrait fields of `payload/collections/Members.ts` are hidden in the admin. They stay in the
schema (and the seed still fills `photo`, which is required) only to avoid a migration while the
redesign is unpublished. Drop them with `npm run cms:migrate -- create members_photo_dropped`,
remove them from the seed, and delete the four `public/images/<slug>.webp` portraits the seed
uploads.
