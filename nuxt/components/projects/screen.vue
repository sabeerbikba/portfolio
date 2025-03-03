<script setup lang="ts">
// <script setup>
import { projects } from '~/data/projects';
import { storeToRefs } from 'pinia';
import useScreenStore from '~/store/use-screen-store';
import type { ProjectDataType } from "~/types/github";

const store = useScreenStore();
const { previewProject, previewApp, isDataAvailable, data } = storeToRefs(store);
const previewProjectIndex: ComputedRef<number> =
  computed(() => previewProject.value - 1);
const isWebsiteComponentHidden = computed(() => previewApp.value !== 3);
const isGithubComponentVisible = computed(() => previewApp.value === 5);
const previewData: ComputedRef<ProjectDataType> =
  computed(() => data.value[previewProjectIndex.value]);

</script>

<template>
  <ProjectsFloatingDock />
  <div class="h-full w-full overflow-auto scroll">
    <ProjectsWebsite :hidden="isWebsiteComponentHidden" />
    <ProjectsAbout :preview-project="previewProject" :preview-app="previewApp" />
    <div v-show="isGithubComponentVisible" class="bg-[#0d1117] h-full">
      <ProjectsGithub v-if="isDataAvailable" :data="previewData" />
      <ProjectsScreenFallbackGithubUi v-else :repo="projects[previewProjectIndex]?.repo" />
    </div>
  </div>
</template>

<style>
.scroll {
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: #5b5d61 #191919;
}

.scroll::-webkit-scrollbar {
  width: 8px;
}
</style>
