"use client";

import Link from "next/link";
import { SiteMessage } from "@/components/site/sections/shell/site-message/site-message.section";

// Error boundary of the site. A Client Component, so it only renders the
// notice, with the site palette and the `digest` that instrumentation.ts logs.
export default function SiteErrorBoundary({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main id="contenido">
      <SiteMessage
        eyebrow="Algo salió mal"
        title="No pudimos cargar esta página"
        description={
          error.digest
            ? `Inténtalo de nuevo en un momento. Código del error: ${error.digest}`
            : "Inténtalo de nuevo en un momento."
        }
      >
        <button type="button" onClick={retry} className="site-message__action">
          Reintentar
        </button>
        <Link href="/" className="site-message__action site-message__action_variant_secondary">
          Volver al inicio
        </Link>
      </SiteMessage>
    </main>
  );
}
