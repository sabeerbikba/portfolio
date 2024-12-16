<script setup lang="ts">
defineProps({
  /**
   * Additional CSS classes to apply to the label.
   */
  className: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <label :class="cn('text-sm md:text-base font-medium text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left px-2'
    , className)">
    <slot />
  </label>
</template>
