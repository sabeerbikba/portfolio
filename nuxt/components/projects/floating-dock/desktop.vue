<script setup lang="ts">
import { useElementVisibility } from "@vueuse/core";
import { Motion } from "@oku-ui/motion";
import { projects, apps } from "~/data/projects";
import { useMotionValue } from "motion-v";
import type { ScreenStoreType } from "~/types/store";

const store = inject("store") as ScreenStoreType;

let timer: NodeJS.Timeout | null = null;
const inViewRef = ref<HTMLDivElement | null>(null);
const mouseX = useMotionValue<number>(Infinity);
const isHovered = ref<boolean>(false);
const isVisible = ref<boolean>(false);
const elementVisible: Ref<boolean> = useElementVisibility(inViewRef);
const inView = computed<boolean>(() => elementVisible.value);

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
};

const handleMouseMove = (event: MouseEvent) => {
  mouseX.set(event.pageX);
};

onUnmounted(() => clearTimer());
</script>

<template>
  <div
    role="navigation"
    aria-label="Desktop projects navigation"
    class="w-full flex items-center absolute top-[35.50rem] z-10"
  >
    <Motion
      as="div"
      ref="inViewRef"
      aria-hidden="false"
      @mouseenter="setIsHovered(true)"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
      :animate="{
        height: isVisible ? '55px' : '5px',
        width: isVisible ? 'auto' : '120px',
        y: isVisible ? -58 : 0,
      }"
      class="max-w-80 mx-auto gap-2 bg-[rgba(255,255,255,0.4)] w-auto m-auto rounded-lg inline-flex items-center"
    >
      <div
        v-show="isVisible"
        role="group"
        aria-label="Navigation Items"
        class="max-w-80 mx-auto gap-2 w-auto rounded-lg px-2.5 inline-flex items-center"
      >
        <ProjectsFloatingDockDesktopIconContainer
          v-for="({ name, icon }, id) in projects"
          :aria-current="id + 1 === store.state.previewProject ? 'page' : null"
          :key="name"
          :mouseX="mouseX"
          :title="name"
          :icon="icon"
          :isSelected="id + 1 === store.state.previewProject"
          :isHovered="isHovered"
          @click="
            () => store.dispatch({ type: 'TOGGLE_PROJECT', payload: id + 1 })
          "
        />
        <div
          role="separator"
          aria-orientation="vertical"
          aria-hidden="true"
          class="border-x-[1.9px] border-gray-700 rounded-2xl h-8"
        />
        <ProjectsFloatingDockDesktopIconContainer
          v-for="({ name, icon }, id) in apps"
          :aria-current="
            id + 1 + projects.length === store.state.previewApp ? 'page' : null
          "
          :key="name"
          :mouseX="mouseX"
          :title="name"
          :icon="icon"
          :isSelected="id + 1 + projects.length === store.state.previewApp"
          :isHovered="isHovered"
          @click="
            () =>
              store.dispatch({
                type: 'TOGGLE_APP',
                payload: id + 1 + projects.length,
              })
          "
        />
      </div>
    </Motion>
  </div>
</template>
