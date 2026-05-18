import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

// Loads .env.local / .env the same way Next does, for the scripts that run
// outside it. Imported FIRST in every script: ESM evaluates imports in order
// and payload.config.ts reads process.env as soon as it is evaluated.
loadEnvConfig(process.cwd());
