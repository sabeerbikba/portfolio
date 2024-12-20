<script setup lang="ts">
// import DevTools from "./DevTools.vue";
// import Rickshaw from "./Rickshaw.vue";

const props = defineProps<{
  number: [number, number];
}>();

const [project, app] = props.number;
</script>

<template>
  <div class="text-black bg-[#191919]" :hidden="app !== 4">
    <div class="notes-body max-w-prose mx-auto p-6">
      <ProjectsAboutDevtools v-if="project === 1" />
      <ProjectsAboutRickshaw v-else />
    </div>
  </div>
</template>
