# Cuarteto Fratres

Sitio público del **Cuarteto Fratres**, cuarteto de cuerdas con base en Boca del Río, Veracruz. Una sola página en Next.js: portada con las próximas fechas, presentación del cuarteto, semblanzas de los cuatro integrantes, repertorio con reproductor y formulario de contacto. Todo el contenido se edita en **Payload CMS** (`/admin`), que vive en la misma app, y las solicitudes del formulario se guardan ahí.

## Requisitos

- **Node 20.9+** (requisito de Next 16) para la app; **Node 22.18+** para los scripts `cms:*`, que dejan que Node quite los tipos de TypeScript sin transpilador.
- **Postgres** para Payload. En local sirve cualquiera; en producción, Prisma Postgres (integración de Vercel).
- Variables de entorno en `.env.local` (copia `.env.example` y rellena): `PAYLOAD_SECRET`, `DATABASE_URI`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_ENV` (sólo `production` activa Google Analytics), `NEXT_PUBLIC_GA_MEASUREMENT_ID` y, fuera de local, `BLOB_READ_WRITE_TOKEN`.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # y rellena los valores
npm run cms:migrate          # crea las tablas de Payload en DATABASE_URI
npm run cms:seed             # carga el contenido de constants/ y las fotos de public/images
npm run cms:user -- admin@ejemplo.com "Nombre" <contraseña>
npm run dev                  # sitio en http://localhost:3000, CMS en /admin
```

Con la base vacía el sitio también funciona: cada servicio cae al contenido de `constants/` (ver «Contenido»), así que el seed sólo hace falta para editar.

## Comandos disponibles

| Comando                                   | Descripción                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| `npm run dev`                             | Servidor de desarrollo.                                                   |
| `npm run build`                           | Build de producción.                                                      |
| `npm run start`                           | Sirve el build de producción.                                             |
| `npm run lint`                            | ESLint.                                                                   |
| `npm run typecheck`                       | `next typegen` + `tsc --noEmit`, lo mismo que corre CI.                   |
| `npm run test`                            | Vitest, una pasada.                                                       |
| `npm run test:watch`                      | Vitest en modo watch.                                                     |
| `npm run test:coverage`                   | Vitest con cobertura (v8) sobre `lib`, `constants`, `hooks` y `services`. |
| `npm run format` / `npm run format:check` | Prettier sobre el repo.                                                   |
| `npm run cms:migrate`                     | Corre las migraciones pendientes de Payload sobre `DATABASE_URI`.         |
| `npm run cms:migrate -- create <nombre>`  | Genera una migración en `migrations/` a partir de la config.              |
| `npm run cms:migrate -- status`           | Lista qué migraciones ya corrió la base.                                  |
| `npm run cms:generate`                    | Regenera `payload-types.ts` y el import map del admin.                    |
| `npm run cms:seed`                        | Carga el contenido inicial (idempotente en las colecciones).              |
| `npm run cms:user`                        | Crea un usuario admin del CMS desde la terminal.                          |

Los scripts `cms:*` corren con `node --import ./scripts/alias-loader.mjs`, un hook de resolución que entiende los alias de `tsconfig.json`: el CLI de Payload no los resuelve en Node 24.

`.github/workflows/ci.yml` corre `lint`, `typecheck`, `test` y `build` en cada push a `main` y en cada pull request. El build prerenderiza la portada desde Payload, así que CI levanta un Postgres vacío: las migraciones corren en el propio build y la página sale con el contenido por defecto.

## Mapa de rutas

Una sola URL, `/`, con anclas a cada sección: `#inicio`, `#cuarteto`, `#integrantes`, `#repertorio` y `#contacto`. Las anclas están en `constants/navigation.const.ts`, de donde las leen la cabecera, el menú móvil y el pie.

Cada tarjeta de la portada abre una ventana con el detalle de la presentación (`components/site/sections/home/hero/event-dialog.comp.tsx`): un `<dialog>` nativo, así que el foco, la tecla Escape y el fondo los da el navegador. Sin enlace de boletos, el botón lleva al formulario de contacto.

Además Next genera `/robots.txt`, `/sitemap.xml`, `/icon.svg` y `/opengraph-image`, y Payload sirve el panel en `/admin` y su API REST en `/api/*` (`app/(payload)`).

