<template>
  <ParentSize v-slot="{ width = 800 }">
    <div
      v-if="width >= 10"
      :style="{
        width: `${width}px`,
        height: `${width}px`,
        position: 'relative',
      }"
    >
      <div
        v-for="(circle, i) in circles"
        :key="'circle-' + i"
        class="spon-link absolute shadow-lg bg-white rounded-full z-0 border-[0.5px]"
        :style="{
          left: `${circle.x}px`,
          top: `${circle.y}px`,
          width: `${circle.r * 2}px`,
          height: `${circle.r * 2}px`,
        }"
      >
        <div
          v-if="typeof circle.data.imageUrl === 'string'"
          :key="'circle-img-' + i"
          class="absolute bg-no-repeat bg-center bg-contain rounded-full w-[95%] h-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          :style="{ backgroundImage: `url(${circle.data.imageUrl})` }"
        />

        <div v-else>
          {{ circle.data.imageUrl }}
        </div>

        <div
          :class="[
            'spon-tooltip absolute z-50 text-sm bg-gray-800 text-white p-2 pointer-events-none transform opacity-0 shadow-xl rounded-lg flex flex-col items-center',
            circle.tooltipX === 'left'
              ? 'left-1/4 -translate-x-full'
              : 'right-1/4 translate-x-full',
            circle.tooltipY === 'top'
              ? 'top-1/4 -translate-y-full'
              : 'bottom-1/4 translate-y-full',
          ]"
        >
          <p class="whitespace-nowrap font-bold z-20 relative">
            {{ circle.data.name }}
          </p>
        </div>
      </div>
    </div>
  </ParentSize>
</template>

<script setup>
import { computed, reactive } from "vue";
import { hierarchy } from "d3-hierarchy";
import ParentSize from "@visx/responsive/ParentSize";

import { cn } from "@/lib/utils";

// Props
defineProps({
  tools: {
    type: Array,
    required: true,
  },
});

// Data preparation
const pack = reactive({
  children: tools,
  name: "root",
  radius: 0,
  distance: 0,
});

const root = computed(() =>
  hierarchy(pack)
    .sum((d) => d.proficiency || 1)
    .sort((a, b) => (b.data.proficiency ?? 0) - (a.data.proficiency ?? 0))
);

const circles = computed(() => {
  const descendants = root.value.descendants().slice(1);
  return descendants.map((node) => {
    const { x, y, r, data } = node;
    return {
      x,
      y,
      r,
      data,
      tooltipX: x > 400 ? "left" : "right", // Assuming `width / 2` = 400
      tooltipY: y > 400 ? "top" : "bottom",
    };
  });
});
</script>

<style scoped>
.spon-link {
  transition: transform 0.3s ease;
}

.spon-tooltip {
  visibility: hidden;
}

.spon-link:hover .spon-tooltip {
  visibility: visible;
  opacity: 1;
}
</style>
