# Pending improvements

Backlog of the project's technical debt and improvements. Every entry carries an **area**, a
**priority** (low · medium · high) and a guide on how to approach it.

> Last review: 2026-05-15. What is still open is at the top; what is already resolved is left
> noted with what was done, so it is not reopened.

---

## HIGH priority

### 1. Real audio in the repertoire player — [Content]

The player only simulates playback (`hooks/use-sample-player.hook.ts` advances a clock). When the
studio recordings exist: add an `audioSrc` to each `Track`, drive an `<audio>` element from the
hook (play/pause/seek/ended) and keep the "only one track at a time, never autoplay" rules. The
sample duration should then come from the file's metadata, not from the constant.

### 2. Contact form delivery — [Integration]

`CONTACT_WEBHOOK_URL` is the only delivery path and it is not set in production yet. Decide the
destination (a mail relay such as Resend, or a Make/Zapier hook that writes to a sheet) and add a
retry or a fallback so a request is never lost silently. Until then the requests only exist in the
server logs.

## MEDIUM priority

### 3. Rate limit on the contact action — [Security]

`sendContactRequest` accepts unlimited requests. Without a database, a per-instance in-memory
window is better than nothing; a shared store is only worth it once there is a delivery service to
protect.

### 4. Events calendar — [Content]

Dates are hand-edited in `constants/events.const.ts`. Fine for two concerts a season; if the
quartet plays more often, consider a small headless CMS or a Google Calendar feed read at build time.

### 5. Social links — [Content]

The footer lists Instagram, Facebook and YouTube as plain text because the accounts are not public
yet. When they are, turn `SOCIAL_NETWORKS` into `{ label, href }` and render links.

### 6. Members accordion on hover — [UX]

The rows expand on hover (`:hover` on `.member-row`) as well as on click, as in the design. On a
trackpad this can open rows while scrolling past them. Consider limiting hover expansion to
`(hover: hover) and (pointer: fine)`.

## LOW priority
