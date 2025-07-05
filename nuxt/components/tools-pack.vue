<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { hierarchy, pack, type HierarchyCircularNode } from "d3-hierarchy";
import tools, { type ToolsType } from "~/data/tools";

// Inspiration URL: https://tanstack.com/query/latest
// Source URL: https://github.com/TanStack/tanstack.com/blob/ee943e214df6f132a70120014096ed72775dee4b/app/components/ToolsPack.tsx

export type CircleData = {
  x: number;
  y: number;
  r: number;
  data: ToolsType;
};

const container = ref<HTMLElement | null>(null);
const { width } = useElementSize(container, { width: 200, height: 0 });
const circles = ref(computeD3Layout(tools, width.value));
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
</script>

<template>
  <div
    ref="container"
    class="max-w-[1000px] aspect-square lg:mx-auto max-xl:mx-10 max-md:mx-8 max-xs:mx-5"
  >
    <!-- TODO: Need to add animation when in hydration -->
    <!-- <div class="center w-full h-full">
        <div class="relative center loader-tools-pack" />
      </div> -->
    <div class="w-full h-full relative">
      <div
        v-for="(circle, i) in circles"
        :key="`circle-${i}`"
        class="circle-item group"
        :style="{
          left: `${circle.x - circle.r}px`,
          top: `${circle.y - circle.r}px`,
          width: `${circle.r * 2}px`,
          height: `${circle.r * 2}px`,
        }"
      >
        <div
          v-if="circle.data.imageUrl.startsWith('<svg')"
          class="circle-image"
          v-html="circle.data.imageUrl"
        />
        <div
          v-else
          class="circle-image"
          :style="{ backgroundImage: `url(${circle.data.imageUrl})` }"
        />
        <div
          class="circle-tooltip group-hover:opacity-100"
          :class="getTooltipClasses(circle.x, circle.y)"
        >
          <p class="circle-tooltip-text">
            {{ circle.data.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <style>
/* Don't remove */
/** if using this css remove and add to tailwind.confg.ts file  */
/* .loader-tools-pack::before,
.loader-tools-pack::after {
  position: absolute;
  content: "";
  height: 8em;
  width: 8em;
  border: 1em solid gray;
  border-radius: 50%;
  animation: loader_79178 2s linear infinite;
}

.loader-tools-pack::after {
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
} */
</style> -->
