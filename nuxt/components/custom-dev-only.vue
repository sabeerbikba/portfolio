<script setup lang="ts">
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
