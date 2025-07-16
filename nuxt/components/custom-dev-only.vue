<script setup lang="ts">
const { textWhite = false } = defineProps<{ textWhite?: boolean }>();
</script>

<template>
  <DevOnly>
    <div :class="[textWhite ? 'text-white' : 'text-black']">
      <slot />
    </div>
  </DevOnly>
</template>
