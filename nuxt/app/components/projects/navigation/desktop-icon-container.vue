<script setup lang="ts">
import { Motion as MotionV, type MotionValue } from "motion-v";
import { Motion } from "@oku-ui/motion";
import { apps } from "~/content/projects";

const { name, isSelected, isHovered, mouseX } = defineProps<{
  to: string;
  name: string;
  icon: string;
  isSelected: boolean;
  isHovered: boolean;
  mouseX: MotionValue<number>;
}>();

const { isTouch } = useCustomPointer();

const hovered = ref(false);
const showTabletTooltip = ref(false);

const iconRef = useTemplateRef("iconRef");
const isIconShadowAndDotVisible = computed(() =>
  isTouch.value ? isSelected : !isHovered && isSelected
);

watch(
  () => isSelected,
  (condtion) => {
    if (condtion && isTouch.value) {
      showTabletTooltip.value = true;
      useTimeoutFn(
        () => {
          showTabletTooltip.value = false;
        },
        2500,
        { immediate: true }
      );
    }
  }
);

const tooltipId = computed(() => `tooltip-${useSlugify(name)}`);

const showTooltipAnimation = computed(() =>
  isTouch.value
    ? isIconShadowAndDotVisible.value && showTabletTooltip.value
    : hovered.value
);

const viewType = computed(() =>
  apps.map((app) => app.name).includes(name) ? "app" : "project"
);

const distance = computed(() => {
  return useTransform(mouseX, (val) => {
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
  if (isHovered) {
    width.set(widthTransform.get());
    height.set(heightTransform.get());
  } else {
    width.set(35);
    height.set(35);
  }
});
</script>

<template>
  <li ref="iconRef" class="desktop-btn-base">
    <NuxtLink
      :to
      :aria-describedby="tooltipId"
      :aria-current="isSelected ? 'page' : undefined"
      :aria-label="`Navigate to ${name} ${viewType}`"
    >
      <MotionV
        as="span"
        :style="{ width, height }"
        :class="{
          block: true,
          'max-w-[35px] max-h-[35px]': !isHovered && !isTouch,
          '!max-w-[35px] !max-h-[35px]': isTouch,
        }"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
      >
        <Motion
          as="span"
          :id="tooltipId"
          role="tooltip"
          :initial="{ opacity: 0, y: 10, x: '-50%' }"
          :animate="
            showTooltipAnimation
              ? { opacity: 1, y: -10, x: '-50%' }
              : { opacity: 0, y: 2, x: '-50%' }
          "
          :exit="isTouch ? { opacity: 0, y: 10, x: '-50%' } : undefined"
          class="desktop-btn-tooltip"
        >
          {{ name }}
        </Motion>
        <Motion
          as="span"
          :class="{
            'desktop-btn-icon-base': true,
            'desktop-btn-icon-active': isIconShadowAndDotVisible,
          }"
          :style="{ width: `${widthIcon}px`, height: `${heightIcon}px` }"
        >
          <ProjectsNavigationBtnImg :src="icon" />
        </Motion>

        <span
          v-show="isIconShadowAndDotVisible"
          aria-hidden="true"
          class="center mt-0.5"
        >
          <span class="desktop-btn-status-dot" />
        </span>
      </MotionV>
    </NuxtLink>
  </li>
</template>
