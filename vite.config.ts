// vite.config.js
import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sampleChapters from "./src/assets/sample-chapters.pdf.asset.json";
import { readFileSync, readdirSync } from 'node:fs';

const bookCoverRedirects = new Map<string, string>(
  readdirSync(path.resolve(__dirname, 'public/books')).filter(name => name.endsWith('.asset.json')).map(name => {
    const asset = JSON.parse(readFileSync(path.resolve(__dirname, 'public/books', name), 'utf8'));
    return [`/books/${asset.original_filename}`, `https://author-web-canvas-craft.lovable.app${asset.url}`] as const;
  }),
);

export default defineConfig(({ mode }) => ({
  base: "/", // Root-hosted assets must also load on refreshed nested routes.
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    {
      name: "sample-chapters-redirect",
      configureServer(server: ViteDevServer) {
        server.middlewares.use((req, res, next) => {
          const coverUrl = bookCoverRedirects.get(req.url?.split('?')[0] ?? '');
          if (coverUrl) {
            res.writeHead(302, { Location: coverUrl });
            res.end();
            return;
          }
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
