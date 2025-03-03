<script setup lang="ts">
const props = defineProps<{ previewProject: number; previewApp: number; }>();
</script>

<template>
  <div class="text-black bg-[#191919]" :hidden="previewApp !== 4">
    <div class="notes-body max-w-prose mx-auto p-6">
      <ProjectsAboutDevtools v-if="previewProject === 1" />
      <ProjectsAboutRickshaw v-else />
    </div>
  </div>
</template>
