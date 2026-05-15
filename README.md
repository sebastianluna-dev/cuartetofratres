# Cuarteto Fratres

Sitio público del **Cuarteto Fratres**, cuarteto de cuerdas con base en Boca del Río, Veracruz. Una sola página en Next.js: portada con las próximas fechas, presentación del cuarteto, semblanzas de los cuatro integrantes, repertorio con reproductor y formulario de contacto.

## Requisitos

- **Node 20.9+** (requisito de Next 16).
- Variables de entorno en `.env.local` (copia `.env.example` y rellena): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_ENV` (sólo `production` activa Google Analytics), `NEXT_PUBLIC_GA_MEASUREMENT_ID` y `CONTACT_WEBHOOK_URL`.

No hay base de datos ni CMS: todo el contenido vive en `constants/` y se despliega con el código.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # y rellena los valores
npm run dev                  # http://localhost:3000
```

## Comandos disponibles

| Comando                                   | Descripción                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| `npm run dev`                             | Servidor de desarrollo.                                                   |
| `npm run build`                           | Build de producción.                                                      |
| `npm run start`                           | Sirve el build de producción.                                             |
| `npm run lint`                            | ESLint.                                                                   |
| `npm run typecheck`                       | `tsc --noEmit`, lo mismo que corre CI.                                    |
| `npm run test`                            | Vitest, una pasada.                                                       |
| `npm run test:watch`                      | Vitest en modo watch.                                                     |
| `npm run test:coverage`                   | Vitest con cobertura (v8) sobre `lib`, `constants`, `hooks` y `services`. |
| `npm run format` / `npm run format:check` | Prettier sobre el repo.                                                   |

`.github/workflows/ci.yml` corre `lint`, `typecheck`, `test` y `build` en cada push a `main` y en cada pull request. El sitio es estático, así que el build sí cabe en CI.

## Mapa de rutas

Una sola URL, `/`, con anclas a cada sección: `#inicio`, `#cuarteto`, `#integrantes`, `#repertorio` y `#contacto`. Las anclas están en `constants/navigation.const.ts`, de donde las leen la cabecera, el menú móvil y el pie.

Además Next genera `/robots.txt`, `/sitemap.xml`, `/icon.svg` y `/opengraph-image`.

## Contenido

Todo lo que ve el visitante está en `constants/`:

| Archivo               | Qué contiene                                                                                                                                                                      |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `site.const.ts`       | Nombre, lema, correo, ciudad y redes.                                                                                                                                             |
| `navigation.const.ts` | Anclas del menú.                                                                                                                                                                  |
| `events.const.ts`     | Próximas presentaciones (fecha ISO, hora, ciudad, foto). La portada sólo muestra las que aún no han pasado, decidido con la fecha del build y refrescado a diario (`revalidate`). |
| `members.const.ts`    | Los cuatro integrantes, en orden de atril: nombre, instrumento, resumen, semblanza y retrato.                                                                                     |
| `repertoire.const.ts` | Obras, compositores, categorías y filtros.                                                                                                                                        |
| `contact.const.ts`    | Tipos de evento del formulario y longitudes máximas.                                                                                                                              |

Las fotos están en `public/images` (JPEG a 82 de calidad; `next/image` sirve AVIF/WebP) y las fuentes en `public/fonts` (Forum, TT Hoves variable y Fratres Display).

## Reproductor de repertorio

Todavía no hay grabaciones de estudio. El reproductor (`hooks/use-sample-player.hook.ts`) simula la reproducción: avanza un reloj sobre la duración de la obra, nunca arranca solo y sólo "suena" una pista a la vez. Cuando existan los archivos de audio, ese hook es el único sitio que hay que cambiar; la interfaz (tarjeta fija, barra de progreso en forma de pentagrama, lista con ecualizador) ya está hecha.

## Formulario de contacto

Es un formulario normal enviado a una server action (`services/contact/contact.actions.ts`), así que funciona antes de que hidrate la página. La validación (`contact.validation.ts`) devuelve todos los errores de una vez y limita longitudes también en el servidor.

- Con `CONTACT_WEBHOOK_URL` definido, la solicitud se envía por POST como JSON a esa URL (un hook de Zapier/Make, un relay de correo).
- Sin él, sólo se registra en el servidor (una línea JSON por solicitud, `lib/logger.ts`), que es lo que hace el desarrollo local.

En ambos casos el visitante recibe la misma confirmación.

## Arquitectura en breve

- **`app/`**: layout, página, `landing-page.tsx` (compone las secciones según `config/site.config.ts`), 404, error boundaries, `robots.ts`, `sitemap.ts` y la imagen Open Graph.
- **`components/site/sections/`**: `shell/` (cabecera, menú móvil, pie, pantalla de aviso) y `home/` (una carpeta por sección: `hero`, `about`, `members`, `repertoire`, `contact`). Cada archivo `.section.tsx` o `.comp.tsx` importa su propio `.css`.
- **`components/site/shared/`**: piezas que usan varias secciones (logo, pentagrama ornamental, eyebrow, `Reveal`, analítica).
- **`hooks/`**: estado de la cabecera al hacer scroll, aparición de bloques al entrar en pantalla y transporte del reproductor.
- **`lib/`**: funciones puras con test al lado (`*.test.ts`).
- **`services/contact/`**: tipos, validación y server action del formulario.

Las convenciones de código están en `AGENTS.md`; la deuda conocida, en `IMPROVEMENTS.md`; las tareas mecánicas, en `todos.md`.
