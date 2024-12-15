<script setup>
import { hierarchy, pack } from "d3-hierarchy";

// TODO: is computed function needed anywhere
const props = defineProps({
  tools: {
    type: Array,
    required: true,
  },
});

const containerWidth = ref(800);
const width = ref(containerWidth.value);

const updateWidth = () => {
  width.value = Math.min(window.innerWidth, containerWidth.value);
};

onMounted(() => {
  window.addEventListener("resize", updateWidth);
  updateWidth();
});

watch(width, () => {
  calculateRoot();
});

let root = ref(null);
const circles = ref([]);

const calculateRoot = () => {
  const rootNode = hierarchy({
    children: props.tools,
    name: "root",
    radius: 0,
    distance: 0,
  })
    .sum((d) => d.proficiency || 1)
    .sort((a, b) => (b.data.proficiency || 0) - (a.data.proficiency || 0));

  root.value = pack()
    .size([width.value, width.value])
    .padding(width.value * 0.005)(rootNode);

  circles.value = root.value
    .descendants()
    .slice(1)
    .map((node) => ({
      x: node.x,
      y: node.y,
      r: node.r,
      data: node.data,
    }));
};

calculateRoot();

const getTooltipClasses = (x, y) => {
  const tooltipX = x > width.value / 2 ? "left" : "right";
  const tooltipY = y > width.value / 2 ? "top" : "bottom";

  return [
    tooltipX === "left"
      ? "left-1/4 -translate-x-full"
      : "right-1/4 translate-x-full",
    tooltipY === "top"
      ? "top-1/4 -translate-y-full"
      : "bottom-1/4 translate-y-full",
  ];
};
</script>

<template>
  <div class="max-w-[800px] mx-auto aspect-square text-2xl max-xs:-mt-4 max-sm:-mt-3 max-md:-mt-2">
    <div v-if="width > 10" :style="{
      width: width + 'px',
      height: width + 'px',
      // width: '100%',
      // height: '100%',
      position: 'relative',
    }">
      <div v-for="(circle, i) in circles" :key="`circle-${i}`"
        class="spon-link absolute shadow-lg bg-white rounded-full z-0 border-[0.5px]" :style="{
          left: `${circle.x - circle.r}px`,
          top: `${circle.y - circle.r}px`,
          width: `${circle.r * 2}px`,
          height: `${circle.r * 2}px`,
        }">
        <div v-if="circle.data.imageUrl.startsWith('<svg')"
          class="absolute bg-no-repeat bg-center bg-contain rounded-full w-[95%] h-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          v-html="circle.data.imageUrl" />
        <div v-else="circle.data.imageUrl"
          class="absolute bg-no-repeat bg-center bg-contain rounded-full w-[95%] h-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          :style="{ backgroundImage: `url(${circle.data.imageUrl})` }" />
        <div
          class="spon-tooltip absolute z-50 text-sm bg-gray-800 text-white p-2 pointer-events-none transform opacity-0 shadow-xl rounded-lg flex flex-col items-center"
          :class="getTooltipClasses(circle.x, circle.y)">
          <p class="whitespace-nowrap font-bold z-20 relative">
            {{ circle.data.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spon-tooltip {
  transition: opacity 0.3s ease;
}

.spon-link:hover .spon-tooltip {
  opacity: 1;
}
</style>
