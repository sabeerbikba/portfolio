<script setup lang="ts">
defineProps<{ wh: number; bgColor?: string }>();
</script>

<template>
  <span
    :style="{
      width: `${wh}px`,
      height: `${wh}px`,
      backgroundColor: bgColor || 'transparent',
    }"
    class="rounded-full flex items-center justify-center"
  >
    <slot />
  </span>
</template>
