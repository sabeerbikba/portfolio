<script setup lang="ts">
defineProps<{ src: string }>();
</script>

<template>
  <!-- alt attribute intentionally omitted: this image is a navigation icon and doesn't add SEO or accessibility value -->
  <img :src loading="eager" decoding="async" />
</template>
