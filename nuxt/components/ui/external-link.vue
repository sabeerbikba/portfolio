<script setup lang="ts">
const { href } = defineProps<{ href: string }>();
</script>

<template>
  <a :href target="_blank" rel="noopener noreferrer">
    <slot />
  </a>
</template>
