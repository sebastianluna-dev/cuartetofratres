# Pending improvements

Backlog of the project's technical debt and improvements. Every entry carries an **area**, a
**priority** (low · medium · high) and a guide on how to approach it.

> Last review: 2026-06-02. What is still open is at the top; what is already resolved is left
> noted with what was done, so it is not reopened.

---

## HIGH priority

### 1. Recordings of the repertoire — [Content]

The player plays real files now (`hooks/use-sample-player.hook.ts`). The local database holds four
reference recordings by other ensembles, supplied for development: their rights and most of their
performers («Por confirmar») are unknown, so they must not be uploaded to production. Replace them
with the quartet's own recordings, or with recordings whose licence allows publishing them and
whose performers are credited in «Intérpretes». Piazzolla's and Elizondo's works are under
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
