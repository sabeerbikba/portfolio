<script setup lang="ts">
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

const isMounted = useMounted();
const container = useTemplateRef("container");
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

const id = (toolName: string, id: number) => `id-${useSlugify(toolName)}-${id}`;

watch(width, recalculate);
</script>

<template>
  <div
    ref="container"
    :class="{
      'max-w-[1000px] aspect-square lg:mx-auto max-xl:mx-10 max-md:mx-8 max-xs:mx-5': true,
      'py-[400px]': !isMounted,
    }"
  >
    <div
      :class="[
        'h-full relative mx-auto',
        isMounted ? 'w-full' : 'w-[200px]',
        isMounted ? 'h-full' : 'h-[200px]',
      ]"
    >
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
          :aria-describedby="id(circle.data.name, i)"
          class="circle-image"
          role="img"
          v-html="
            circle.data.imageUrl.startsWith('<svg')
              ? circle.data.imageUrl
              : undefined
          "
          :style="
            !circle.data.imageUrl.startsWith('<svg')
              ? { backgroundImage: `url(${circle.data.imageUrl})` }
              : undefined
          "
        />
        <div
          :id="id(circle.data.name, i)"
          :class="[
            'circle-tooltip group-hover:opacity-100',
            getTooltipClasses(circle.x, circle.y),
          ]"
        >
          <p class="circle-tooltip-text">
            {{ circle.data.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
