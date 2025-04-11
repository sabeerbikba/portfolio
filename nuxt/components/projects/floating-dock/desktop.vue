<script setup lang="ts">
import { projects } from "~/data/projects";
import { apps } from "~/data/projects";
import { useElementVisibility } from "@vueuse/core";
import { Motion } from "@oku-ui/motion";
import { useMotionValue } from "motion-v";

defineProps({ hidden: Boolean });

import { storeToRefs } from "pinia";
import useScreenStore from "~/store/use-screen-store";

const store = useScreenStore();
const { setScreen } = useScreenStore();
const { previewApp, previewProject } = storeToRefs(store);

let timer: NodeJS.Timeout | null = null;
const inViewRef = ref(null);
const mouseX = useMotionValue(Infinity);
// const mouseX = useMotionValue(0)
const isHovered = ref(false);
const isVisible = ref(false);
const elementVisible = useElementVisibility(inViewRef);
const inView = computed(() => elementVisible.value);

watch([isHovered], ([hovered]) => {
  if (hovered) {
    isVisible.value = true;
    if (timer) {
      clearTimer();
      timer = null;
    }
  } else {
    startDelay();
  }
});

watch([inView], ([view]) => {
  if (view) {
    isVisible.value = true;
    startDelay();
  }
});

const clearTimer = () => {
  if (timer) clearTimeout(timer);
  timer = null;
};

const startDelay = () => {
  timer = setTimeout(() => {
    if (!isHovered.value) {
      isVisible.value = false;
    }
  }, 4000);
};

const setIsHovered = (value: boolean) => {
  isHovered.value = value;
};

const handleMouseLeave = () => {
  setIsHovered(false);
  mouseX.set(Infinity);
  // mouseX.set(0);
};

const handleMouseMove = (event: MouseEvent) => {
  mouseX.set(event.pageX);
  // mouseX.set(event.clientX); // Use clientX instead of pageX for better accuracy
};

onUnmounted(() => clearTimer());
</script>

<template>
  <div
    class="w-full flex items-center absolute top-[35.50rem] z-10"
    :style="{ display: hidden ? 'none' : 'flex' }"
    v-if="!hidden"
  >
    <Motion
      as="div"
      ref="inViewRef"
      @mouseenter="setIsHovered(true)"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
      :animate="{
        height: isVisible ? '55px' : '5px',
        width: isVisible ? 'auto' : '120px',
        y: isVisible ? -58 : 0,
      }"
      class="max-w-80 mx-auto gap-2 bg-[rgba(255,255,255,0.4)] w-auto m-auto rounded-lg px-2.5 inline-flex items-center"
    >
      <template v-if="isVisible">
        <ProjectsFloatingDockDesktopIconContainer
          v-for="(item, id) in projects"
          :key="item.title"
          :mouseX="mouseX"
          :title="item.title"
          :icon="item.icon"
          :isSelected="id + 1 === previewProject"
          :isHovered="isHovered"
          @click="() => setScreen(id + 1, 'project')"
        />
        <div class="border-x-[1.9px] border-gray-700 rounded-2xl h-8"></div>
        <ProjectsFloatingDockDesktopIconContainer
          v-for="(item, id) in apps"
          :key="item.title"
          :mouseX="mouseX"
          :title="item.title"
          :icon="item.icon"
          :isSelected="id + 1 + projects.length === previewApp"
          :isHovered="isHovered"
          @click="() => setScreen(id + 1 + projects.length, 'app')"
        />
      </template>
    </Motion>
  </div>
</template>
