<!-- <script setup lang="ts">
  import { projects } from "~/data/projects";
  import { apps } from "~/data/projects";
import { ref, watch, computed } from "vue";
import { useMouse, useIntersectionObserver } from "@vueuse/core";

const hidden = ref(false); // Example, pass as a prop if needed
const inViewRef = ref<HTMLElement | null>(null);
const mouseX = ref(Infinity);
const isHovered = ref(false);
const isVisible = ref(false);


let timer: ReturnType<typeof setTimeout> | null = null;

// Detect if the element is in view
const { isIntersecting } = useIntersectionObserver(inViewRef, { threshold: 0.1 });

watch([isHovered, isIntersecting], ([hovered, intersecting]) => {
  if (hovered || intersecting) {
    isVisible.value = true;
    clearDelay();
  } else {
    delay();
  }
});

// Handle delay for visibility
function delay() {
  timer = setTimeout(() => {
    isVisible.value = false;
  }, 5000);
}

function clearDelay() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

// Track mouse position
const { x } = useMouse();
watch(x, (newX) => {
  if (isHovered.value) mouseX.value = newX;
  else mouseX.value = Infinity;
});

// Handle animations via CSS classes
const containerClasses = computed(() =>
  isVisible.value
    ? "visible-container"
    : "hidden-container"
);

</script>

<template>
  <div
    class="w-full flex items-center absolute top-[35.87rem] z-10"
    :style="{ display: hidden ? 'none' : 'flex' }"
    :hidden="hidden"
  >
    <div
      ref="inViewRef"
      @mouseenter="isHovered = true"
      @mouseleave="() => { isHovered = false; mouseX = Infinity; }"
      @mousemove="(e) => (mouseX = e.pageX)"
      :class="containerClasses"
    >
      <template v-if="isVisible">
        <template v-for="(item, id) in projects" :key="item.title">
          <IconContainer
            :mouseX="mouseX"
            v-bind="item"
            :isSelected="id + 1 === previewProjectNum"
            @click="() => screen(id + 1, 'project')"
            :isHoverd="isHovered"
          />
        </template>
        <div class="border-x-[1.9px] border-gray-700 rounded-2xl h-8"></div>
        <template v-for="(item, id) in apps" :key="item.title">
          <IconContainer
            :mouseX="mouseX"
            v-bind="item"
            :isSelected="id + 1 + projects.length === previewAppNum"
            @click="() => screen(id + 1 + projects.length, 'app')"
            :isHoverd="isHovered"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Motion styles using CSS classes */
.visible-container {
  height: 55px;
  width: auto;
  transform: translateY(-58px);
  opacity: 1;
  transition: all 0.3s ease-in-out;
}

.hidden-container {
  height: 5px;
  width: 120px;
  transform: translateY(0);
  opacity: 0;
  transition: all 0.3s ease-in-out;
}
</style> -->





<!-- <script setup lang="ts">
  import { projects } from "~/data/projects";
  import { apps } from "~/data/projects";

  defineProps({ hidden: { type: Boolean, required: true } });

  const dockRef = ref(null);
  const isHovered = ref(false);
  const { state, setScreen } = useScreenStore();

  const handleMouseLeave = () => {
    isHovered.value = false;
  };
</script>

<template>
  <div class="w-full flex items-center absolute top-[30.87rem] z-10" v-show="hidden">
    <div ref="dockRef" class="mx-auto gap-2 bg-white/40 w-auto m-auto rounded-lg px-2.5 inline-flex items-center"
      @mouseenter="isHovered = true" @mouseleave="handleMouseLeave">
      <ProjectsFloatingDockDesktopIconContainer v-for="(item, id) in projects" :key="item.title" :title="item.title"
        :icon="item.icon" :isSelected="state.previewProject === id + 1" @click="setScreen(id + 1, 'project')" />
      <div class="border-x-[1.9px] border-gray-700 rounded-2xl h-8"></div>
      <ProjectsFloatingDockDesktopIconContainer v-for="(item, id) in apps" :key="item.title" :title="item.title"
        :icon="item.icon" :isSelected="state.previewApp === id + 1 + projects.length"
        @click="setScreen(id + 1 + projects.length, 'app')" />
    </div>
  </div>
</template> -->

<script setup lang="ts">
import { projects } from "~/data/projects";
import { apps } from "~/data/projects";
import { useMouse, useElementVisibility } from '@vueuse/core';
import { motion } from 'framer-motion';

const props = defineProps({
  hidden: Boolean
});

const inViewRef = ref(null);
const mouse = useMouse();
const mouseX = ref(Infinity);
const isHovered = ref(false);
const isVisible = ref(false);
const timer = ref<NodeJS.Timeout | null>(null);
const inView = useElementVisibility(inViewRef, { once: false });

// Context replacements
// const { previewProject: previewProjectNum, previewApp: previewAppNum, setScreen } = useScreen();

const { state, setScreen } = useScreenStore();

watch([isHovered, inView], ([hovered, view]) => {
  if (hovered || view) {
    isVisible.value = true;
    clearTimer();
  } else {
    startDelay();
  }
});

const containerClasses = computed(() =>
  isVisible.value
    ? "visible-container"
    : "hidden-container"
);

function clearTimer() {
  if (timer.value) clearTimeout(timer.value);
  timer.value = null;
}

function startDelay() {
  timer.value = setTimeout(() => {
    isVisible.value = false;
  }, 5000);
}

function setIsHovered(value: boolean) {
  isHovered.value = value;
}

function handleMouseLeave() {
  setIsHovered(false);
  mouseX.value = Infinity;
}

function handleMouseMove(event: MouseEvent) {
  mouseX.value = event.pageX;
}
</script>

<template>
  <div class="w-full flex items-center absolute top-[35.87rem] z-10" :style="{ display: hidden ? 'none' : 'flex' }"
    v-if="!hidden">
    <div ref="inViewRef" @mouseenter="setIsHovered(true)" @mouseleave="handleMouseLeave" @mousemove="handleMouseMove"
      :animate="{
        height: isVisible ? '55px' : '5px',
        width: isVisible ? 'auto' : '120px',
        y: isVisible ? -58 : 0
      }" class="mx-auto gap-2 bg-[rgba(255,255,255,0.4)] w-auto m-auto rounded-lg px-2.5 inline-flex items-center"
      :class="containerClasses">
      <template v-if="isVisible">
        <ProjectsFloatingDockDesktopIconContainer v-for="(item, id) in projects" :key="item.title" :mouseX="mouseX"
          v-bind="item" :isSelected="id + 1 === state.previewProject" :isHoverd="isHovered"
          @click="() => setScreen(id + 1, 'project')" />
        <div class="border-x-[1.9px] border-gray-700 rounded-2xl h-8"></div>
        <ProjectsFloatingDockDesktopIconContainer v-for="(item, id) in apps" :key="item.title" :mouseX="mouseX"
          v-bind="item" :isSelected="id + 1 + projects.length === state.previewApp" :isHoverd="isHovered"
          @click="() => setScreen(id + 1 + projects.length, 'app')" />
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Motion styles using CSS classes */
.visible-container {
  height: 55px;
  width: auto;
  transform: translateY(-58px);
  opacity: 1;
  transition: all 0.3s ease-in-out;
}

.hidden-container {
  height: 5px;
  width: 120px;
  transform: translateY(0);
  opacity: 0;
  transition: all 0.3s ease-in-out;
}
</style>
