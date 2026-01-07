<script setup lang="ts">
import { localIcons } from "~/content/icons";
import socialMedia from "~/content/social-media";
import { ogImg } from "~/content/seo";
import { projects as projectsObject } from "~/content/projects";
import { NuxtLink, SharedNuxtLink } from "#components";

type QuickLinkType = {
  label: string;
  href: string;
};

type ProjectLinkType = {
  website: string;
  name: string;
  icon?: string;
  description?: string;
};

const { baseUrl } = useRuntimeConfig().public;
const absoluteOgImg = baseUrl + ogImg;
const route = useRoute();
const isHomePage = computed(() => route.name === "index" || route.path === "/");

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
      sizes: "any",
    },
  ],
});

useSeoMeta({
  ogImage: absoluteOgImg,
  twitterImage: absoluteOgImg,
});

// defineOgImageComponent("Og");

const convertToTitleCase = (input: string): string =>
  input
    .replace(/^\//, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const quickLinks: QuickLinkType[] = useNuxtApp()
  .$router.getRoutes()
  .filter((route) => route.path !== "/:catchAll(.*)")
  .map((route) => ({
    label: route.path === "/" ? "Home" : convertToTitleCase(route.path),
    href: route.path,
  }));

const projects: QuickLinkType[] = projectsObject.map(
  ({ website, name }: ProjectLinkType) => ({
    href: website,
    label: name,
  })
);
</script>

<template>
  <NuxtLoadingIndicator>
    <div
      class="h-full w-full animate-[loading-indicator_2s_infinite] bg-gradient-to-r from-white via-gray-500 to-black"
    />
  </NuxtLoadingIndicator>
  <div class="w-full h-full bg-white bg-dot-black/[0.4] bg-fixed relative">
    <div
      class="absolute pointer-events-none inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
    />
    <main
      class="relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500"
    >
      <NuxtRouteAnnouncer politeness="assertive">
        {{ route.name === "index" ? "home" : route.name }} page was loaded.
      </NuxtRouteAnnouncer>
      <NuxtPage />
    </main>
  </div>

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
            class="flex justify-normal space-x-2 text-2xl font-bold text-center text-neutral-600 selection:bg-emerald-500 mr-10 py-0 pointer-events-auto"
          >
            <span v-html="localIcons.home.logoSB" />
          </NuxtLink>
        </div>
        <div class="text-base text-neutral-600">Sabeer Bikba</div>
        <div class="font-medium text-base text-neutral-700">
          Turning Ideas into Reality with Code
        </div>
      </div>

      <div
        class="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0 text-neutral-600"
      >
        <div
          v-for="{ title, links } in [
            {
              title: 'Quick Links',
              links: quickLinks,
            },
            {
              title: 'Social Media',
              links: socialMedia,
            },
            {
              title: 'Projects',
              links: projects,
            },
          ]"
          :key="title"
        >
          <nav :aria-labelledby="useSlugify(title)">
            <AccessibilityHeadingSrOnly :id="useSlugify(title)">
              {{ title }}
            </AccessibilityHeadingSrOnly>
            <ul class="footer-links">
              <li v-for="{ href, label } in links" :key="label">
                <component
                  v-if="title === 'Quick Links'"
                  :key="label + 1"
                  :is="href !== '/' ? SharedNuxtLink : NuxtLink"
                  :to="href"
                  :aria-label="`Navigate to ${label} page`"
                >
                  {{ label }}
                </component>
                <SharedExternalLink
                  v-else
                  :key="label"
                  :href
                  :aria-label="`${
                    title === 'Social Media'
                      ? 'Link to'
                      : 'Visit the website for project'
                  } ${label}`"
                >
                  {{ label }}
                </SharedExternalLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>
