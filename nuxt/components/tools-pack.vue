<!-- <script setup>
import { hierarchy, pack } from "d3-hierarchy";

const props = defineProps({
  tools: {
    type: Array,
    required: true,
  },
});

const containerWidth = ref(800);

// Create the hierarchical data structure
const root = computed(() => {
  const rootNode = hierarchy({
    children: props.tools,
    name: "root",
    radius: 0,
    distance: 0,
  })
    .sum((d) => d.proficiency || 1)
    .sort((a, b) => (b.data.proficiency || 0) - (a.data.proficiency || 0));

  return pack()
    .size([containerWidth.value, containerWidth.value])
    .padding(containerWidth.value * 0.005)(rootNode);
});

const circles = computed(() => {
  return root.value
    .descendants()
    .slice(1)
    .map((node) => ({
      x: node.x,
      y: node.y,
      r: node.r,
      data: node.data,
    }));
});

// Dynamically update container width (responsive handling)
const width = ref(containerWidth.value);
onMounted(() => {
  const updateWidth = () => {
    width.value = Math.min(window.innerWidth, containerWidth.value);
  };
  window.addEventListener("resize", updateWidth);
  updateWidth();
});

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
  <div class="tools-pack-container">
    <div
      v-if="width > 10"
      :style="{
        width: width + 'px',
        height: width + 'px',
        position: 'relative',
      }"
    >
      <div>
        <div
          v-for="(circle, i) in circles"
          :key="`circle-${i}`"
          class="spon-link absolute shadow-lg bg-white rounded-full z-0 border-[0.5px]"
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
            v-else="circle.data.imageUrl"
            class="absolute bg-no-repeat bg-center bg-contain rounded-full w-[95%] h-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            :style="{ backgroundImage: `url(${circle.data.imageUrl})` }"
          />

          <div
            class="spon-tooltip absolute z-50 text-sm bg-gray-800 text-white p-2 pointer-events-none transform opacity-0 shadow-xl rounded-lg flex flex-col items-center"
            :class="getTooltipClasses(circle.x, circle.y)"
          >
            <p class="whitespace-nowrap font-bold z-20 relative">
              {{ circle.data.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tools-pack-container {
  position: relative;
}

.spon-tooltip {
  transition: opacity 0.3s ease;
}

.spon-link:hover .spon-tooltip {
  opacity: 1;
}
</style> -->

<template>
  <div class="tools-pack-container">
    <div
      v-if="width > 10"
      :style="{
        width: width + 'px',
        height: width + 'px',
        position: 'relative',
      }"
    >
      <div
        v-for="(circle, i) in circles"
        :key="`circle-${i}`"
        class="spon-link absolute shadow-lg bg-white rounded-full z-0 border-[0.5px]"
        :style="{
          left: `${circle.x - circle.r}px`,
          top: `${circle.y - circle.r}px`,
          width: `${circle.r * 2}px`,
          height: `${circle.r * 2}px`,
        }"
      >
        <div
          v-if="circle.data.imageUrl"
          class="absolute bg-no-repeat bg-center bg-contain rounded-full w-[95%] h-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          :style="{ backgroundImage: `url(${circle.data.imageUrl})` }"
        ></div>

        <div
          class="spon-tooltip absolute z-50 text-sm bg-gray-800 text-white p-2 pointer-events-none transform opacity-0 shadow-xl rounded-lg flex flex-col items-center"
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

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { hierarchy, pack } from "d3-hierarchy";

const props = defineProps({
  tools: {
    type: Array,
    required: true,
  },
});

const containerWidth = ref(800);
const width = ref(containerWidth.value);

// Dynamically update container width and re-calculate layout (responsive handling)
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

// Create the hierarchical data structure
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

<style scoped>
.tools-pack-container {
  position: relative;
}

.spon-tooltip {
  transition: opacity 0.3s ease;
}

.spon-link:hover .spon-tooltip {
  opacity: 1;
}
</style>
