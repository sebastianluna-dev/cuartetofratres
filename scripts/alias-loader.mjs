// Node module-resolution hook for the scripts in this folder: resolves the
// tsconfig aliases (`@/...` and `@payload-config`) to files under the project
// root and adds the extension that TypeScript sources omit. Node 24 strips the
// types itself, so no transpiler is needed; the Payload CLI's bundled tsx does
// not resolve these aliases on this Node version.
//
// Usage: node --import ./scripts/alias-loader.mjs scripts/<script>.mts
import { register } from "node:module";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const EXTENSIONS = [".ts", ".tsx", ".mts", ".js", ".mjs"];

register(
  "data:text/javascript," +
    encodeURIComponent(`
      import { existsSync, statSync } from "node:fs";
      import { pathToFileURL } from "node:url";
      const ROOT = ${JSON.stringify(ROOT)};
      const EXTENSIONS = ${JSON.stringify(EXTENSIONS)};
      function withExtension(base) {
        if (existsSync(base) && statSync(base).isFile()) return base;
        for (const ext of EXTENSIONS) if (existsSync(base + ext)) return base + ext;
        for (const ext of EXTENSIONS) if (existsSync(base + "/index" + ext)) return base + "/index" + ext;
        return null;
      }
      export async function resolve(specifier, context, next) {
        let target = null;
        if (specifier === "@payload-config") target = ROOT + "/payload.config.ts";
        else if (specifier.startsWith("@/")) target = withExtension(ROOT + "/" + specifier.slice(2));
        else if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL?.startsWith("file://") && !context.parentURL.includes("/node_modules/")) {
          const base = new URL(specifier, context.parentURL).pathname;
          target = withExtension(base);
        }
        if (target) return { url: pathToFileURL(target).href, shortCircuit: true };
        try {
          return await next(specifier, context);
        } catch (error) {
          // Packages without an exports map (next/cache, next/navigation…) need the
          // extension under Node's ESM rules; the bundler never did.
          if (error?.code === "ERR_MODULE_NOT_FOUND" && !specifier.endsWith(".js")) return next(specifier + ".js", context);
          throw error;
        }
      }
    `),
  pathToFileURL("./"),
);
