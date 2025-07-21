<script setup lang="ts">
import type { HeadingLevel } from "~/types/global";

const { as = "h2" } = defineProps<{
  /**
   * The tag to render the heading as.
   * Defaults to "h1".
   */
  as?: HeadingLevel;
}>();
</script>

<template>
  <component :is="as" class="sr-only">
    <slot />
  </component>
</template>
