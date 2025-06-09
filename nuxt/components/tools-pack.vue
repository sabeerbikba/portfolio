<script setup lang="ts">
import { hierarchy, pack, type HierarchyCircularNode } from "d3-hierarchy";
import tools from "~/data/tools";
import type { ToolsType } from "~/data/tools";

// Inspiration URL: https://tanstack.com/query/latest
// Source URL: https://github.com/TanStack/tanstack.com/blob/ee943e214df6f132a70120014096ed72775dee4b/app/components/ToolsPack.tsx

export type CircleData = {
  x: number;
  y: number;
  r: number;
  data: ToolsType;
};

const width = ref(200);
const isLoading = ref<boolean>(false);
const container = ref<HTMLElement | null>(null);
const circles = ref(computeD3Layout(tools, width.value));

const updateWidth = () => {
  if (container.value) {
    width.value = container.value.clientWidth;
  }
};

const recalculate = () => {
  circles.value = computeD3Layout(tools, width.value);
};

// Using a named function (not arrow) for hoisting support
function computeD3Layout(tools: ToolsType[], size: number): CircleData[] {
  const rootNode = hierarchy<{ children: ToolsType[]; name: string }>({
    children: tools,
    name: "root",
  })
    .sum((d: any) => d.proficiency || 1)
    .sort(
      (a: any, b: any) => (b.data.proficiency || 0) - (a.data.proficiency || 0)
    );

  const root = pack()
    .size([size, size])
    .padding(size * 0.005)(rootNode as HierarchyCircularNode<unknown>);

  return root
    .descendants()
    .slice(1)
    .map(
      (node): CircleData => ({
        x: node.x,
        y: node.y,
        r: node.r,
        data: node.data as ToolsType,
      })
    );
}

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

watch(width, recalculate);

onMounted(() => {
  updateWidth();
  isLoading.value = true;
  window.addEventListener("resize", updateWidth);
});
</script>

<template>
  <div
    class="max-w-[1000px] aspect-square lg:mx-auto max-xl:mx-10 max-md:mx-8 max-xs:mx-5"
    ref="container"
  >
    <!-- TODO: Need to add animation when in hydration -->
    <!-- <div class="center w-full h-full">
        <div class="relative center loader" />
      </div> -->
    <div class="w-full h-full relative">
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

<style>
.loader::before,
.loader::after {
  position: absolute;
  content: "";
  height: 8em;
  width: 8em;
  border: 1em solid gray;
  border-radius: 50%;
  animation: loader_79178 2s linear infinite;
}

.loader::after {
  opacity: 0;
  animation-delay: 1s;
}

@keyframes loader_79178 {
  0% {
    border: 1em solid black;
    transform: scale(0);
    opacity: 1;
  }

  100% {
    border: 0 solid gray;
    transform: scale(1);
    opacity: 0;
  }
}
</style>
