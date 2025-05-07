<script setup lang="ts">
import {
  MotionValue,
  useTransform,
  useSpring,
  Motion as MotionV,
} from "motion-v";
import { Motion } from "@oku-ui/motion";

const props = defineProps<{
  mouseX: MotionValue<number>;
  title: string;
  icon: string;
  isSelected: boolean;
  onClick: (event: MouseEvent) => void;
  isHovered: boolean;
}>();

const iconRef = ref<HTMLDivElement | null>(null);
const hovered = ref(false);
const isButtonVisible = computed(() => !props.isHovered && props.isSelected);

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
  <MotionV
    :style="{ width, height }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div
      ref="iconRef"
      class="aspect-square rounded-xl bg-transparent"
      @click="onClick && onClick($event)"
      role="button"
    >
      <Motion
        v-if="hovered"
        :initial="{ opacity: 0, y: 10, x: '-50%' }"
        :animate="{ opacity: 1, y: -10, x: '-50%' }"
        :exit="{ opacity: 0, y: 2, x: '-50%' }"
        class="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
      >
        {{ title }}
      </Motion>
      <Motion
        class="transition-all duration-300 ease-in-out center rounded-2xl"
        :class="{
          'shadow-[0_5px_12px_9px_rgba(0,0,0,0.3)] bg-[rgba(0,0,0,0.3)]':
            isButtonVisible,
        }"
        :style="{ width: `${widthIcon}px`, height: `${heightIcon}px` }"
      >
        <img
          :src="icon"
          alt="icon"
          width="100%"
          height="100%"
          loading="eager"
        />
      </Motion>
      <div v-if="isButtonVisible" class="center mt-0.5">
        <span class="h-1 w-1 rounded-2xl bg-slate-500 mix-blend-color" />
      </div>
    </div>
  </MotionV>
</template>
