<script setup lang="ts">
import { Motion } from "@oku-ui/motion";
import { projects, apps } from "~/data/projects";
import { useMotionValue } from "motion-v";
import type { ScreenStoreType } from "~/types/store";

// Inspiration URL: https://ui.aceternity.com/components/floating-dock
// Source URL: https://inspira-ui.com/docs/components/miscellaneous/dock

const store = inject("store") as ScreenStoreType;
const DEFAULT_CLOSE_TIME = 4000; //ms

/*
⚠️ Warning: Fragile logic — depends on timing/events — change only when implementing actual feature work

If anything changes, verify the following:
- If hovered, don't close the nav bar until hover is lost — after losing hover, close it after DEFAULT_CLOSE_TIME
- If the nav bar is in the viewport and not hovered, close it after DEFAULT_CLOSE_TIME
- When the nav bar becomes visible in the viewport, ensure it opens — also test quickly entering and exiting
 the viewport to see if it closes instantly or after DEFAULT_CLOSE_TIME. Need to close after DEFAULT_CLOSE_TIME
- If the nav bar is focused (without clicking), it shouldn't close — only close it DEFAULT_CLOSE_TIME after
 focus is lost
*/

let timer: NodeJS.Timeout | null = null;
const isHovered = ref(false);
const isVisible = ref(false);
const inViewRef = useTemplateRef("inViewRef");
const inView = useElementVisibility(inViewRef);
const mouseX = useMotionValue<number>(Infinity);

const isFocusedOnDesktopNavBtnByClick = ref(false);
const focusedButton = ref(Array(projects.length + apps.length).fill(false));
const isHeroCotBtn = useState("is-hero-cot-btn", () => ({
  focused: false,
  tabClicked: false,
}));

const clearTimer = () => {
  if (timer) clearTimeout(timer);
  timer = null;
};

const startDelay = () => {
  clearTimer();
  timer = setTimeout(() => {
    if (!isHovered.value && focusedButton.value.every((v) => v === false)) {
      isVisible.value = false;
      isFocusedOnDesktopNavBtnByClick.value = false;
      clearTimer();
      if (Object.values(isHeroCotBtn.value).every((v) => v === true)) {
        isHeroCotBtn.value.focused = false;
        isHeroCotBtn.value.tabClicked = false;
        console.log("resest");
      }
    }
  }, DEFAULT_CLOSE_TIME);
};

watch(isHovered, (hovered) => {
  if (hovered) {
    isVisible.value = true;
    clearTimer();
  } else {
    startDelay();
  }
});

watch(inView, (view) => {
  if (view && !isVisible.value) {
    isVisible.value = true;
    startDelay();
  }
});

watch(
  isHeroCotBtn,
  (val) => {
    if (Object.values(val).every((v) => v === true || val.tabClicked)) {
      isVisible.value = true;
      startDelay();
    }
  },
  { deep: true }
);

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

const handleFocusIn = (id: number) => {
  useTimeoutFn(
    () => {
      if (!isFocusedOnDesktopNavBtnByClick.value) {
        focusedButton.value[id] = true;
      }
    },
    120,
    { immediate: true }
  );
};

watch(isFocusedOnDesktopNavBtnByClick, () => {
  useTimeoutFn(
    () => {
      if (isFocusedOnDesktopNavBtnByClick.value) {
        isFocusedOnDesktopNavBtnByClick.value = false;
      }
    },
    170,
    { immediate: true }
  );
});

const handleFocusOut = (id: number) => {
  focusedButton.value[id] = false;
  useTimeoutFn(
    () => {
      if (focusedButton.value.every((v) => v === false)) {
        startDelay();
      }
    },
    50,
    { immediate: true }
  );
};

onUnmounted(() => {
  clearTimer();
});
</script>

<template>
  <div
    role="navigation"
    aria-label="Desktop projects navigation"
    class="w-full flex items-center absolute top-[35.50rem] z-50"
    @click="isFocusedOnDesktopNavBtnByClick = true"
  >
    <Motion
      ref="inViewRef"
      as="div"
      aria-hidden="false"
      :animate="{
        height: isVisible ? '55px' : '5px',
        width: isVisible ? 'auto' : '120px',
        y: isVisible ? -58 : 0,
      }"
      class="max-w-80 mx-auto gap-2 bg-[rgba(255,255,255,0.4)] w-auto m-auto rounded-lg inline-flex items-center"
      @mouseenter="setIsHovered(true)"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
    >
      <div
        v-show="isVisible"
        role="group"
        aria-label="Navigation Items"
        class="max-w-80 mx-auto gap-2 w-auto rounded-lg px-2.5 inline-flex items-center"
      >
        <ProjectsNavigationDesktopIconContainer
          v-for="({ name, icon }, id) in projects"
          :key="name"
          :mouse-x="mouseX"
          :name="name"
          :icon="icon"
          :is-selected="id === store.state.previewProject"
          :is-hovered="isHovered"
          @focusin="handleFocusIn(id)"
          @focusout="handleFocusOut(id)"
          @click="store.dispatch({ type: 'TOGGLE_PROJECT', payload: id })"
        />
        <div
          role="separator"
          aria-orientation="vertical"
          aria-hidden="true"
          class="border-x-[1.9px] border-gray-700 rounded-2xl h-8"
        />
        <ProjectsNavigationDesktopIconContainer
          v-for="({ name, icon }, id) in apps"
          :key="name"
          :mouse-x="mouseX"
          :name="name"
          :icon="icon"
          :is-selected="id + projects.length === store.state.previewApp"
          :is-hovered="isHovered"
          @focusin="handleFocusIn(id + projects.length)"
          @focusout="handleFocusOut(id + projects.length)"
          @click="
            store.dispatch({
              type: 'TOGGLE_APP',
              payload: id + projects.length,
            })
          "
        />
      </div>
    </Motion>
  </div>
</template>
