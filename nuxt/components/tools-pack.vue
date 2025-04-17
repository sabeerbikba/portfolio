<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { hierarchy, pack } from "d3-hierarchy";
import type { HierarchyCircularNode } from "d3-hierarchy";
import type { ToolsType } from "~/data/tools";

const props = defineProps<{
  tools: ToolsType[];
}>();

type CircleData = {
  x: number;
  y: number;
  r: number;
  data: ToolsType;
};

const container = ref<HTMLElement | null>(null);
const width = ref(0);

const circles = ref<CircleData[]>([]);
let root = ref<HierarchyCircularNode<any> | null>(null);

const updateWidth = () => {
  if (container.value) {
    width.value = container.value.clientWidth;
  }
};

const calculateRoot = () => {
  const rootNode = hierarchy<{ children: ToolsType[]; name: string }>({
    children: props.tools,
    name: "root",
  })
    .sum((d: any) => d.proficiency || 1)
    .sort(
      (a: any, b: any) => (b.data.proficiency || 0) - (a.data.proficiency || 0)
    );

  root.value = pack()
    .size([width.value, width.value])
    .padding(width.value * 0.005)(rootNode as HierarchyCircularNode<unknown>);

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

const getTooltipClasses = (x: number, y: number): string[] => {
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

watch(width, calculateRoot);

onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});
</script>

<template>
  <div class="max-w-[800px] mx-auto aspect-square" ref="container">
    <div v-if="width > 10" class="w-full h-full relative">
      <div
        v-for="(circle, i) in circles"
        :key="`circle-${i}`"
        class="transition-all duration-200 ease-in-out will-change-transform group hover:scale-110 hover:z-10 absolute shadow-lg bg-white rounded-full z-0 border-[0.5px]"
        :style="{
          left: `${circle.x - circle.r}px`,
          top: `${circle.y - circle.r}px`,
          width: `${circle.r * 2}px`,
          height: `${circle.r * 2}px`,
        }"
      >
        <div
          v-if="circle.data.imageUrl.startsWith('<svg')"
          class="absolute bg-no-repeat bg-center bg-contain rounded-full w-[95%] h-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          v-html="circle.data.imageUrl"
        />
        <div
          v-else
          class="absolute bg-no-repeat bg-center bg-contain rounded-full w-[95%] h-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          :style="{ backgroundImage: `url(${circle.data.imageUrl})` }"
        />
        <div
          class="transition-opacity duration-300 ease-in-out absolute z-50 text-sm bg-gray-800 text-white p-2 pointer-events-none transform opacity-0 group-hover:opacity-100 shadow-xl rounded-lg flex flex-col items-center"
          :class="getTooltipClasses(circle.x, circle.y)"
        >
          <p class="whitespace-nowrap font-bold z-20 relative">
            {{ circle.data.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
