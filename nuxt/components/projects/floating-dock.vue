<script setup>
const isMediumScreen = ref(false);

const handleResize = () => {
  isMediumScreen.value = window.matchMedia("(min-width: 768px)").matches;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="relative">
    <ProjectsFloatingDockDesktop v-if="isMediumScreen" />
    <ProjectsFloatingDockMobile v-else />
  </div>
</template>
