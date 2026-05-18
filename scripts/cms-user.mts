import "./load-env.mts";
import { getPayload } from "payload";
import configPromise from "@payload-config";

// Creates the first CMS user from the command line (`npm run cms:user -- <correo> "<Nombre>" <contraseña>`),
// for a fresh database before /admin has anyone to log in with. Payload's own
// "create first user" screen does the same thing; this is for deployments
// where nobody should type a password into a public URL.
async function main() {
  const [email, name, password] = process.argv.slice(2);
  if (!email || !name || !password) {
    console.error('Uso: npm run cms:user -- <correo> "<Nombre>" <contraseña>');
    process.exit(2);
  }
  const payload = await getPayload({ config: await configPromise });
  const existing = await payload.find({ collection: "users", where: { email: { equals: email } }, limit: 1 });
  if (existing.docs.length > 0) {
    console.log(`Ya existe un usuario con el correo ${email}.`);
    return;
  }
  await payload.create({ collection: "users", data: { email, name, password, role: "admin" } });
  console.log(`Usuario ${email} creado con rol admin.`);
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
