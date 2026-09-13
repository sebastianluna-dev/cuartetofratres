# Pending improvements

Backlog of the project's technical debt and improvements. Every entry carries an **area**, a
**priority** (low · medium · high) and a guide on how to approach it.

> Last review: 2026-06-02. What is still open is at the top; what is already resolved is left
> noted with what was done, so it is not reopened.

---

## HIGH priority

### 1. Real audio in the repertoire player — [Content]

The player only simulates playback (`hooks/use-sample-player.hook.ts` advances a clock). The
`tracks` collection already has the `audio` upload, but the mapper does not read it yet. When the
studio recordings exist: map the file URL into `TrackContent`, drive an `<audio>` element from the
hook (play/pause/seek/previous/next/ended) and keep the "only one track at a time, never autoplay"
rules. The sample duration should then come from the file's metadata, not from the constant, and
`PLAYER_COPY.listNote` ("las grabaciones de estudio se subirán…") should go.

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

## LOW priority

### 6. Deep link to an event — [UX]

The detail window only opens from its card. A `/#evento-<id>` hash that opens it on load would let
the quartet share a date on social media; read `location.hash` in `EventCards` and set `openId`.

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
