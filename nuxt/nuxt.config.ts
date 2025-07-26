// https://nuxt.com/docs/api/configuration/nuxt-config
// Vercel ENV: https://vercel.com/docs/environment-variables/system-environment-variables

// import { iconsName } from "~/content/projects";

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
    // Used in og:image and sitemap.xsl
    url: BASE_URL,
    name: "sabeer bikba | portfolio",
  },

  robots: {
    disallow: ["/images/"],
    allow: ["/images/og.jpg"],
    credits: false,
  },

  ogImage: {
    zeroRuntime: true, // OG image code is removed from the final output
    // provider: "satori",
    // dir: "./components/og-image",
    // routes: {
    //   "/og-default": "custom.vue", // now accessible at /og-default.og.png
    // },
  },

  runtimeConfig: {
    public: {
      baseUrl: BASE_URL,
      repoOwner: process.env.VERCEL_GIT_REPO_OWNER || "sabeerbikba",
      githubBaseURL: "https://github.com/",
    },
  },

  sitemap: {
    autoLastmod: true,
    discoverImages: false,
    discoverVideos: false,
    credits: false,
    // defaults: {
    //   lastmod: new Date().toISOString(),
    // },

    // excludeAppSources: true,
    urls: async () => {
      const urls = [];

      // Static pages
      // urls.push({ loc: "" });
      // urls.push({ loc: "/contact" });

      // Dynamic pages with query parameters
      const projects = ["dev-tools", "rickshaw"];
      const apps = ["website", "about", "github"];
      // const projectss = projects.map((name, i) => i !== 0 && { return name.name })

      // Homepage variations
      // urls.push({ loc: "/?app=about" });
      // urls.push({ loc: "/?app=github" });
      // urls.push({ loc: BASE_URL });
      // urls.push({ loc: "/?project=dev-tools&app=website" });
      // urls.push({ loc: "/?project=dev-tools&app=about" });
      // urls.push({ loc: "/?project=dev-tools&app=github" });

      // Rickshaw variations

      // for (const [pi, project] of iconsName.projects.entries()) {
      for (const [pi, project] of projects.entries()) {
        // for (const [ai, app] of iconsName.apps.entries()) {
        for (const [ai, app] of apps.entries()) {
          if (pi === 0) {
            if (ai !== 0) {
              urls.push({ loc: `/?app=${app}` });
            }
          } else {
            urls.push({ loc: `/?project=${project}&app=${app}` });
          }
        }
      }

      return urls;
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
