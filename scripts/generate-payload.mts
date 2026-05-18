import "./load-env.mts";
import { generateImportMap } from "payload";
import { generateTypes } from "payload/node";
import configPromise from "@payload-config";

// Regenerates `payload-types.ts` and `app/(payload)/admin/importMap.js`
// (`npm run cms:generate`). Run through scripts/alias-loader.mjs so the
// tsconfig aliases resolve; Payload's own CLI cannot on Node 24.
async function main() {
  const config = await configPromise;
  await generateImportMap(config, { log: true });
  await generateTypes(config, { log: true });
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
