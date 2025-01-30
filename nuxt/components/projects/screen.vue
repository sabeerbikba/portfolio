<!-- <script setup lang="ts"> -->
<script setup>
import FloatingDock from "./floating-dock.vue";
// import useScreenStore from "~/composables/use-screen-store";

import About from "./about.vue";
import Github from "./github.vue";
import Website from "./website.vue";
import { projects } from "@/data/projects";
import ScreenFallbackGithubUi from "./screen-fallback-github-ui.vue";
// import { MarkGithubIcon } from "@primer/octicons-vue";

const { state, isDataAvailable, previewProjectIndex } = useScreenStore();
</script>

<template>
  <div>
    <div class="text-black"> SSS sabeer bikba</div>
    <FloatingDock />
    <div class="overflow-scroll h-full w-full">
      <Website :tab="previewProjectIndex" :data="projects" :hidden="previewApp !== 3" />
      <About :number="[previewProject, previewApp]" />
      <div v-show="previewApp === 5" class="bg-[#0d1117] h-full">
        <Github v-if="isDataAvailable" :data="state.data[previewProjectIndex]" />
        <ScreenFallbackGithubUi v-else :repo="projects[previewProjectIndex]?.repo" />
      </div>
    </div>
  </div>
</template>
