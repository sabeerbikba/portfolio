// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "motion-v/nuxt",
    "@nuxt/icon",
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/`
        : "https://sabeerbikba.vercel.app/",
      repoOwner: process.env.VERCEL_GIT_REPO_OWNER || "sabeerbikba",
      githubBaseURL: "https://github.com/",
    },
  },
  vue: {
    compilerOptions: {
      comments: false,
    },
  },
  icon: {
    componentName: "NuxtIcon",
    mode: "svg",
    serverBundle: {
      collections: ["mdi", "ic"],
    },
  },

  // TODO: TMP TMP
  build: {
    analyze: {
      enabled: true,
      mode: "static",
    },
  },
});
