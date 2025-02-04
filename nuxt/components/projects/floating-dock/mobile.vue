  <script setup lang="ts">
  defineProps({ hidden: { type: Boolean, required: true } });
  import { projects } from "~/data/projects";
  import { apps } from "~/data/projects";
  import { Motion, MotionPresence } from '@oku-ui/motion';
import { storeToRefs } from 'pinia';
import useScreenStore from '~/store/use-screen-store';

const store = useScreenStore();
const { setScreen } = useScreenStore();
const { previewApp, previewProject, } = storeToRefs(store);
  const open = ref<boolean>(false);
  const mobileDockRef = ref<HTMLDivElement | null>(null);
  const showContent = ref<boolean>(true);
//  const { state, setScreen } = useScreenStore();

  const handleClickOutside = (event: MouseEvent) => {
    if (mobileDockRef.value && !mobileDockRef.value.contains(event.target as Node)) {
      open.value = false;
    }
  };

  const toggleDock = () => {
    open.value = !open.value;
    showContent.value = false;
    setTimeout(() => {
      showContent.value = true;
    }, 350);
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
    <MotionPresence>
      <Motion v-if="open" :initial="{ opacity: 0, x: 50, scale: 0.95 }" :animate="{ opacity: 1, x: 0, scale: 1 }"
        :exit="{ opacity: 0, x: 50, scale: 0.95 }" :transition="{ duration: 0.3, ease: 'easeInOut' }"
        className="flex pl-1 w-[190px] h-[200px] absolute top-[-75px] right-[-12px] rounded-[50px_160px_160px_50px] !bg-[linear-gradient(90deg,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0.01)_100%)] text-white">
        <!-- Column 1 -->
        <div class="w-1/3 h-full py-[9px] border-white">
          <button v-for="(project, id) in projects" :key="project.title" @click="setScreen(id + 1, 'project')"
            class="max-w-full p-2">
            <img :src="project.icon" :class="{
              'rounded-xl border border-zinc-600 shadow-[0_0_20px_4px_rgba(255,255,255,0.7)]':
                previewProject === id + 1,
            }" width="100%" height="100%" />
          </button>
        </div>
        <!-- Column 2 -->
        <div class="w-1/3 h-full py-[9px] border-white">
          <button v-for="(app, id) in apps" :key="app.title" @click="setScreen(id + 1 + projects.length, 'app')"
            class="max-w-full p-2">
            <img :src="app.icon" :class="{
              'rounded-xl border border-zinc-600 shadow-[0_0_20px_4px_rgba(255,255,255,0.7)]':
                previewApp === id + 1 + projects.length,
            }" width="100%" height="100%" />
          </button>
        </div>
        <!-- Column 3 -->
        <div class="w-1/3 h-full border-white"></div>
      </Motion>
    </MotionPresence>

    <Motion as="button" @click="toggleDock" :class="[
      'h-10 w-10 center',
      !open && 'mix-blend-exclusion'
    ]" :initial="false" :animate='{
      borderRadius: open ? "50%" : "0.5rem",
      opacity: open ? 1 : 0.55,
      backgroundColor: open ? "#9CA3AF" : "#323232",
      padding: open ? "0.625rem" : "0rem",
    }' :transition='{ duration: 0.3, ease: "backIn" }'>
      <template v-if="showContent">
        <ProjectsFloatingDockMobileRingSpan v-if="!open" :wh="30" :bgColor="`#525F65`">
          <ProjectsFloatingDockMobileRingSpan :wh="20" :bgColor="`#91969C`">
            <ProjectsFloatingDockMobileRingSpan :wh="12" :bgColor="`#FCFFFF`" />
          </ProjectsFloatingDockMobileRingSpan>
        </ProjectsFloatingDockMobileRingSpan>
        <div v-else class="relative w-7 h-7 left-[7px]">
          <div class="absolute inset-0 rotate-45 w-1 rounded-sm bg-gray-700" />
          <div class="absolute inset-0 -rotate-45 w-1 rounded-sm bg-gray-700" />
        </div>
      </template>
    </Motion>
  </div>
</template>
