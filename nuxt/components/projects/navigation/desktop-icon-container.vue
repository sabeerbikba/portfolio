<script setup lang="ts">
import {
  useTransform,
  useSpring,
  Motion as MotionV,
  type MotionValue,
} from "motion-v";
import { Motion } from "@oku-ui/motion";

const props = defineProps<{
  name: string;
  icon: string;
  isSelected: boolean;
  isHovered: boolean;
  mouseX: MotionValue<number>;
}>();

const iconRef = ref<HTMLDivElement | null>(null);
const hovered = ref<boolean>(false);
const isButtonVisible = computed(() => !props.isHovered && props.isSelected);
const tooltipId = computed<string>(() => `tooltip-${useSlugify(props.name)}`);

const viewType = computed<string>(() =>
  ["Website", "About", "Github"].includes(props.name) ? "app" : "project"
);

const distance = computed(() => {
  return useTransform(props.mouseX, (val) => {
    const bounds = iconRef.value?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
});

const widthTransform = useTransform(
  distance.value,
  [-150, 0, 150],
  [35, 70, 35]
);
const heightTransform = useTransform(
  distance.value,
  [-150, 0, 150],
  [35, 70, 35]
);
const widthIconTransform = useTransform(
  distance.value,
  [-150, 0, 150],
  [12, 24, 12]
);
const heightIconTransform = useTransform(
  distance.value,
  [-150, 0, 150],
  [12, 24, 12]
);

const width = useSpring(widthTransform, {
  mass: 0.1,
  stiffness: 150,
  damping: 12,
});
const height = useSpring(heightTransform, {
  mass: 0.1,
  stiffness: 150,
  damping: 12,
});
const widthIcon = useSpring(widthIconTransform, {
  mass: 0.1,
  stiffness: 150,
  damping: 12,
});
const heightIcon = useSpring(heightIconTransform, {
  mass: 0.1,
  stiffness: 150,
  damping: 12,
});

watchEffect(() => {
  if (props.isHovered) {
    width.set(widthTransform.get());
    height.set(heightTransform.get());
  } else {
    width.set(35);
    height.set(35);
  }
});
</script>

<template>
  <button
    ref="iconRef"
    type="button"
    :aria-describedby="tooltipId"
    :aria-current="isSelected ? 'page' : undefined"
    :aria-label="`Navigate to ${name} ${viewType}`"
    class="desktop-btn-base"
  >
    <MotionV
      :style="{ width, height }"
      :class="{
        'max-w-[35px] max-h-[35px]': !isHovered,
      }"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <Motion
        :id="tooltipId"
        as="div"
        role="tooltip"
        :initial="{ opacity: 0, y: 10, x: '-50%' }"
        :animate="
          hovered
            ? { opacity: 1, y: -10, x: '-50%' }
            : { opacity: 0, y: 2, x: '-50%' }
        "
        class="desktop-btn-tooltip"
      >
        {{ name }}
      </Motion>
      <Motion
        :class="{
          'desktop-btn-icon-base': true,
          'desktop-btn-icon-active': isButtonVisible,
        }"
        :style="{ width: `${widthIcon}px`, height: `${heightIcon}px` }"
      >
        <ProjectsNavigationBtnImg :icon="icon" :name="name" />
      </Motion>
      <div v-show="isButtonVisible" aria-hidden="true" class="center mt-0.5">
        <span class="desktop-btn-status-dot" />
      </div>
    </MotionV>
  </button>
</template>

<style>
.desktop-btn-base {
  @apply aspect-square rounded-xl bg-transparent;
}

.desktop-btn-tooltip {
  @apply absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs -z-50
    px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border border-gray-200
    text-neutral-700;
}

.desktop-btn-icon-base {
  @apply transition-all duration-300 ease-in-out center rounded-2xl;
}

.desktop-btn-icon-active {
  @apply shadow-[0_5px_12px_9px_rgba(0,0,0,0.3)] bg-[rgba(0,0,0,0.3)];
}

.desktop-btn-status-dot {
  @apply h-1 w-1 rounded-2xl bg-slate-500 mix-blend-color;
}
</style>
