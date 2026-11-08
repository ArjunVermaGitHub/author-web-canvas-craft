// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sampleChapters from "./src/assets/sample-chapters.pdf.asset.json";

export default defineConfig(({ mode }) => ({
  base: "./", // ← ADD THIS
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    {
      name: "sample-chapters-redirect",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.split("?")[0] !== "/Raghav-Kartikeya-Sample-Chapters.pdf") return next();
          res.writeHead(302, { Location: `https://author-web-canvas-craft.lovable.app${sampleChapters.url}` });
          res.end();
        });
      },
    },
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
