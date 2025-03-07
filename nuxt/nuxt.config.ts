// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@oku-ui/primitives", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      githubBaseURL: "https://github.com/",
    },
  },
});
