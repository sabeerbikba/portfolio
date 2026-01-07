// https://nuxt.com/docs/api/configuration/nuxt-config
// Vercel ENV: https://vercel.com/docs/environment-variables/system-environment-variables#VERCEL_PROJECT_PRODUCTION_URL

const vercelProjectProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const BASE_URL = vercelProjectProductionUrl
  ? `https://${vercelProjectProductionUrl}`
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
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    spreadsheetIdContacts: process.env.SPREADSHEET_ID_CONTACTS,
    spreadsheetIdRedeploy: process.env.SPREADSHEET_ID_REDEPLOY,
    discordWebhookUri: process.env.DISCORD_WEBHOOK_URI,
    cronSecret: process.env.CRON_SECRET,
    deployHookUrl: process.env.DEPLOY_HOOK_URL,
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
