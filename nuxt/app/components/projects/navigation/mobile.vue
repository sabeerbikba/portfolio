<script setup lang="ts">
import { projects, apps } from "~/content/projects";
import { Motion, MotionPresence } from "@oku-ui/motion";
import type { ScreenStoreType } from "~~/types/store";

const store = inject("store") as ScreenStoreType;

const isOpen = ref(false);
const mobileDockRef = useTemplateRef("mobileDockRef");
const showContent = ref(true);

const ButtonsGroup = createReusableTemplate();
const CloseBtnLine = createReusableTemplate();
const OpenBtnLineRing = createReusableTemplate<{
  wh: number;
  bgColor: string;
}>({ inheritAttrs: false });
const MobileButton = createReusableTemplate<{
  to: string;
  name: string;
  icon: string;
  isSelected: boolean;
  ariaLabelBtn: string;
}>({ inheritAttrs: false });

const { getLinkForProject, getLinkForApp } = useProjectAppLinks(store);
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
  <ButtonsGroup.define v-slot="{ $slots }">
    <div class="mobile-btn-base" role="group">
      <component :is="$slots.default" />
    </div>
  </ButtonsGroup.define>
  <MobileButton.define v-slot="{ name, icon, isSelected, ariaLabelBtn, to }">
    <NuxtLink :to class="max-w-full block p-2" :aria-label="ariaLabelBtn">
      <ProjectsNavigationBtnImg
        :icon
        :name
        :class="{
          'mobile-btn-icon-active': isSelected,
        }"
      />
    </NuxtLink>
  </MobileButton.define>
  <CloseBtnLine.define>
    <div class="mobile-close-btn" />
  </CloseBtnLine.define>
  <OpenBtnLineRing.define v-slot="{ $slots, wh, bgColor }">
    <span
      :style="{
        width: `${wh}px`,
        height: `${wh}px`,
        backgroundColor: bgColor || 'transparent',
      }"
      class="rounded-full center"
    >
      <component :is="$slots.default" />
    </span>
  </OpenBtnLineRing.define>

  <div
    ref="mobileDockRef"
    role="navigation"
    aria-label="Mobile projects navigation"
    class="md:hidden absolute block top-36 right-3 z-50"
  >
    <Motion
      as="button"
      type="button"
      :aria-expanded="isOpen"
      aria-label="Toggle mobile navigation"
      :class="{ 'h-10 w-10 center': true, 'mix-blend-exclusion': !isOpen }"
      :initial="false"
      :animate="{
        borderRadius: isOpen ? '50%' : '0.5rem',
        opacity: isOpen ? 1 : 0.55,
        backgroundColor: isOpen ? '#9CA3AF' : '#323232',
        padding: isOpen ? '0.625rem' : '0rem',
      }"
      :transition="{ duration: 0.3, ease: 'backIn' }"
      @click="toggleDock"
    >
      <div v-show="showContent">
        <span :style="{ display: !isOpen ? 'flex' : 'none' }">
          <OpenBtnLineRing.reuse :wh="30" bg-color="#525F65">
            <OpenBtnLineRing.reuse :wh="20" bg-color="#91969C">
              <OpenBtnLineRing.reuse :wh="12" bg-color="#FCFFFF" />
            </OpenBtnLineRing.reuse>
          </OpenBtnLineRing.reuse>
        </span>
        <div
          :style="{ display: isOpen ? 'block' : 'none' }"
          class="relative w-7 h-7 left-[10px] z-[60]"
        >
          <CloseBtnLine.reuse class="rotate-45" />
          <CloseBtnLine.reuse class="-rotate-45" />
        </div>
      </div>
    </Motion>

    <MotionPresence>
      <Motion
        v-show="isOpen"
        :initial="{ opacity: 0, x: 50, scale: 0.95 }"
        :animate="{ opacity: 1, x: 0, scale: 1 }"
        :exit="{ opacity: 0, x: 50, scale: 0.95 }"
        :transition="{ duration: 0.3, ease: 'easeInOut' }"
        className="flex pl-1 w-[190px] h-[200px] absolute top-[-75px] right-[-12px] rounded-[50px_160px_160px_50px] !bg-[linear-gradient(90deg,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0.01)_100%)] text-white"
      >
        <ButtonsGroup.reuse aria-label="Projects group">
          <MobileButton.reuse
            v-for="({ name, icon }, id) in projects"
            :key="`project-${name}`"
            :to="getLinkForProject(id)"
            :name
            :icon
            :ariaLabelBtn="`Navigate to ${name} project`"
            :is-selected="store.state.previewProject === id"
          />
        </ButtonsGroup.reuse>
        <ButtonsGroup.reuse class="mr-auto" aria-label="Apps group">
          <MobileButton.reuse
            v-for="({ name, icon }, id) in apps"
            :key="`app-${name}`"
            :to="getLinkForApp(id)"
            :name
            :icon
            :is-selected="store.state.previewApp === id"
            :ariaLabelBtn="`Navigate to ${name} app`"
          />
        </ButtonsGroup.reuse>
      </Motion>
    </MotionPresence>
  </div>
</template>
