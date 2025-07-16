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
    "@nuxtjs/html-validator",
    "@vueuse/nuxt",
    "@nuxtjs/device",
  ],

  // experimental: {
  //   payloadExtraction: true,
  // },

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
      minify: true,
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

  htmlValidator: {
    usePrettier: true,
  },

  // build: {
  //   analyze: {
  //     enabled: true,
  //     mode: "static",
  //   },
  // },

  compatibilityDate: "2024-11-01",
  // debug: true,
  devtools: {
    // enabled: false,
    // vscode: {
    //   reuseExistingServer: true,
    // },
    // timeline: {
    //   enabled: true,
    // },
  },
});
