<script setup lang="ts">
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
    <div>sabeer bikba</div>
    <ProjectsFloatingDockDesktop :hidden="isMediumScreen" />
    <ProjectsFloatingDockMobile :hidden="!isMediumScreen" />
  </div>
</template>
