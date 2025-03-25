<script setup lang="ts">
import socialMedia from "~/data/social-media";
import { projects as projectsObject } from "~/data/projects";

type QuickLink = {
  label: string;
  href: string;
};

type Project = {
  website: string;
  title: string;
  icon?: string;
  about?: string;
};

const route = useRoute();
const isHomePage: ComputedRef<boolean> =
  computed(() => route.name === "home" || route.path === "/");

const quickLinks: QuickLink[] = useNuxtApp()
  .$router.getRoutes()
  .filter((route) => route.path !== "/:catchAll(.*)")
  .map((route) => ({
    label: route.path === "/" ? "Home" : convertToTitleCase(route.path),
    href: route.path,
  }))
  .reverse();

const projects: QuickLink[] = projectsObject.map(({ website, title }: Project) => ({
  href: website,
  label: title,
}));

useSeoMeta({
  title: "sabeer bikba portfolio",
  description: "//TODO: add description",
});

useHead({
  htmlAttrs: { lang: "en" },
  meta: [{
    name: "viewport",
    content: "width=device-width, initial-scale=1.0",
  }],
  link: [{
    rel: "icon",
    type: "image/svg+xml",
    href: `data:image/svg+xml,%3Csvg%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%200%2048%2048%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2248%22%20height%3D%2248%22%20rx%3D%2220%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M24.4674%207.37231C23.5339%206.85809%2022.3977%206.87771%2021.4825%207.42385L9.9751%2014.2911L9%2014.873V16.0085V31.1167C9%2032.2175%209.60288%2033.2299%2010.5707%2033.7544L24.0006%2041.0317L25.0749%2041.6138L26.0832%2040.9237L36.6945%2033.6605C37.5115%2033.1013%2038%2032.175%2038%2031.1849V16.0085V14.8269L36.965%2014.2567L24.4674%207.37231ZM15.4356%2015.6906L23.0398%2011.1527L31.7827%2015.9687L24.8544%2019.6166L15.4356%2015.6906ZM26.9535%2023.032L34%2019.3218V30.6575L26.9535%2035.4807V23.032Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E`,
  }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: "Featured Works",
        description:
          "Explore my featured projects and creations. See live previews, project details, and GitHub repo visuals.",
        creator: {
          "@type": "Person",
          name: "Sabeer Bikba",
        },
        workExample: projectsObject.map(({ title, website, icon, about }: Project) => ({
          "@type": "WebPage",
          name: title,
          url: website,
          image: icon,
          about: about,
        })),
      }),
    },
  ],
});
</script>

<template>
  <div>
    <main class="w-full h-full bg-white bg-dot-black/[0.4] relative">
      <div
        class="absolute pointer-events-none inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
      </div>
      <div class="relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
        <NuxtPage />
      </div>
    </main>
    <footer v-if="isHomePage" class="border-t border-neutral-300 px-8 py-20 bg-white">
      <div class="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start">
        <div>
          <div class="mr-4 md:flex mb-1.5">
            <NuxtLink to="/" aria-label="Home page"
              class="center max-md:justify-normal space-x-2 text-2xl font-bold text-center text-neutral-600 selection:bg-emerald-500 mr-10 py-0">
              <IconLogo />
            </NuxtLink>
          </div>
          <div class="text-base">Sabeer Bikba</div>
          <div class="font-medium text-base text-neutral-600">
            Turning Ideas into Reality with Code
          </div>
        </div>

        <!-- Navigation -->
        <div class="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
          <div v-for="({ id, title, links }, index) in [{
            id: 'quick-links',
            title: 'Quick Links',
            links: quickLinks,
          }, {
            id: 'social-media',
            title: 'Social Media',
            links: socialMedia,
          }, {
            id: 'projects',
            title: 'Projects',
            links: projects,
          }]" :key="id">
            <nav :aria-labelledby="id">
              <h2 :id="id" class="sr-only">{{ title }}</h2>
              <ul class="flex justify-center space-y-4 flex-col mt-4">
                <li v-for="{ href, label } in links" :key="label">
                  <NuxtLink v-if="index === 0" :to="href" :aria-label="`Navigate to ${label} page`"
                    class="transition-colors hover:text-foreground/80 text-foreground/60">
                    {{ label }}
                  </NuxtLink>
                  <a v-else :href="href" :aria-label="`${id === 'social-media'
                    ? 'Link to'
                    : 'Visit the website for project'
                    } ${label}`" target="_blank" rel="noopener noreferrer"
                    class="transition-colors hover:text-foreground/80 text-foreground/60">
                    {{ label }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.center {
  @apply flex items-center justify-center;
}

.notes-body h3 {
  @apply text-3xl font-extrabold mb-6 text-[#d4d4d4];
}

.notes-body h4 {
  @apply text-2xl font-bold mb-4 text-[#d4d4d4];
}

.notes-body h5 {
  @apply text-xl font-semibold mb-3 text-[#d4d4d4];
}

.notes-body p {
  @apply text-base leading-relaxed mb-5 text-[#cecece];
}

.notes-body a {
  @apply text-blue-500 underline hover:text-blue-600;
}

.notes-body ul {
  @apply list-disc ml-6 mb-4 text-[#cecece];
}

.notes-body ol {
  @apply list-decimal ml-6 mb-4 text-[#cecece];
}

.notes-body li {
  @apply mb-2 leading-6;
}

.notes-body code {
  @apply rounded px-1 py-0.5 font-mono text-sm;
}

.notes-body blockquote {
  @apply border-l-4 border-[#d4d4d4] pl-4 italic py-2 my-4 text-[#a8a8a8];
}

.notes-body img {
  @apply max-w-full rounded-lg border border-gray-300 shadow-sm mt-4 mb-6;
}

.notes-body hr {
  @apply border-t border-gray-200 my-6;
}

.notes-body table {
  @apply w-full border-collapse overflow-hidden rounded-lg shadow-sm mb-5 text-[#a8a8a8];
}

.notes-body th {
  @apply font-semibold px-[9px] py-[7px] border-2 border-[#2f2f2f];
}

.notes-body td {
  @apply px-[9px] py-[7px] border-2 border-[#2f2f2f];
}

.notes-body pre {
  @apply bg-[#202020] p-4 rounded-lg text-sm overflow-x-auto mb-6 text-[#a8a8a8];
}
</style>
