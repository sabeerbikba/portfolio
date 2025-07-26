<script setup lang="ts">
import { Motion } from "@oku-ui/motion";
import { projects, apps, iconsName } from "~/content/projects";
import { useMotionValue } from "motion-v";
import type { ScreenStoreType } from "~~/types/store";

// Inspiration URL: https://ui.aceternity.com/components/floating-dock
// Source URL: https://inspira-ui.com/docs/components/miscellaneous/dock

type TabState = Ref<{ focused: boolean; tabClicked: boolean }>;

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
const { isTouch } = useCustomPointer();

const isFocusedOnDesktopNavBtnByClick = ref(false);
const { getLinkForProject, getLinkForApp } = useProjectAppLinks(store);
const { width: windowWidth } = useWindowSize({ initialWidth: 760 });
const isMobileNavVisible = computed(() => windowWidth.value <= 768.9);
const focusedBtns = ref(Array(projects.length + apps.length).fill(false));
const [isHeroCotBtn, isProjectsAbout, isProjectsGithub, isProjectsWebsite] =
  useTabState([
    "is-hero-cot-btn",
    "is-projects-about",
    "is-projects-github",
    "is-projects-website",
  ]);

// const tabAndFocusState = useTabState([
//   "is-hero-cot-btn",
//   "is-projects-about",
//   "is-projects-github",
//   "is-projects-website",
// ]);

// console.log(tabAndFocusState);

const clearTimer = () => {
  if (timer) clearTimeout(timer);
  timer = null;
};

const clearIf = (refVal: TabState) => {
  if (
    // something problem here
    Object.values(refVal.value).every(
      (v) => v === true || refVal.value.tabClicked
    )
  ) {
    refVal.value.focused = false;
    refVal.value.tabClicked = false;
  }
};

const startDelay = () => {
  console.log("start dleya");
  clearTimer();
  timer = setTimeout(() => {
    if (!isHovered.value && focusedBtns.value.every((v) => v === false)) {
      console.log("passe");
      // isVisible.value = isTouch.value ? true : false;
      isFocusedOnDesktopNavBtnByClick.value = false;
      clearTimer();

      // tabAndFocusState.forEach((tab) => {
      //   console.log("tabs");
      //   if (!tab.value.focused || !tab.value.tabClicked) {
      //     console.log("tabs pass");
      //     tab.value.focused = false;
      //     tab.value.tabClicked = false;
      //   }
      // });

      clearIf(isHeroCotBtn);
      clearIf(isProjectsAbout);
      clearIf(isProjectsGithub);
      clearIf(isProjectsWebsite);
    }
  }, DEFAULT_CLOSE_TIME);
};

watch(isHovered, (hovered) => {
  if (hovered) {
    useBlurAll();
    isVisible.value = true;
    clearTimer();
  } else {
    startDelay();
  }
});

watch([inView, isTouch], ([view, pointerChnaged]) => {
  if (view && !isVisible.value) {
    isVisible.value = true;
    startDelay();
  }

  if (!pointerChnaged) {
    isVisible.value = true;
    startDelay();
  }
});

const startDelayIf = (refVal: TabState) => {
  watch(
    refVal,
    (val) => {
      if (val === undefined) {
        console.log(val);
      }
      if (
        Object.values(val).every((v) => v === true || val.tabClicked) &&
        !isMobileNavVisible.value
      ) {
        isVisible.value = true;
        startDelay();
      }
    },
    { deep: true }
  );
};

startDelayIf(isHeroCotBtn);
startDelayIf(isProjectsAbout);
startDelayIf(isProjectsGithub);
startDelayIf(isProjectsWebsite);

// const startDelayIf = (refVal: Ref<TabState>) => {
//   watch(
//     refVal,
//     (val) => {
//       if (
//         val &&
//         Object.values(val).every((v) => v === true || val.tabClicked) &&
//         !isMobileNavVisible.value
//       ) {
//         isVisible.value = true;
//         startDelay();
//       }
//     },
//     { deep: true }
//   );
// };

// tabAndFocusState.forEach(startDelayIf);

// watch(
//   tabAndFocusState,
//   (vals) => {
//     const allTrueOrClicked = vals.every((val) =>
//       Object.values(val).every((v) => v === true || val.tabClicked)
//     );

//     if (allTrueOrClicked && !isMobileNavVisible.value) {
//       isVisible.value = true;
//       startDelay();
//     }
//   },
//   { deep: true }
// );

// watch(
//   () => tabAndFocusState.map((ref) => ref.value),
//   (vals) => {
//     const allTrueOrClicked = vals.every((val) =>
//       Object.values(val).every((v) => v === true || val.tabClicked)
//     );

//     if (allTrueOrClicked && !isMobileNavVisible.value) {
//       isVisible.value = true;
//       startDelay();
//     }
//   },
//   { deep: true }
// );

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
        focusedBtns.value[id] = true;
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
  focusedBtns.value[id] = false;
  useTimeoutFn(
    () => {
      if (focusedBtns.value.every((v) => v === false)) {
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
      :class="[
        'max-w-80 mx-auto gap-2 w-auto m-auto rounded-lg inline-flex items-center',
        isVisible ? 'glass-specular bg-white/20' : 'bg-white/40',
      ]"
      @mouseenter="setIsHovered(true)"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
    >
      <nav v-show="isVisible" class="mt-1">
        <ul
          class="max-w-80 mx-auto gap-2 w-auto rounded-lg px-2.5 inline-flex items-center list-none"
        >
          <ProjectsNavigationDesktopIconContainer
            v-for="({ name, icon }, id) in projects"
            :key="name"
            :to="getLinkForProject(id)"
            :mouseX
            :name
            :icon
            :is-selected="id === store.state.previewProject"
            :isHovered
            @focusin="handleFocusIn(id)"
            @focusout="handleFocusOut(id)"
          />
          <div
            role="separator"
            aria-orientation="vertical"
            aria-hidden="true"
            class="border-x-[1.9px] border-white/40 rounded-2xl h-8"
          />
          <ProjectsNavigationDesktopIconContainer
            v-for="({ name, icon }, id) in apps"
            :key="name"
            :to="getLinkForApp(id)"
            :mouseX
            :name
            :icon
            :is-selected="id === store.state.previewApp"
            :isHovered
            @focusin="handleFocusIn(id + projects.length)"
            @focusout="handleFocusOut(id + projects.length)"
          />
        </ul>
      </nav>
    </Motion>
  </div>
</template>
