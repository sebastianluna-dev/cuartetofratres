import { ImageResponse } from "next/og";
import { SITE_LOCATION } from "@/constants/site.const";

// Open Graph image, generated at build time. Drawn with code and not with a
// photo so it depends on no file in public/ and changes with the text.
// `ImageResponse` does not read woff2, so the generator's default serif is
// used; Latin text only.

export const alt = "Cuarteto Fratres, cuarteto de cuerdas en Boca del Río, Veracruz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#121418",
        color: "#f2f4f3",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 0, flexDirection: "column", width: 220 }}>
          {[0, 1, 2, 3].map((line) => (
            <div key={line} style={{ height: 2, marginBottom: 8, background: "#e6ec9e", opacity: 0.85 }} />
          ))}
        </div>
        <div style={{ fontSize: 22, letterSpacing: 8, textTransform: "uppercase", color: "#e6ec9e" }}>
          Cuarteto de cuerdas
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 118, lineHeight: 0.96, textTransform: "uppercase", color: "#e6ec9e" }}>
          Cuarteto Fratres
        </div>
        <div style={{ fontSize: 30, color: "rgba(242,244,243,.8)", maxWidth: 900 }}>
          Cuatro instrumentos que se escuchan entre sí.
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, letterSpacing: 4 }}>
        <div style={{ width: 70, height: 2, background: "#e6ec9e" }} />
        <div style={{ textTransform: "uppercase" }}>{SITE_LOCATION}</div>
      </div>
    </div>,
    size,
  );
}
