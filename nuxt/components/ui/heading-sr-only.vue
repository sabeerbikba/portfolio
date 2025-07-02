<script setup lang="ts">
import type { HeadingLevel } from "~/types/global";

withDefaults(
  defineProps<{
    /**
     * The tag to render the heading as.
     * Defaults to "h1".
     */
    as?: HeadingLevel;
  }>(),
  { as: "h2" }
);
</script>

<template>
  <component :is="as" class="sr-only">
    <slot />
  </component>
</template>
