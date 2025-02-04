<!-- <script setup lang="ts">
import type { ProjectType } from "~/data/projects";
import { projects } from "~/data/projects";


const props = defineProps<{
  tab: number;
  data?: ProjectType[];
  hidden: boolean;
}>();


const loaded: Ref<boolean[]> = ref(
  Array.from({ length: props.data?.length || 0 }, (_, index) => index === 0)
);

// Watch for changes in `tab` and mark the tab as loaded
watch(() => props.tab, (newTab) => {
  if (!loaded.value[newTab]) {
    loaded.value = [...loaded.value];
    loaded.value[newTab] = true;
  }
});

// Ensure the first tab is marked as loaded on component mount
onMounted(() => {
  if (!loaded.value[props.tab]) {
    loaded.value[props.tab] = true;
  }
});

console.log(props.data);


</script>

<template>
  <div class="w-full h-full center relative">
    <template v-for="(project, index) in projects" :key="index">
      <iframe v-if="loaded[index]" loading="lazy" class="w-full h-full max-md:rounded-2xl" :hidden="tab !== index"
        :aria-hidden="tab !== index" :src="project.website" :title="`Project showcase: ${project.title}`" />
    </template>
  </div>
</template> -->
<!-- 
<script setup lang="ts">
import type { ProjectType } from "~/data/projects";

// Define props
const props = defineProps<{
  tab: number;
  data?: ProjectType[]; // Make data optional to avoid undefined errors
  hidden: boolean;
}>();

// Ensure data is always an array
const projects = props.data ?? [];

// Initialize loaded state safely
const loaded = ref(new Array(projects.length).fill(false));
if (projects.length > 0) loaded.value[0] = true; // Mark first project as loaded

// Watch tab changes
watch(() => props.tab, (newTab) => {
  if (!loaded.value[newTab] && projects[newTab]) {
    loaded.value[newTab] = true;
  }
});

// Ensure first tab is loaded on mount
onMounted(() => {
  if (projects.length > 0 && !loaded.value[props.tab]) {
    loaded.value[props.tab] = true;
  }
});

console.log("Projects Data:", projects);
</script>

<template>
  <div class="w-full h-full center relative">
    <template v-for="(project, index) in projects" :key="index">
      <iframe v-if="loaded[index]" loading="lazy" class="w-full h-full max-md:rounded-2xl"
        :title="`Project showcase: ${project.title}`" />
    </template>
  </div>
</template> -->



<script setup lang="ts">
const props = defineProps<{
  hidden: boolean;
}>();


import { projects } from '~/data/projects';
import useScreenStore from '~/store/use-screen-store';

const store = useScreenStore();
// TODO: single
const { previewApp } = storeToRefs(store);


const loaded = ref(projects.map((_, index) => index === 0));
// const state = useScreenStore().state;

// TODO:
const previewProjectIndex = useState<number>("previewProjectIndex");

watch(() => previewProjectIndex.value, (newTab) => {
  console.log('click');
  if (!loaded.value[newTab]) {
    loaded.value[newTab] = true;
  }
});
</script>

<template>
  <!-- <div class="w-full h-full center relative" :hidden="state.previewApp !== 3"> -->
  <div class="w-full h-full center relative" :style="{ display: hidden ? 'none' : 'flex' }">
    <template v-for="(project, index) in projects" :key="index">
      <iframe v-if="loaded[index]" class="w-full h-full max-md:rounded-2xl" :hidden="previewProjectIndex !== index"
        :aria-hidden="previewProjectIndex !== index" :src="project.website"
        :title="`Project showcase: ${project.title}`" loading="lazy" />
    </template>
  </div>
</template>
