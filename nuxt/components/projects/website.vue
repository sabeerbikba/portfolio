<script setup lang="ts">
import { projects } from "~/data/projects";
import type { ScreenStoreType } from "~/types/store";

defineProps<{ hidden: boolean }>();

const loaded = ref(projects.map((_, index) => index === 0));
const store = inject("store") as ScreenStoreType;

watch(
  () => store.state.previewProject,
  (newProject) => {
    const index = newProject - 1;
    if (!loaded.value[index]) {
      loaded.value[index] = true;
    }
  }
);
</script>

<template>
  <div
    class="w-full h-full center relative overflow-auto scroll"
    :style="{ display: hidden ? 'none' : 'flex' }"
  >
    <template v-for="({ website, name }, index) in projects" :key="index">
      <iframe
        v-show="loaded[index]"
        class="w-full h-full max-md:rounded-2xl"
        :hidden="store.state.previewProject - 1 !== index"
        :aria-hidden="store.state.previewProject - 1 !== index"
        :src="website"
        :title="`Project showcase: ${name}`"
        loading="lazy"
      />
    </template>
  </div>
</template>
