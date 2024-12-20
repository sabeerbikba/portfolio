  <script setup>
  // import { useScreen } from "@/composables/useScreen";
  import useScreenStore from "~/composables/use-screen-store";
  const { state, setScreen } = useScreenStore();

  const dockRef = ref(null);
  const isHovered = ref(false);
  const projects = ref([]);
  const apps = ref([]);
  // const { previewProject, previewApp, setScreen } = useScreen();

  const handleMouseLeave = () => {
    isHovered.value = false;
  };
</script>

<template>
  <div class="w-full flex items-center absolute top-[35.87rem] z-10" v-show="!hidden">
    <div ref="dockRef" class="mx-auto gap-2 bg-white/40 w-auto m-auto rounded-lg px-2.5 inline-flex items-center"
      @mouseenter="isHovered = true" @mouseleave="handleMouseLeave">
      <ProjectsFloatingDockDesktopIconContainer v-for="(item, id) in projects" :key="item.title" :title="item.title"
        :icon="item.icon" :isSelected="state.previewProject === id + 1" @click="setScreen(id + 1, 'project')" />
      <div class="border-x-[1.9px] border-gray-700 rounded-2xl h-8"></div>
      <ProjectsFloatingDockDesktopIconContainer v-for="(item, id) in apps" :key="item.title" :title="item.title"
        :icon="item.icon" :isSelected="state.previewApp === id + 1 + projects.length"
        @click="setScreen(id + 1 + projects.length, 'app')" />
    </div>
  </div>
</template>
