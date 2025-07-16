<script setup lang="ts">
import { projects } from "~/data/projects";
import type { ScreenStoreType } from "~/types/store";

const store = inject("store") as ScreenStoreType;

const webWrapperRef = useTemplateRef("webWrapperRef");
const { width, height } = useElementSize(webWrapperRef);
</script>

<template>
  <div
    ref="webWrapperRef"
    class="wh-full relative hidden"
    :style="{ display: store.state.previewApp === 2 ? 'block' : 'none' }"
  >
    <div
      v-for="({ website, name, webBgImg }, index) in projects"
      :key="index"
      :class="{
        'wh-full relative hidden': true,
        'bg-[#2a2a2a]': index === 0,
        'bg-[#a67a42]': index === 1,
      }"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
        display: store.state.previewProject === index ? 'block' : 'none',
      }"
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
          role="presentation"
          aria-hidden="true"
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
