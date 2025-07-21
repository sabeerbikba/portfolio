<script setup lang="ts">
import { localIcons } from "~/data/icons";
import type { NuxtError } from "#app";

const { error } = defineProps<{ error: NuxtError }>();

const statusCode = error?.statusCode || 500;
const statusMessage = error?.message || "Internal Server Error";

useHead({
  htmlAttrs: { lang: "en" },
  title: `${statusCode} - ${statusMessage}`,
  meta: [
    { name: "robots", content: "noindex" },
    { name: "description", content: statusMessage },
  ],
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: localIcons.home.headerLogoHref,
    },
  ],
});
</script>

<template>
  <main class="w-screen h-screen bg-white bg-dot-black/[0.4] relative">
    <div
      class="absolute pointer-events-none inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] h-full"
    />
    <div class="text-neutral-600 flex-wrap center h-full">
      <div class="max-w-[520px] text-center z-20">
        <h1 class="font-medium mb-8 sm:text-10xl text-8xl">
          {{ statusCode }}
        </h1>
        <p
          class="font-light leading-tight mb-16 px-8 sm:px-0 sm:text-4xl text-xl"
        >
          {{ statusMessage }}
        </p>
        <div class="center w-full">
          <NuxtLink
            to="/"
            aria-label="Go back to homepage"
            class="cursor-pointer border-[2.5px] rounded-md border-black/70 hover:border-black/55 bg-neutral-300 px-4 py-2 sm:px-6 sm:py-3 sm:text-xl text-md text-neutral-800"
          >
            Go back home
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>
