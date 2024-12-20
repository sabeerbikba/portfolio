  <script setup>
  // import { useScreen } from "@/composables/useScreen";
  import useScreenStore from "~/composables/use-screen-store";

  const mobileDockRef = ref(null);
  const open = ref(false);
  const projects = ref([]);
  const apps = ref([]);
  const { state, setScreen } = useScreenStore();

  // const { previewProject, previewApp, setScreen } = useScreen();

  const handleClickOutside = (event) => {
    if (mobileDockRef.value && !mobileDockRef.value.contains(event.target)) {
      open.value = false;
    }
  };

  const toggleDock = () => {
    open.value = !open.value;
  };

  onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });
</script>

<template>
  <div ref="mobileDockRef" class="absolute block md:hidden top-36 right-3 z-10" v-show="!hidden">
    <Transition name="fade">
      <div v-if="open"
        class="flex pl-1 w-[190px] h-[200px] absolute top-[-75px] right-[-12px] rounded-[50px_160px_160px_50px] bg-gradient-to-r from-white/30 to-white/5 text-white">
        <!-- Column 1 -->
        <div class="w-1/3 h-full py-[9px] border-white">
          <button v-for="(project, id) in projects" :key="project.title" @click="setScreen(id + 1, 'project')"
            class="max-w-full p-2">
            <img :src="project.icon" :class="{
              'rounded-xl border border-zinc-600 shadow-[0_0_20px_4px_rgba(255,255,255,0.7)]':
                state.previewProject === id + 1,
            }" width="100%" height="100%" />
          </button>
        </div>
        <!-- Column 2 -->
        <div class="w-1/3 h-full py-[9px] border-white">
          <button v-for="(app, id) in apps" :key="app.title" @click="setScreen(id + 1 + projects.length, 'app')"
            class="max-w-full p-2">
            <img :src="app.icon" :class="{
              'rounded-xl border border-zinc-600 shadow-[0_0_20px_4px_rgba(255,255,255,0.7)]':
                state.previewApp === id + 1 + projects.length,
            }" width="100%" height="100%" />
          </button>
        </div>
        <!-- Column 3 -->
        <div class="w-1/3 h-full border-white"></div>
      </div>
    </Transition>

    <button @click="toggleDock" class="h-10 w-10 center">
      <span v-if="!open" class="ring-indicator" />
      <div v-else class="relative w-7 h-7">
        <div class="absolute inset-0 rotate-45 w-1 rounded-sm bg-gray-700"></div>
        <div class="absolute inset-0 -rotate-45 w-1 rounded-sm bg-gray-700"></div>
      </div>
    </button>
  </div>
</template>

<style scoped>
/* Add custom styles */
.ring-indicator {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
}
</style>

<!-- RingSpan Component missing here  -->
