<script setup lang="ts">
const { as = "div" } = defineProps<{ as?: "main" | "div" }>();
</script>

<template>
  <div class="w-full h-full bg-white bg-dot-black/[0.4] bg-fixed relative">
    <div
      class="absolute pointer-events-none inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
    />
    <as
      class="relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500"
    >
      <slot />
    </as>
  </div>
</template>
