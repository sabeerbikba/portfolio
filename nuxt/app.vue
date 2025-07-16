<script setup lang="ts">
import { localIcons } from "~/data/icons";
import socialMedia from "~/data/social-media";
import { projects as projectsObject } from "~/data/projects";
import { NuxtLink, UiNuxtLink } from "#components";

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

const route = useRoute();
const isHomePage = computed(
  () => route.name === "index" || route.path === "/"
);

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
  ],
});

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
            <span v-html="localIcons.home.logoSB" />
          </NuxtLink>
        </div>
        <div class="text-base">Sabeer Bikba</div>
        <div class="font-medium text-base text-neutral-600">
          Turning Ideas into Reality with Code
        </div>
      </div>

      <div class="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
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
            <UiHeadingSrOnly :id="useSlugify(title)">
              {{ title }}
            </UiHeadingSrOnly>
            <ul class="footer-links">
              <li v-for="{ href, label } in links" :key="label">
                <component
                  v-if="title === 'Quick Links'"
                  :is="href !== '/' ? UiNuxtLink : NuxtLink"
                  :to="href"
                  :aria-label="`Navigate to ${label} page`"
                >
                  {{ label }}
                </component>
                <UiExternalLink
                  v-else
                  :href="href"
                  :aria-label="`${
                    title === 'Social Media'
                      ? 'Link to'
                      : 'Visit the website for project'
                  } ${label}`"
                >
                  {{ label }}
                </UiExternalLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>
