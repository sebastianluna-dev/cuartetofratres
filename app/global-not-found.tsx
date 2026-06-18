import type { Metadata } from "next";
import Link from "next/link";
import { SiteMessage } from "@/components/site/sections/shell/site-message/site-message.section";
import { SITE_NAME } from "@/constants/site.const";
import "./(site)/globals.css";
import { forum, fratresDisplay, mulish } from "./(site)/fonts";

// 404 for URLs that match NO route at all (`/whatever`). With two root
// layouts (site and CMS) Next cannot compose it from a `not-found.tsx` and
// serves it bypassing the layouts, so this file brings its own <html> and
// <body>, the global sheet and the site's fonts.
export const metadata: Metadata = {
  title: `Página no encontrada | ${SITE_NAME}`,
};

export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${forum.variable} ${mulish.variable} ${fratresDisplay.variable}`}>
      <body>
        <main id="contenido">
          <SiteMessage
            eyebrow="Error 404"
            title="Esta página no existe"
            description="Puede que el enlace sea antiguo o que la dirección esté mal escrita."
          >
            <Link href="/" className="site-message__action">
              Volver al inicio
            </Link>
            <Link href="/#contacto" className="site-message__action site-message__action_variant_secondary">
              Ir a contacto
            </Link>
          </SiteMessage>
        </main>
      </body>
    </html>
  );
}
