import type { Metadata } from "next";
import Link from "next/link";
import { SiteMessage } from "@/components/site/sections/shell/site-message/site-message.section";
import { SITE_NAME } from "@/constants/site.const";

export const metadata: Metadata = {
  title: `Página no encontrada | ${SITE_NAME}`,
};

// The site's 404, with its own palette. Without this file an old link fell
// into Next's default screen, in English and with nothing of the site around it.
export default function NotFound() {
  return (
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
  );
}
