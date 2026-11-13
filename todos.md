# Delegable TODOs

Small, mechanical tasks that need no design decision. Bigger items live in `IMPROVEMENTS.md`.

- [x] Run `npm run format` once and commit the result on its own (2026-05-15).
- [ ] In `/admin › Secciones › Repertorio`, set the title to «Repertorio»: the seeded phrase («Del clásico al pop…») predates the card layout, whose default is now the one word.
- [ ] In `/admin › Integrantes`, check the cellist's bio and role: the seed text used «violonchelo/violonchelista», now spelt «violoncello/violoncellista» in `constants/members.const.ts`; the stored copy keeps whatever was seeded.
- [ ] Add `og:image` alt text review: `app/opengraph-image.tsx` uses the generator's default serif; check how it renders on Facebook and WhatsApp previews.
- [ ] Replace `CURRENT_YEAR` in `footer.section.tsx` with the build year if the site is still up in 2027.
- [ ] Give `Media` image sizes (`upload.imageSizes`) so the admin list does not load the full photos as thumbnails.
- [ ] Add `admin.preview` links from the Globals to `/#<ancla>` of their section.
- [ ] Set `upload.focalPoint` on `Media` and derive `object-position` from it, instead of the free-text framing fields.
- [ ] Add a `humans.txt` or a credits line for the photographer once the name is confirmed (the footer says "archivo del cuarteto").
- [x] Convert the design's PNG exports (2 MB each) to JPEG before committing them (2026-04-20).
- [x] Strip the C2PA metadata from the logo SVG and inline it as a component (2026-04-21).
- [ ] In `/admin › Integrantes` (production), replace the four portraits with the cut-outs in `public/images/<slug>.webp`: the stored photos are the earlier opaque ones and the redesigned section fades a transparent portrait into the stage.
- [ ] Confirm with the quartet which cut-out is whose: `ricardo-sanchez` and `jesus-medina` were told apart by the instrument only (the one held upright as the viola).
- [ ] Publish at least one future date in `/admin › Presentaciones`: both seeded dates are past, and with no upcoming date the «Cartelera» section is left out of the page.
- [ ] In `/admin › Ajustes del sitio` (production), set WhatsApp to `522288265906` (Lucía Paredes' number, given by the owner on 2026-11-13); the site shows it as `+52 228 826 5906`.
- [ ] In `/admin › Integrantes` (production), split each biography into paragraphs with a blank line, as the seed in `constants/members.const.ts` now does (same words, breaks only before «Desde 2024…», «Obtuvo…», «Ha formado parte…», «Ha tomado clases…», «Su formación inició…», «Es violoncellista principal…», «Ha sido finalista…»).
- [ ] In `/admin › El cuarteto` (production), replace the «Texto de presentación» with the two paragraphs in `ABOUT_DEFAULTS.lead` (`constants/about.const.ts`), blank lines included: the section now shows a longer description beside the group.
