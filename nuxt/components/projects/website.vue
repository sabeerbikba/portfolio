<script setup lang="ts">
import { projects } from "~/data/projects";

defineProps<{ hidden: boolean }>();

const loaded = ref(projects.map((_, index) => index === 0));
const previewProjectIndex = useState<number>("previewProjectIndex");

watch(
  () => previewProjectIndex.value,
  (newTab) => {
    if (!loaded.value[newTab]) {
      previewProjectIndex.value = newTab;
      loaded.value[newTab] = true;
    }
  }
);
</script>

<template>
  <div
    class="w-full h-full center relative overflow-auto scroll"
    :style="{ display: hidden ? 'none' : 'flex' }"
  >
    <template v-for="({ website, title }, index) in projects" :key="index">
      <iframe
        v-if="loaded[index]"
        class="w-full h-full max-md:rounded-2xl"
        :hidden="previewProjectIndex !== index"
        :aria-hidden="previewProjectIndex !== index"
        :src="website"
        :title="`Project showcase: ${title}`"
        loading="lazy"
      />
    </template>
  </div>
</template>
