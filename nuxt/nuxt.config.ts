// https://nuxt.com/docs/api/configuration/nuxt-config

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/`
  : "https://sabeerbikba.vercel.app/";

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
    "nuxt-og-image",
  ],

  site: {
    url: BASE_URL,
    name: "nuxt.config Test My Awesome Website",
  },

  ogImage: {
    zeroRuntime: true, // OG image code is removed from the final output
  },

  runtimeConfig: {
    public: {
      baseUrl: BASE_URL,
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
    enabled: true,
    // vscode: {
    //   reuseExistingServer: true,
    // },
    // timeline: {
    //   enabled: true,
    // },
  },
});
