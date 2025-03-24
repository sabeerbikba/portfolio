<script setup lang="ts">
import { MotionValue, useTransform, Motion as MotionV, useSpring } from 'motion-v';
import { Motion } from '@oku-ui/motion';

// TODO: when hovering one desktip dock see error in console 

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
const isButtonSelected = computed(() => !props.isHovered && props.isSelected);

const distance = computed(() => {
  return useTransform(props.mouseX, (val) => {
    const bounds = iconRef.value?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
});

const widthTransform = computed(() => useTransform(distance.value, [-150, 0, 150], [35, 70, 35]));
const heightTransform = computed(() => useTransform(distance.value, [-150, 0, 150], [35, 70, 35]));
const widthIconTransform = computed(() => useTransform(distance.value, [-150, 0, 150], [12, 24, 12]));
const heightIconTransform = computed(() => useTransform(distance.value, [-150, 0, 150], [12, 24, 12]));

const width = useSpring(widthTransform.value, { mass: 0.1, stiffness: 150, damping: 12 });
const height = useSpring(heightTransform.value, { mass: 0.1, stiffness: 150, damping: 12 });
const widthIcon = useSpring(widthIconTransform.value, { mass: 0.1, stiffness: 150, damping: 12 });
const heightIcon = useSpring(heightIconTransform.value, { mass: 0.1, stiffness: 150, damping: 12 });


watchEffect(() => {
  if (props.isHovered) {
    width.set(widthTransform.value.get());
    height.set(heightTransform.value.get());
  } else {
    width.set(35);
    height.set(35);
  }
});
</script>

<template>
  <MotionV :style="{ width, height }" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <div ref="iconRef" class="aspect-square rounded-xl bg-transparent" @click="onClick && onClick($event)"
      role="button">
      <Motion v-if="hovered" :initial="{ opacity: 0, y: 10, x: '-50%' }" :animate="{ opacity: 1, y: -10, x: '-50%' }"
        :exit="{ opacity: 0, y: 2, x: '-50%' }"
        class="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs">
        {{ title }}
      </Motion>
      <Motion class="icon-box" :class="{ 'dock-hover': isButtonSelected }"
        :style="{ width: `${widthIcon}px`, height: `${heightIcon}px` }">
        <img :src="icon" alt="icon" width="100%" height="100%" />
      </Motion>
      <div v-if="isButtonSelected" class="center mt-0.5">
        <span class="h-1 w-1 rounded-2xl bg-slate-500 mix-blend-color" />
      </div>
    </div>
  </MotionV>
</template>



<style>
/* TODO: remove styles and use tailwindcss */
.icon-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  transition: all 0.3s ease;
  /* width: 35px;
  height: 35px; */
}

.icon-box.dock-hover {
  box-shadow: 0 5px 12px 9px rgba(0, 0, 0, 0.3);
  background: rgba(0, 0, 0, 0.3);
}
</style>
