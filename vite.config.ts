import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// `BUILD_TARGET=ssr` produces the server bundle that scripts/prerender.mjs runs.
// See "How the pages are prerendered" in README-NETLIFY.md.
const isSsrBuild = process.env.BUILD_TARGET === "ssr";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: isSsrBuild
    ? {
        ssr: "src/entry-server.tsx",
        outDir: path.resolve(import.meta.dirname, "dist/server"),
        emptyOutDir: true,
      }
    : {
        outDir: path.resolve(import.meta.dirname, "dist/public"),
        emptyOutDir: true,
      },
});
