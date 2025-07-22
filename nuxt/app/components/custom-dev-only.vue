<script setup lang="ts">
// import type { TailWind } from "~~/types/tailwind";


defineOptions({ inheritAttrs: false });
const { textWhite = false, className = "" } = defineProps<{
  textWhite?: boolean;
  className?: string;
}>();
</script>

<template>
  <DevOnly>
    <div
      v-bind="$attrs"
      :class="[textWhite ? 'text-white' : 'text-black', className]"
    >
      <slot />
    </div>
  </DevOnly>
</template>
