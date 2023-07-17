// https://nuxt.com/docs/api/configuration/nuxt-config
import { pinia } from "./nuxt.modules";

export default defineNuxtConfig({
  srcDir: "src/",
  ssr: true,
  modules: [pinia, "@nuxt/content", "@nuxtjs/device"],

  imports: {
    dirs: ["stores"],
  },

  content: {
    watch: {
      ws: {
        hostname: "silientel",
      },
    },
  },

  css: ["~/assets/style/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  devtools: {
    enabled: true,
  },
});
