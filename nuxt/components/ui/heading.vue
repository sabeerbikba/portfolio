<script setup lang="ts">
import type { HeadingLevel } from "~/types/global";

withDefaults(
  defineProps<{
    /**
     * The tag to render the heading as.
     * Defaults to "h1".
     */
    as?: HeadingLevel;
    /**
     * Additional CSS classes to apply to the heading.
     */
    className?: string;
  }>(),
  {
    as: "h1",
    className: "",
  }
);
</script>

<template>
  <component
    :is="as"
    :class="
      useCn(
        'font-semibold text-2xl xs:text-3xl sm:text-4xl md:text-5xl max-xs:px-3 mb-[2px] xs:mb-1 sm:mb-2 md:mb-3 text-black text-center',
        className
      )
    "
  >
    <slot />
  </component>
</template>
