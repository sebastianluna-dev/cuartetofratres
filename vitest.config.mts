import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Pure unit tests (no DOM). The "@" alias replicates the "paths" of
// tsconfig.json so the tests can import "@/lib/...".
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**"],
    coverage: {
      provider: "v8",
      include: ["lib/**/*.ts", "constants/**/*.ts", "hooks/**/*.ts", "services/**/*.ts"],
      exclude: ["**/*.test.*", "**/*.types.ts"],
    },
  },
});
