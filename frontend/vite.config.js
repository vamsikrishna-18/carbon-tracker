import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      // Automatically register the service worker
      injectRegister: "auto",

      includeAssets: [
        "favicon.svg",
        "apple-touch-icon.png",
        "pwa-192x192.png",
        "pwa-512x512.png",
        "maskable-icon-512x512.png",
      ],

      manifest: {
        id: "/",

        name: "Carbon Tracker",
        short_name: "Carbon Tracker",

        description:
          "Monitor your carbon footprint and build sustainable habits.",

        theme_color: "#22c55e",
        background_color: "#ffffff",

        display: "standalone",
        orientation: "portrait",

        start_url: "/",
        scope: "/",

        categories: [
          "environment",
          "lifestyle",
          "education",
        ],

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,webp}",
        ],

        // Do NOT let the PWA fallback handle backend API requests
        navigateFallbackDenylist: [
          /^\/api\//,
        ],

        runtimeCaching: [
          // =====================================================
          // GOOGLE TRANSLATE SCRIPT
          // IMPORTANT: ALWAYS USE NETWORK
          // =====================================================

          {
            urlPattern:
              /^https:\/\/translate\.google\.com\/.*/i,

            handler: "NetworkOnly",
          },

          {
            urlPattern:
              /^https:\/\/translate\.googleapis\.com\/.*/i,

            handler: "NetworkOnly",
          },

          {
            urlPattern:
              /^https:\/\/www\.google-analytics\.com\/.*/i,

            handler: "NetworkOnly",
          },

          // =====================================================
          // GOOGLE FONTS
          // These are safe to cache
          // =====================================================

          {
            urlPattern:
              /^https:\/\/fonts\.googleapis\.com\/.*/i,

            handler: "CacheFirst",

            options: {
              cacheName: "google-fonts-stylesheets",

              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },

              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          {
            urlPattern:
              /^https:\/\/fonts\.gstatic\.com\/.*/i,

            handler: "CacheFirst",

            options: {
              cacheName: "google-fonts-webfonts",

              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },

              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // =====================================================
          // BACKEND API
          // NEVER CACHE LOGIN / REGISTER / CHATBOT / ACTIVITIES
          // =====================================================

          {
            urlPattern:
              /^https:\/\/carbon-tracker-backend-bwec\.onrender\.com\/api\/.*/i,

            handler: "NetworkOnly",
          },

          {
            urlPattern:
              /^https:\/\/.*\/api\/.*/i,

            handler: "NetworkOnly",
          },
        ],
      },
    }),
  ],
});