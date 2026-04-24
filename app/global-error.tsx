"use client";

// Last resort: only used when the root layout itself fails, so it has to
// bring its own `<html>` and `<body>` and cannot rely on any stylesheet
// being loaded. That is why it uses inline styles.
export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#121418",
          color: "#f2f4f3",
          fontFamily: "Georgia, serif",
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <h1 style={{ fontSize: 32, fontWeight: 400, margin: "0 0 12px" }}>Algo salió mal</h1>
          <p style={{ margin: "0 0 24px", color: "rgba(242,244,243,.62)", lineHeight: 1.6 }}>
            {error.digest ? `Código del error: ${error.digest}` : "Inténtalo de nuevo en un momento."}
          </p>
          <button
            type="button"
            onClick={retry}
            style={{
              padding: "14px 26px",
              border: 0,
              background: "#e6ec9e",
              color: "#121418",
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