## Contenido

Todo lo que ve el visitante se edita en `/admin`. Las **Globals** guardan los textos de cada sección y las **colecciones**, lo que se repite:

| En el CMS                                       | Qué contiene                                                                                                                                                                                                                                                       |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Secciones › Portada (`hero`)                    | Título, texto, foto de fondo con su encuadre, el botón «Escuchar» y el rótulo de las fechas (sólo en el teléfono).                                                                                                                                                 |
| Secciones › El cuarteto (`about`)               | Rótulo, título, texto, foto del grupo y pie de foto.                                                                                                                                                                                                               |
| Secciones › Integrantes / Repertorio / Contacto | Los textos de cada sección (títulos, notas, estado vacío, mensaje tras enviar).                                                                                                                                                                                    |
| Sitio › Datos del sitio (`site-settings`)       | Lema, correo, WhatsApp, ciudad, redes y crédito de fotografía. Las redes salen en el pie y como iconos junto a la foto de «El cuarteto»; una sin URL se muestra sin enlace.                                                                                        |
| Contenido › Integrantes (`members`)             | Los cuatro músicos, con orden de atril, instrumento, nombre corto, procedencia, semblanza, retrato y encuadre.                                                                                                                                                     |
| Contenido › Presentaciones (`events`)           | Fechas con hora, ciudad y foto, más el detalle de la ventana (descripción, programa, lugar y boletos). La portada muestra las dos próximas **publicadas**; una sin la casilla «Publicada» se guarda sin salir en el sitio, y las pasadas se quedan como historial. |
| Contenido › Repertorio (`tracks`)               | Obras con compositor, categoría y duración del fragmento.                                                                                                                                                                                                          |
| Contenido › Categorías (`categories`)           | Las pestañas del repertorio, con nombre y etiqueta corta. Cinco como máximo (el filtro no cabe en el teléfono con más); «Todo» la pone el sitio. No se puede borrar una con obras.                                                                                 |
| Contenido › Imágenes (`media`)                  | Las fotos, con texto alternativo obligatorio. En local se guardan en `media/`; en Vercel, en Vercel Blob.                                                                                                                                                          |
| Solicitudes › Solicitudes de contacto           | Lo que llega del formulario (ver abajo).                                                                                                                                                                                                                           |

`constants/` sigue siendo el contenido de lanzamiento: lo escribe `npm run cms:seed` y es el respaldo campo por campo mientras una Global o una colección está vacía, así que una base nueva nunca deja la página en blanco. La excepción son las presentaciones: la portada sólo muestra las publicadas en el CMS y, si no hay ninguna, no muestra fechas (las de `events.const.ts` sólo sirven al seed). `navigation.const.ts` (anclas) y `contact.const.ts` (tipos de evento y longitudes) son estructura, no contenido, y sólo cambian en código.

Los componentes nunca leen Payload: cada sección pide sus datos a `services/<dominio>/*.service.ts`, que mapea el documento de Payload a un tipo propio (`*.mapper.ts`, `*.types.ts`). Todas las lecturas pasan por `services/shared/read-cms.ts`, que agrupa las seis Globals y las tres colecciones en dos consultas, deduplicadas por petición con `cache()` y guardadas entre peticiones con `unstable_cache`. Al guardar en `/admin`, los hooks de `lib/payload/revalidate-site.ts` expiran esas etiquetas y la portada, así que el cambio se ve en la siguiente visita.

Las fotos de lanzamiento están en `public/images` (JPEG a 82 de calidad; `next/image` sirve AVIF/WebP) y las fuentes en `public/fonts` (Forum, Mulish variable y Fratres Display, las dos primeras subconjuntos latinos de Google Fonts).

## Reproductor de repertorio

Todavía no hay grabaciones de estudio. El reproductor (`hooks/use-sample-player.hook.ts`) simula la reproducción: avanza un reloj sobre la duración de la obra, nunca arranca solo y sólo "suena" una pista a la vez. Cuando existan los archivos de audio, ese hook es el único sitio que hay que cambiar; la interfaz (tarjeta fija, barra de progreso en forma de pentagrama, lista con ecualizador) ya está hecha.

## Formulario de contacto

