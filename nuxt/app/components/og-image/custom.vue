<script setup lang="ts">
import { name } from "~/content/seo";

// Docs: https://nuxtseo.com/docs/og-image/getting-started/introduction
// Components: https://github.com/nuxt-modules/og-image/blob/main/src/runtime/app/components/Templates/Community/BrandedLogo.vue


const website = computed(() =>
  useNormalizeUrl().value.replace(/^https?:\/\//, "")
);
</script>

<template>
  <div
    class="w-full h-full flex justify-between relative p-[60px] bg-white text-gray-900"
  >
    <div class="w-full h-full">
      <div class="flex flex-col w-full">
        <h1
          class="m-0 font-bold mb-[30px] text-[75px]"
          style="display: block; text-overflow: ellipsis"
        >
          {{ name }}
        </h1>
        <p
          class="text-[35px] leading-12 text-gray-700"
          style="display: block; line-clamp: 3; text-overflow: ellipsis"
        >
          Web Developer Specialized in React, Vue & Nuxt.js
        </p>
      </div>

      <div class="h-1/2" />

      <div class="flex flex-row text-2xl font-bold mb-0">
        <div class="flex flex-row pr-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :width="42"
            :height="42"
            :viewBox="`0 0 ${42} ${42}`"
            fill="none"
          >
            <rect :width="42" :height="42" rx="20" fill="white" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.4674 7.37231C23.5339 6.85809 22.3977 6.87771 21.4825 7.42385L9.9751 14.2911L9 14.873V16.0085V31.1167C9 32.2175 9.60288 33.2299 10.5707 33.7544L24.0006 41.0317L25.0749 41.6138L26.0832 40.9237L36.6945 33.6605C37.5115 33.1013 38 32.175 38 31.1849V16.0085V14.8269L36.965 14.2567L24.4674 7.37231ZM15.4356 15.6906L23.0398 11.1527L31.7827 15.9687L24.8544 19.6166L15.4356 15.6906ZM26.9535 23.032L34 19.3218V30.6575L26.9535 35.4807V23.032Z"
              fill="black"
            />
          </svg>
          <div class="pl-2 pt-1.5">
            {{ website }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
