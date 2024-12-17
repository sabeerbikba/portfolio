<script setup lang="ts">
import type { ProjectType } from "~/data/projects";

const props = defineProps<{
  tab: number;
  data: ProjectType[];
  hidden: boolean;
}>();

const loaded: Ref<boolean[]> = ref(
  Array.from({ length: props.data.length }, (_, index) => index === 0)
);

// Watch for changes in `tab` and mark the tab as loaded
watch(
  () => props.tab,
  (newTab) => {
    if (!loaded.value[newTab]) {
      loaded.value = [...loaded.value];
      loaded.value[newTab] = true;
    }
  }
);

// Ensure the first tab is marked as loaded on component mount
onMounted(() => {
  if (!loaded.value[props.tab]) {
    loaded.value[props.tab] = true;
  }
});
</script>

<template>
  <div
    class="w-full h-full center relative"
    :style="{ display: hidden ? 'none' : 'block' }"
  >
    <template v-for="(project, index) in data" :key="index">
      <iframe
        v-if="loaded[index]"
        loading="lazy"
        class="w-full h-full max-md:rounded-2xl"
        :hidden="tab !== index"
        :aria-hidden="tab !== index"
        :src="project.website"
        :title="`Project showcase: ${project.title}`"
      />
    </template>
  </div>
</template>
