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
