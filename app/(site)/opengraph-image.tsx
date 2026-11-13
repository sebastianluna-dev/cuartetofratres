import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LOGO_MARK_PATHS, LOGO_MARK_VIEW_BOX } from "@/components/site/shared/logo-mark.const";
import { HERO_COPY } from "@/constants/hero.const";
import { HERO_STAGE_FIGURES } from "@/constants/hero-stage.const";
import { SITE_LOCATION } from "@/constants/site.const";

// Open Graph image, generated at build time: the hero's split layout reduced
// to 1200×630 — the monogram, the label and the name in two lines on the
// left, the four musicians standing on the right where the site's stage puts
// them. `ImageResponse` has no CSS filter, no mask-composite and reads no
// woff2, so public/og/ holds what it needs ready-made: the fonts as OTF/TTF
// and the cut-outs as PNG with the site's colour (saturate 0.83) and edge
// fades already applied. A new stage photo means new PNGs there.

export const alt = `Cuarteto Fratres, cuarteto de cuerdas en ${SITE_LOCATION}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0a0b0e";
const IVORY = "#f3f2f2";
/** Height of the stage in px; its width keeps the site's 1.22 ratio. */
const STAGE_HEIGHT = 560;
const STAGE_WIDTH = Math.round(STAGE_HEIGHT * 1.22);

const OG_DIR = join(process.cwd(), "public/og");
const readOg = (name: string) => readFile(join(OG_DIR, name));

export default async function OpenGraphImage() {
  const [display, label, ...figures] = await Promise.all([
    readOg("fratres-display.otf"),
    readOg("barlow-condensed-600.ttf"),
    ...HERO_STAGE_FIGURES.map((figure) => readOg(`stage-${figure.id}.png`)),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: INK,
        backgroundImage: `radial-gradient(ellipse 46% 70% at 70% 62%, #1f2328 0%, ${INK} 100%)`,
        color: IVORY,
      }}
    >
      {/* The stage, standing on the bottom edge on the right. */}
      <div
        style={{
          position: "absolute",
          right: 6,
          bottom: 0,
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          display: "flex",
        }}
      >
        {HERO_STAGE_FIGURES.map((figure, index) => {
          const height = (STAGE_HEIGHT * figure.height) / 100;
          const width = (height * 2) / 3;
          return (
            // ImageResponse draws plain <img> only; next/image does not apply here.
            <img
              key={figure.id}
              src={`data:image/png;base64,${figures[index].toString("base64")}`}
              alt=""
              width={width}
              height={height}
              style={{
                position: "absolute",
                left: (STAGE_WIDTH * figure.x) / 100 - width / 2,
                top: (STAGE_HEIGHT * figure.top) / 100,
                zIndex: figure.layer,
              }}
            />
          );
        })}
      </div>

      {/* The floor the figures sink into. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 130,
          display: "flex",
          backgroundImage: `linear-gradient(0deg, ${INK} 8%, rgba(10, 11, 14, 0))`,
        }}
      />

      <svg viewBox={LOGO_MARK_VIEW_BOX} width={46} height={51} style={{ position: "absolute", left: 64, top: 52 }}>
        {LOGO_MARK_PATHS.map((d) => (
          <path key={d} d={d} fill={IVORY} />
        ))}
      </svg>

      <div
        style={{
          position: "absolute",
          left: 64,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: 30,
        }}
      >
        <div
          style={{
            fontFamily: "Barlow Condensed",
            fontWeight: 600,
            fontSize: 17,
            letterSpacing: 3.4,
            textTransform: "uppercase",
            color: "rgba(243, 242, 242, 0.84)",
          }}
        >
          {`${HERO_COPY.kicker} · ${SITE_LOCATION}`}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 14,
            fontFamily: "Fratres Display",
            fontSize: 126,
            lineHeight: 0.86,
            letterSpacing: 0.75,
            textTransform: "uppercase",
          }}
        >
          <span>Cuarteto</span>
          <span>Fratres</span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Fratres Display", data: display, weight: 400, style: "normal" },
        { name: "Barlow Condensed", data: label, weight: 600, style: "normal" },
      ],
    },
  );
}
