import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), {
    name: "accucare-design-selector-home",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split("?")[0] === "/") req.url = "/designs.html";
        next();
      });
    },
  }],
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const path = id.replaceAll("\\", "/");
          if (
            /node_modules\/(motion|framer-motion|motion-dom|motion-utils)\//.test(
              path,
            )
          )
            return "motion";
          if (
            /node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(
              path,
            )
          )
            return "react-vendor";
        },
      },
    },
  },
});