Es un formulario normal enviado a una server action (`services/contact/contact.actions.ts`), así que funciona antes de que hidrate la página. La validación (`contact.validation.ts`) devuelve todos los errores de una vez y limita longitudes también en el servidor.

Cada solicitud válida se guarda como documento de la colección `contact-requests`, con estado «Nueva». El equipo la lee en **/admin › Solicitudes de contacto**, la marca como «Respondida» o «Descartada» y deja notas internas; los datos del visitante son de sólo lectura. Nadie puede crear solicitudes por la API REST (`create: nobody`): la server action escribe con la API local de Payload, que no pasa por el control de acceso, y es la única puerta. Si la base falla, el visitante ve un error que le pide escribir directo al correo y el fallo queda en el log (`lib/logger.ts`).

## Arquitectura en breve

- **`app/(site)/`**: layout, página, `landing-page.tsx` (compone las secciones según `config/site.config.ts`), 404, error boundary y la imagen Open Graph. `robots.ts`, `sitemap.ts` y `global-not-found.tsx` quedan en `app/`: con dos layouts raíz, la 404 de rutas que no existen la sirve `global-not-found.tsx`.
- **`app/(payload)/`**: panel y API de Payload, generados por su plantilla; sólo `custom.css` es nuestro.
- **`payload.config.ts`** y **`payload/`**: la config del CMS, una colección o Global por archivo. Acceso en `lib/payload/access.ts` (dos roles, admin y editor; sólo admin gestiona usuarios y borra solicitudes); `lib/payload/limit-documents.ts` y `prevent-delete-in-use.ts` son los hooks que ponen en palabras los límites del diseño (máximo de categorías, categoría en uso).
- **`migrations/`**: el esquema de la base. Nunca se usa el _push_ de desarrollo (`push: false`): tras cambiar una colección, `npm run cms:migrate -- create <nombre>` y `npm run cms:migrate`.
- **`components/site/sections/`**: `shell/` (cabecera, menú móvil, pie, pantalla de aviso) y `home/` (una carpeta por sección: `hero`, `about`, `members`, `repertoire`, `contact`). Cada archivo `.section.tsx` o `.comp.tsx` importa su propio `.css`.
- **`components/site/shared/`**: piezas que usan varias secciones (logo, pentagrama ornamental, eyebrow, `Reveal`, analítica).
- **`hooks/`**: estado de la cabecera al hacer scroll, aparición de bloques al entrar en pantalla y transporte del reproductor.
- **`lib/`**: funciones puras con test al lado (`*.test.ts`).
- **`services/`**: una carpeta por dominio (`hero`, `about`, `members`, `events`, `repertoire`, `contact`, `site-settings`) con servicio, mapper y tipos; `shared/` tiene la lectura cacheada del CMS y el mapeo de imágenes. `contact/` además tiene la validación y la server action.
- **`scripts/`**: migraciones, seed, alta de usuario y generación de tipos, fuera de Next.

## Despliegue en Vercel

1. Conecta **Prisma Postgres** desde el marketplace de Vercel. La integración crea `<PREFIJO>_POSTGRES_URL`; `payload.config.ts` usa `DATABASE_URI` si existe y, si no, `CUARTETO_FRATRES_DATABASE_POSTGRES_URL`.
2. Crea un store de **Vercel Blob** y conéctalo al proyecto: define `BLOB_READ_WRITE_TOKEN` y las imágenes del CMS se suben ahí.
3. Define `PAYLOAD_SECRET` (una cadena aleatoria larga), `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_APP_ENV=production`.
4. Despliega. Las migraciones pendientes corren solas al arrancar Payload en producción (`prodMigrations`), también durante el build.
5. Crea el primer usuario desde tu máquina, apuntando a la base de producción: `DATABASE_URI="<url>" npm run cms:user -- <correo> "<Nombre>" <contraseña>`.
6. Para cargar el contenido inicial, corre `npm run cms:seed` con esa `DATABASE_URI` **y** el `BLOB_READ_WRITE_TOKEN` del store: sin el token, las fotos se escribirían en tu disco y en producción darían 404.

Las convenciones de código están en `AGENTS.md`; la deuda conocida, en `IMPROVEMENTS.md`; las tareas mecánicas, en `todos.md`.
