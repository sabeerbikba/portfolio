<script setup lang="ts">
defineOptions({ inheritAttrs: false });
const { textWhite = false } = defineProps<{ textWhite?: boolean }>();
</script>

<template>
  <DevOnly>
    <div v-bind="$attrs" :class="[textWhite ? 'text-white' : 'text-black']">
      <slot />
    </div>
  </DevOnly>
</template>
