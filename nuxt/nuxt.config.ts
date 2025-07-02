// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: "static",
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "motion-v/nuxt",
    "@nuxt/icon",
    "@nuxt/eslint",
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
  vite: {
    esbuild: {
      legalComments: "none",
    },
    build: {
      terserOptions: {
        format: {
          comments: false,
        },
      },
    },
  },
  icon: {
    componentName: "NuxtIcon",
    mode: "svg",
    provider: "server",
    fallbackToApi: false,
    serverBundle: {
      collections: ["mdi", "ic"],
    },
  },
  devtools: { enabled: false },
  compatibilityDate: "2024-11-01",
  // build: {
  //   analyze: {
  //     enabled: true,
  //     mode: "static",
  //   },
  // },
});
