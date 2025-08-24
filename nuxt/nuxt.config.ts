// https://nuxt.com/docs/api/configuration/nuxt-config
// Vercel ENV: https://vercel.com/docs/environment-variables/system-environment-variables#VERCEL_PROJECT_PRODUCTION_URL

const BASE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://sabeerbikba.vercel.app";

export default defineNuxtConfig({
  ssr: true,

  nitro: {
    preset: "vercel",
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "motion-v/nuxt",
    "@nuxt/icon",
    "@nuxt/eslint",
    // "@nuxtjs/html-validator",
    "@vueuse/nuxt",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "nuxt-og-image",
  ],

  site: {
    url: BASE_URL, // sitemap.xsl
    name: "sabeer bikba | portfolio",
  },

  robots: {
    allow: ["/", "/images/og.jpg"],
    disallow: ["/images/"],
    credits: false,
  },

  ogImage: {
    zeroRuntime: true,
  },

  sitemap: {
    autoLastmod: true,
    discoverImages: false,
    discoverVideos: false,
    credits: false,

    urls: async () => {
      const urls = [];
      const projects = ["dev-tools", "rickshaw"];
      const apps = ["website", "about", "github"];

      for (const [pi, project] of projects.entries()) {
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

  runtimeConfig: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    spreadsheetId: process.env.SPREADSHEET_ID,
    public: {
      gmail: "sabeerbikba02@gmail.com",
      phone: "918618718358",
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

  // htmlValidator: {
  //   usePrettier: true,
  // },

  compatibilityDate: "2024-11-01",
  devtools: {
    enabled: true,
  },
});
