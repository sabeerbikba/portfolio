<script setup lang="ts">
defineProps<{ icon: string; name: string }>();
</script>

<template>
  <img
    :src="icon"
    :alt="`${name} icon`"
    class="wh-full"
    loading="eager"
    decoding="async"
  />
</template>
