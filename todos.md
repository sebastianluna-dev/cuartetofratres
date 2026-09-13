# Delegable TODOs

Small, mechanical tasks that need no design decision. Bigger items live in `IMPROVEMENTS.md`.

- [x] Run `npm run format` once and commit the result on its own (2026-05-15).
- [ ] In `/admin › Secciones › Repertorio`, set the title to «Repertorio»: the seeded phrase («Del clásico al pop…») predates the card layout, whose default is now the one word.
- [ ] Add `og:image` alt text review: `app/opengraph-image.tsx` uses the generator's default serif; check how it renders on Facebook and WhatsApp previews.
- [ ] Replace `CURRENT_YEAR` in `footer.section.tsx` with the build year if the site is still up in 2027.
- [ ] Give `Media` image sizes (`upload.imageSizes`) so the admin list does not load the full photos as thumbnails.
- [ ] Add `admin.preview` links from the Globals to `/#<ancla>` of their section.
- [ ] Set `upload.focalPoint` on `Media` and derive `object-position` from it, instead of the free-text framing fields.
- [ ] Add a `humans.txt` or a credits line for the photographer once the name is confirmed (the footer says "archivo del cuarteto").
- [x] Convert the design's PNG exports (2 MB each) to JPEG before committing them (2026-04-20).
- [x] Strip the C2PA metadata from the logo SVG and inline it as a component (2026-04-21).
