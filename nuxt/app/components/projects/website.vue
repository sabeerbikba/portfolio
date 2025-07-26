<script setup lang="ts">
import { iconsName, projects } from "~/content/projects";
import type { ScreenStoreType } from "~~/types/store";

const store = inject("store") as ScreenStoreType;
const [isProjectsWebsite] = useTabState(["is-projects-website"]);

const webWrapperRef = useTemplateRef("webWrapperRef");
const { width, height } = useElementSize(webWrapperRef);

const isVisble = computed<"block" | "none">(() =>
  store.state.previewApp === useFindProjectsBtnIndex("apps", "website")
    ? "block"
    : "none"
);
</script>

<template>
  <div
    ref="webWrapperRef"
    class="wh-full relative hidden"
    :style="{ display: isVisble }"
    tabindex="0"
    :aria-label="`website preview of ${
      iconsName.projects[store.state.previewProject]
    }`"
    @focus="isProjectsWebsite.focused = true"
    @keydown.tab="isProjectsWebsite.tabClicked = true"
  >
    <AccessibilityNotifier :app-store="2" />
    <div
      v-for="({ website, name, webBgImg: src }, index) in projects"
      :key="index"
      :class="{
        'wh-full relative hidden': true,
        'bg-[#2a2a2a]':
          index === useFindProjectsBtnIndex('projects', 'dev.tools'),
        'bg-[#a67a42]':
          index === useFindProjectsBtnIndex('projects', 'rickshaw'),
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
        <SharedExternalLink :href="website"
          >Visit {{ website }}</SharedExternalLink
        >
      </div>
      <div class="wh-full">
        <img
          :src
          class="wh-full blur-sm absolute z-10 top-0"
          role="presentation"
          aria-hidden="true"
        />
        <iframe
          :src="website"
          :title="`Project showcase: ${name}`"
          class="wh-full max-md:rounded-2xl absolute z-20 top-0"
        />
      </div>
    </div>
  </div>
</template>
