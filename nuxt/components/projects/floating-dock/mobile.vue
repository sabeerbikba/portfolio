<script setup lang="ts">
import { projects, apps } from "~/data/projects";
import { Motion, MotionPresence } from "@oku-ui/motion";
import type { ScreenStoreType } from "~/types/store";

const store = inject("store") as ScreenStoreType;

const isOpen = ref<boolean>(false);
const mobileDockRef = ref<HTMLDivElement | null>(null);
const showContent = ref<boolean>(true);

const handleClickOutside = (event: MouseEvent) => {
  if (
    mobileDockRef.value &&
    !mobileDockRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false;
  }
};

const toggleDock = () => {
  isOpen.value = !isOpen.value;
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
  <div
    role="navigation"
    ref="mobileDockRef"
    aria-label="Mobile projects navigation"
    class="absolute block md:hidden top-36 right-3 z-10"
  >
    <MotionPresence>
      <Motion
        v-show="isOpen"
        :initial="{ opacity: 0, x: 50, scale: 0.95 }"
        :animate="{ opacity: 1, x: 0, scale: 1 }"
        :exit="{ opacity: 0, x: 50, scale: 0.95 }"
        :transition="{ duration: 0.3, ease: 'easeInOut' }"
        className="flex pl-1 w-[190px] h-[200px] absolute top-[-75px] right-[-12px] rounded-[50px_160px_160px_50px] !bg-[linear-gradient(90deg,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0.01)_100%)] text-white"
      >
        <div
          class="w-1/3 h-full py-[9px]"
          role="group"
          aria-label="Projects group 1"
        >
          <button
            v-for="({ name, icon }, id) in projects"
            type="button"
            :aria-label="`Navigate to ${name} project`"
            :key="name"
            @click="store.dispatch({ type: 'TOGGLE_PROJECT', payload: id + 1 })"
            class="max-w-full p-2"
          >
            <img
              :src="icon"
              :alt="`${name} icon`"
              width="100%"
              height="100%"
              loading="eager"
              decoding="async"
              :class="{
                'rounded-xl border border-zinc-600 shadow-[0_0_20px_4px_rgba(255,255,255,0.7)]':
                  store.state.previewProject === id + 1,
              }"
            />
          </button>
        </div>
        <div
          class="w-1/3 h-full py-[9px] mr-auto"
          role="group"
          aria-label="Apps group 2"
        >
          <button
            v-for="({ name, icon }, id) in apps"
            type="button"
            :aria-label="`Navigate to ${name} app`"
            :key="name"
            @click="
              store.dispatch({
                type: 'TOGGLE_APP',
                payload: id + 1 + projects.length,
              })
            "
            class="max-w-full p-2"
          >
            <img
              :src="icon"
              :alt="`${name} icon`"
              width="100%"
              height="100%"
              loading="eager"
              decoding="async"
              :class="{
                'rounded-xl border border-zinc-600 shadow-[0_0_20px_4px_rgba(255,255,255,0.7)]':
                  store.state.previewApp === id + 1 + projects.length,
              }"
            />
          </button>
        </div>
      </Motion>
    </MotionPresence>

    <Motion
      as="button"
      :aria-expanded="isOpen"
      aria-label="Toggle mobile navigation"
      @click="toggleDock"
      :class="['h-10 w-10 center', !isOpen && 'mix-blend-exclusion']"
      :initial="false"
      :animate="{
        borderRadius: isOpen ? '50%' : '0.5rem',
        opacity: isOpen ? 1 : 0.55,
        backgroundColor: isOpen ? '#9CA3AF' : '#323232',
        padding: isOpen ? '0.625rem' : '0rem',
      }"
      :transition="{ duration: 0.3, ease: 'backIn' }"
    >
      <div v-show="showContent">
        <ProjectsFloatingDockMobileRingSpan
          :style="{ display: !isOpen ? 'flex' : 'none' }"
          :wh="30"
          :bgColor="`#525F65`"
        >
          <ProjectsFloatingDockMobileRingSpan :wh="20" :bgColor="`#91969C`">
            <ProjectsFloatingDockMobileRingSpan :wh="12" :bgColor="`#FCFFFF`" />
          </ProjectsFloatingDockMobileRingSpan>
        </ProjectsFloatingDockMobileRingSpan>
        <div
          :style="{ display: isOpen ? 'block' : 'none' }"
          class="relative w-7 h-7 left-[10px]"
        >
          <div class="absolute inset-0 rotate-45 w-1 rounded-sm bg-gray-700" />
          <div class="absolute inset-0 -rotate-45 w-1 rounded-sm bg-gray-700" />
        </div>
      </div>
    </Motion>
  </div>
</template>
