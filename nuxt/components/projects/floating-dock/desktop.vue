<script setup lang="ts">
import { projects } from "~/data/projects";
import { apps } from "~/data/projects";
import { useMouse, useElementVisibility } from '@vueuse/core';
import { Motion } from '@oku-ui/motion';

defineProps({ hidden: Boolean });

import { storeToRefs } from 'pinia';
import useScreenStore from '~/store/use-screen-store';

const store = useScreenStore();
const { setScreen } = useScreenStore();
const { previewApp, previewProject, } = storeToRefs(store);

let timer: NodeJS.Timeout | null = null;
const inViewRef = ref(null);
// const mouse = useMouse();
const mouseX = ref(Infinity);
const isHovered = ref(false);
const isVisible = ref(true); // derault: false
// const isVisible = useState('isVisible'); // derault: false
const elementVisible = useElementVisibility(inViewRef);
const inView = computed(() => elementVisible.value);

/// const { state, setScreen } = useScreenStore();



watch([isHovered], ([hovered]) => {
  if (hovered) {
    isVisible.value = true;
    if (timer) {
      clearTimer();
      timer = null;
    }
  } else {
    startDelay()
  }
});

watch([inView], ([view]) => {
  if (view) {
    isVisible.value = true;
    startDelay();
  }
});

const clearTimer = () => {
  // console.log('3');
  if (timer) clearTimeout(timer);
  timer = null;
};

const startDelay = () => {
  // console.log('4');
  timer = setTimeout(() => {
    isVisible.value = false;
  }, 4000);
};

const setIsHovered = (value: boolean) => {
  // console.log('5');
  isHovered.value = value;
};

const handleMouseLeave = () => {
  // console.log('6');
  setIsHovered(false);
  mouseX.value = Infinity;
};

const handleMouseMove = (event: MouseEvent) => {
  // console.log('7');
  mouseX.value = event.pageX;
};

onUnmounted(() => clearTimer());

// watchEffect(() => console.log('isVisble', isVisible.value));
</script>

<template>
  <div class="w-full flex items-center absolute top-[34.87rem] z-10" :style="{ display: hidden ? 'none' : 'flex' }"
    v-if="!hidden">
    <Motion ref="inViewRef" @mouseenter="setIsHovered(true)" @mouseleave="handleMouseLeave" @mousemove="handleMouseMove"
      :animate="{
        height: isVisible ? '55px' : '5px',
        width: isVisible ? 'auto' : '120px',
        y: isVisible ? -58 : 0
      }"
      class="mx-auto gap-2 bg-[rgba(255,255,255,0.4)] w-auto m-auto rounded-lg px-2.5 inline-flex items-center border border-black">
      <!-- <template v-if="isVisible">
        <ProjectsFloatingDockDesktopIconContainer v-for="(item, id) in projects" :key="item.title" :mouseX="mouseX"
          v-bind="item" :isSelected="id + 1 === state.previewProject" :isHoverd="isHovered"
          @click="() => setScreen(id + 1, 'project')" />
        <div class="border-x-[1.9px] border-gray-700 rounded-2xl h-8"></div>
        <ProjectsFloatingDockDesktopIconContainer v-for="(item, id) in apps" :key="item.title" :mouseX="mouseX"
          v-bind="item" :isSelected="id + 1 + projects.length === state.previewApp" :isHoverd="isHovered"
          @click="() => setScreen(id + 1 + projects.length, 'app')" />
      </template> -->
      <template v-if="isVisible">
        <ProjectsFloatingDockDesktopIconContainer v-for="(item, id) in projects" :key="item.title" :mouseX="mouseX"
          v-bind="item" :isSelected="id + 1 === previewProject" :isHoverd="isHovered"
          @click="() => setScreen(id + 1, 'project')" />
        <div class="border-x-[1.9px] border-gray-700 rounded-2xl h-8"></div>
        <ProjectsFloatingDockDesktopIconContainer v-for="(item, id) in apps" :key="item.title" :mouseX="mouseX"
          v-bind="item" :isSelected="id + 1 + projects.length === previewApp" :isHoverd="isHovered"
          @click="() => setScreen(id + 1 + projects.length, 'app')" />
      </template>
    </Motion>
  </div>
</template>
