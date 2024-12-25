import { apiEndpoint, repositoryName } from "./slicemachine.config.json";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // pageTransition: { name: "page", mode: "out-in" },
    // layoutTransition: { name: "page", mode: "out-in" },
  },

  runtimeConfig: {
    public: {
      SPECIAL_ADOPTIONS_GROUP: process.env.SPECIAL_ADOPTIONS_GROUP,
    },
  },

  // css: ["@/styles/imports.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/imports.scss" as *;',
        },
      },
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/prismic",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/leaflet",
    "@vueuse/nuxt",
    "nuxt-gtag",
  ],

  prismic: {
    endpoint: apiEndpoint || repositoryName,
    linkResolver: "@/prismic/linkResolver",
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  gtag: {
    id: process.env.GTAG_ID,
  },
});
