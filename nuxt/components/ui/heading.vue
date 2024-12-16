<script setup>
defineProps({
  /**
   * The tag to render the heading as.
   * Defaults to "h1".
   */
  as: {
    type: String,
    default: 'h1',
    validator: value => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value),
  },
  /**
   * Additional CSS classes to apply to the heading.
   */
  className: {
    type: String,
    default: '',
  },
});

</script>

<template>
  <component :is="as" :class="cn(
    'font-semibold text-2xl xs:text-3xl sm:text-4xl md:text-5xl max-xs:px-3 mb-[2px] xs:mb-1 sm:mb-2 md:mb-3 text-black text-center',
    className
  )">
    <slot />
  </component>
</template>
