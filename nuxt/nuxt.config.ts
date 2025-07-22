// https://nuxt.com/docs/api/configuration/nuxt-config
// Vercel ENV: https://vercel.com/docs/environment-variables/system-environment-variables

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://sabeerbikba.vercel.app";

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
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "nuxt-og-image",
  ],

  site: {
    url: BASE_URL,
    name: "sabeer bikba | portfolio",
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

  // sitemap: {
  //   defaults: {
  //     lastmod: new Date().toISOString(),
  //   },

  //   // excludeAppSources: true,
  //   urls: async () => {
  //     const urls = [];

  //     // Static pages
  //     // urls.push({ loc: "" });
  //     // urls.push({ loc: "/contact" });

  //     // Dynamic pages with query parameters
  //     const projects = ["dev-tools", "rickshaw"];
  //     const apps = ["website", "about", "github"];

  //     // Homepage variations
  //     urls.push({ loc: "/?project=dev-tools&app=website" });
  //     urls.push({ loc: "/?app=about" });
  //     urls.push({ loc: "/?project=dev-tools&app=about" });
  //     urls.push({ loc: "/?app=github" });
  //     urls.push({ loc: "/?project=dev-tools&app=github" });

  //     // Rickshaw variations
  //     for (const app of apps) {
  //       urls.push({ loc: `/?project=rickshaw&app=${app}` });
  //     }

  //     return urls;
  //   },
  // },

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
