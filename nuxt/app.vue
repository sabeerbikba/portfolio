<script setup lang="ts">
import localIcons from "~/data/icons";
import socialMedia from "~/data/social-media";
import { projects as projectsObject } from "~/data/projects";
import type { QuickLinkType, ProjectLinkType } from "~/types/global";

// type S

const { baseUrl } = useRuntimeConfig().public;

const route = useRoute();
const isHomePage = computed<boolean>(
  () => route.name === "index" || route.path === "/"
);
// const currentPageURL = computed(
//   () => baseUrl + (route.path as string).slice(1)
// );



// const currentMeta =
//   seoMetaMap[route.name as keyof typeof seoMetaMap] ?? seoMetaMap.index;

// const updateSEO = () => {


  useHead({
    htmlAttrs: { lang: "en" },
    meta: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/svg+xml",
        href: localIcons.home.headerLogoHref,
      },
      {
        rel: "canonical",
        href: baseUrl + (route.path as string).slice(1),
      },
    ],
    script: [
      // TODO: After creation of /project page it will render only in /project
      ...(isHomePage.value
        ? [
            {
              type: "application/ld+json",
              innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                name: "Featured Works",
                description:
                  "Explore my featured projects and creations. See live previews, project details, and GitHub repo visuals.",
                creator: {
                  "@type": "Person",
                  name: "Sabeer Bikba",
                },
                workExample: projectsObject.map(
                  ({ title, website, icon, about }: ProjectLinkType) => ({
                    "@type": "WebPage",
                    name: title,
                    url: website,
                    image: icon,
                    about,
                  })
                ),
              }),
            },
          ]
        : []),
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Sabeer Bikba",
          url: baseUrl,
          jobTitle: "Web Developer",
          sameAs: socialMedia.map(({ href }) => href),
        }),
      },
    ],
  });
// };

// updateSEO();

const quickLinks: QuickLinkType[] = useNuxtApp()
  .$router.getRoutes()
  .filter((route) => route.path !== "/:catchAll(.*)")
  .map((route) => ({
    label: route.path === "/" ? "Home" : convertToTitleCase(route.path),
    href: route.path,
  }))
  .reverse();

const projects: QuickLinkType[] = projectsObject.map(
  ({ website, title }: ProjectLinkType) => ({
    href: website,
    label: title,
  })
);

// watch(route, () => {
//   updateSEO();
// });
</script>

<template>
  <main class="w-full h-full bg-white bg-dot-black/[0.4] relative">
    <div
      class="absolute pointer-events-none inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
    />
    <div
      class="relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500"
    >
      <NuxtPage />
    </div>
  </main>
  <footer
    v-if="isHomePage"
    class="border-t border-neutral-300 px-8 py-20 bg-white"
  >
    <div
      class="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start"
    >
      <div>
        <div class="mr-4 md:flex mb-1.5">
          <NuxtLink
            to="/"
            aria-label="Home page"
            class="flex justify-normal space-x-2 text-2xl font-bold text-center text-neutral-600 selection:bg-emerald-500 mr-10 py-0"
          >
            <span v-html="localIcons.home.logoSB"></span>
          </NuxtLink>
        </div>
        <div class="text-base">Sabeer Bikba</div>
        <div class="font-medium text-base text-neutral-600">
          Turning Ideas into Reality with Code
        </div>
      </div>

      <div class="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
        <div
          v-for="({ id, title, links }, index) in [
            {
              id: 'quick-links',
              title: 'Quick Links',
              links: quickLinks,
            },
            {
              id: 'social-media',
              title: 'Social Media',
              links: socialMedia,
            },
            {
              id: 'projects',
              title: 'Projects',
              links: projects,
            },
          ]"
          :key="id"
        >
          <nav :aria-labelledby="id">
            <h2 :id="id" class="sr-only">{{ title }}</h2>
            <ul class="flex justify-center space-y-4 flex-col mt-4">
              <li v-for="{ href, label } in links" :key="label">
                <NuxtLink
                  v-if="index === 0"
                  :to="href"
                  :aria-label="`Navigate to ${label} page`"
                  class="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {{ label }}
                </NuxtLink>
                <a
                  v-else
                  :href="href"
                  :aria-label="`${
                    id === 'social-media'
                      ? 'Link to'
                      : 'Visit the website for project'
                  } ${label}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {{ label }}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>
