<script setup lang="ts">
import {
  useWindowSize,
  useScroll,
  useElementBounding,
  useMediaQuery,
} from "@vueuse/core";

// Inspiration URL: https://ui.aceternity.com/components/container-scroll-animation
// Source URL: https://inspira-ui.com/components/miscellaneous/container-scroll

const containerRef = ref<HTMLDivElement | null>(null);
const isMobile = useMediaQuery("(max-width: 768px)", { ssrWidth: 200 });
const { height } = useWindowSize();
const { y: scrollY } = useScroll(window);
const { bottom } = useElementBounding(containerRef);

const rotate = computed(() => 20 * (1 - scrollYProgress.value));
const translateY = computed(() => -100 * scrollYProgress.value);
const scrollYProgress = computed(() => {
  if (!bottom.value) return 0;
  return 1 - Math.max(0, bottom.value - scrollY.value) / height.value;
});
const scaleDimensions = computed(() =>
  isMobile.value ? [0.7, 0.9] : [1.05, 1]
);
const scale = computed(() => {
  const [start, end] = scaleDimensions.value;
  return start + (end - start) * scrollYProgress.value;
});
</script>

<template>
  <div
    ref="containerRef"
    class="relative center h-[60rem] p-2 md:h-[80rem] md:p-20"
  >
    <div class="relative w-full py-10 md:py-40" style="perspective: 1000px">
      <div
        :style="{ transform: `translateY(${translateY}px)` }"
        class="mx-auto max-w-5xl text-center"
      >
        <slot name="title" />
      </div>
      <div
        :style="{
          transform: `rotateX(${rotate}deg) scale(${scale})`,
          boxShadow:
            '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
        }"
        class="mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl md:h-[40rem] md:p-6"
      >
        <div
          class="size-full overflow-hidden rounded-2xl bg-gray-100 md:rounded-2xl dark:bg-zinc-900"
        >
          <slot name="screen" />
        </div>
      </div>
    </div>
  </div>
</template>
