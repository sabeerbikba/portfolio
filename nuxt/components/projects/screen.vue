<script setup lang="ts">
// <script setup>
import { projects } from '~/data/projects';
import { storeToRefs } from 'pinia';
import useScreenStore from '~/store/use-screen-store';

const store = useScreenStore();
const { previewApp , isDataAvailable, data } = storeToRefs(store);
const previewProjectIndex = useState<number>("previewProjectIndex");
const isWebsiteComponentHidden = computed(() => previewApp.value !== 3);
const isGithubComponentVisible = computed(() => previewApp.value === 5);





</script>

<template>
  <ProjectsFloatingDock />
  <div class="text-black h-10">
    val: {{ previewApp }}
  </div>

  <div class="h-full w-full">
    <ProjectsWebsite :hidden="isWebsiteComponentHidden" />
    <div v-show="isGithubComponentVisible" class="bg-[#0d1117] h-full">
      <ProjectsGithub v-if="isDataAvailable" :data="data[previewProjectIndex]" />
      <ProjectsScreenFallbackGithubUi v-else :repo="projects[previewProjectIndex]?.repo" />
    </div>
    <!-- <div v-show="state.previewApp === 5" class="bg-[#0d1117] h-full">
      <ProjectsGithub v-if="isDataAvailable" :data="data[previewProjectIndex]" />
      <ProjectsScreenFallbackGithubUi v-else :repo="projects[previewProjectIndex]?.repo" />
    </div> -->
  </div>
</template>
