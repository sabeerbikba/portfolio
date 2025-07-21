<script setup lang="ts">
import { octiconsIcons, type OcticonsIconName } from "~/data/icons";
// oldCode: https://github.com/sabeerbikba/portfolio/commit/0377e81645f030da42281dc533fcfdf61b1fbaf5
// icons: https://primer.style/octicons/
// icons data.json: https://www.npmjs.com/package/@primer/octicons/file/d75ba132a9d5f0d94967b98a436f0dc08eb83f3c778ce30538a3336ba3777681
// icons data.json in node_modules:  import icons from "@primer/octicons/build/data.json";

const { name } = defineProps<{ name: OcticonsIconName }>();

const viewBox = name === "mark-github-24" ? 24 : 16;
const widthHeight = name === "mark-github-24" ? 32 : 16;
</script>

<template>
  <svg
    version="1.1"
    :width="widthHeight"
    :height="widthHeight"
    :viewBox="`0 0 ${viewBox} ${viewBox}`"
    :class="`octicon octicon-${name}`"
    aria-hidden="true"
    fill="currentColor"
    focusable="false"
    class="inline-block select-none align-text-bottom overflow-visible"
    v-html="octiconsIcons[name]"
  />
</template>
