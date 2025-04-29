<script setup lang="ts">
import data from "@primer/octicons/build/data.json";

const props = withDefaults(
  defineProps<{
    name: string; // TODO:
    size?: 16 | 24 | 32;
  }>(),
  {
    size: 16,
  }
);

type IconHeight = {
  width: number;
  path: string;
  ast: {
    name: string;
    type: string;
    value: string;
    attributes: {
      xmlns: string;
      width: string;
      height: string;
      viewBox: string;
    };
    children: Array<{
      name: string;
      type: string;
      value: string;
      attributes: {
        d: string;
      };
      children: Array<any>; // Since it's a leaf node (empty children)
    }>;
  };
};

type Icon = {
  name: string;
  keywords: string[];
  heights: {
    [height: string]: IconHeight;
  };
};

type IconData = {
  [key: string]: Icon;
};

const icons: IconData = data;

const renderOcticonsIcon = (icon: string) =>
  `<svg>${icons[icon].heights[props.size === 32 ? 24 : props.size].path}</svg>`;
</script>

<template>
  <svg
    focusable="false"
    fill="currentColor"
    style="
      display: inline-block;
      user-select: none;
      vertical-align: text-bottom;
      overflow: visible;
    "
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :viewBox="`0 0 ${size} ${size}`"
    v-html="renderOcticonsIcon('law')"
  />
</template>
