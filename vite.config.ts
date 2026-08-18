import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },

      manifest: {
        name: "FitPro",
        short_name: "FitPro",
        description:
          "Plataforma para personal trainers e seus alunos.",

        theme_color: "#020617",
        background_color: "#020617",
        display: "standalone",

        start_url: "/",
        scope: "/",

        icons: [
          {
            src: "/fitpro-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/fitpro-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});