// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { fileURLToPath } from "node:url";

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const routerShim = fileURLToPath(new URL("./src/legacy-compat/router.tsx", import.meta.url));

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    resolve: {
      alias: [
        // The recovered original frontend uses react-router v5; routing itself is
        // handled by TanStack file routes, so its API is shimmed.
        { find: /^react-router-dom$/, replacement: routerShim },
        { find: /^react-router$/, replacement: routerShim },
      ],
    },
    define: {
      // CRA-style env vars the original source reads at runtime.
      "process.env.REACT_APP_GRAPHQL_URL": JSON.stringify("/api/graphql"),
      "process.env.REACT_APP_ALLOW_PSD_SERVER_REQUESTS": JSON.stringify("true"),
      "process.env.REACT_APP_VERSION": JSON.stringify("1.0.0"),
      "process.env.REACT_APP_SENTRY_DSN": JSON.stringify(""),
    },
  },
});
