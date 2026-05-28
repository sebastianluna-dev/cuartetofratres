import "./load-env.mts";
import { getPayload } from "payload";
import configPromise from "@payload-config";

// Payload's migrations, without its CLI (it cannot resolve the tsconfig aliases
// on Node 24; see scripts/alias-loader.mjs):
//
//   npm run cms:migrate -- create <nombre>   writes migrations/<fecha>_<nombre>.ts from the config
//   npm run cms:migrate -- status            lists which ones the database already ran
//   npm run cms:migrate                      runs the pending ones against DATABASE_URI
//
// Production does not need the last one: payload.config.ts passes the
// migrations as `prodMigrations` and Payload runs the pending ones on start.
async function main() {
  const [command = "up", name] = process.argv.slice(2);
  process.env.PAYLOAD_MIGRATING = "true";
  const payload = await getPayload({ config: await configPromise, disableOnInit: true });

  switch (command) {
    case "create":
      if (!name) throw new Error("Uso: npm run cms:migrate -- create <nombre>");
      await payload.db.createMigration({ migrationName: name, payload, forceAcceptWarning: true });
      break;
    case "status":
      await payload.db.migrateStatus();
      break;
    case "up":
      await payload.db.migrate();
      break;
    default:
      throw new Error(`Comando desconocido: ${command} (create | status | up)`);
  }
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
