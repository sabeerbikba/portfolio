<script setup lang="ts">
import { projects } from "~/data/projects";
import type { ScreenStoreType } from "~/types/store";
import { useElementSize } from "@vueuse/core";

const store = inject("store") as ScreenStoreType;

const webWrapperRef = useTemplateRef<HTMLDivElement>("webWrapperRef");
const { width, height } = useElementSize(webWrapperRef);
const isWebsiteComponentHidden = computed(() => store.state.previewApp !== 3);
</script>

<template>
  <div
    ref="webWrapperRef"
    :style="{ display: isWebsiteComponentHidden ? 'none' : 'block' }"
    :class="{
      'wh-full relative': true,
    }"
  >
    <div
      v-for="({ website, name, webBgImg }, index) in projects"
      v-show="store.state.previewProject === index + 1"
      :key="index"
      :class="{
        'wh-full relative': true,
        'bg-[#2a2a2a]': index === 0,
        'bg-[#a67a42]': index === 1,
      }"
      :style="{ width: `${width}px`, height: `${height}px` }"
    >
      <div class="sr-only">
        <h2>{{ name }}</h2>
        <p>
          This is a live preview of project: <strong>{{ name }}</strong
          >.
        </p>
        <UiExternalLink :href="website">Visit {{ website }}</UiExternalLink>
      </div>
      <div class="wh-full">
        <img
          :src="webBgImg"
          class="wh-full blur-sm absolute z-10 top-0"
          :alt="`Blurred background of the ${name} project preview`"
        />
        <iframe
          class="wh-full max-md:rounded-2xl absolute z-20 top-0"
          :src="website"
          :title="`Project showcase: ${name}`"
        />
      </div>
    </div>
  </div>
</template>
