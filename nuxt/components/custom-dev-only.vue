<script setup lang="ts">
withDefaults(defineProps<{ textWhite?: boolean }>(), { textWhite: false });
</script>

<template>
  <DevOnly>
    <div :class="[textWhite ? 'text-white' : 'text-black']">
      <slot />
    </div>
  </DevOnly>
</template>
