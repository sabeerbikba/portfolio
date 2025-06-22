<script setup lang="ts">
import type {
  ScreenStoreActionType,
  ScreenStoreStateType,
  ScreenStoreType,
} from "~/types/store";

const state = reactive<ScreenStoreStateType>({
  previewProject: 1,
  previewApp: 3,
  // data: [],
});

const dispatch = ({ type, payload }: ScreenStoreActionType) => {
  switch (type) {
    case "TOGGLE_PROJECT": {
      state.previewProject = payload;
      break;
    }
    case "TOGGLE_APP": {
      state.previewApp = payload;
      break;
    }
    default: {
      throw new Error("Unknown action");
    }
  }
};

const store: ScreenStoreType = { state, dispatch };
provide("store", store);

const isWebsiteComponentHidden = computed(() => store.state.previewApp !== 3);
</script>

<template>
  <ProjectsFloatingDock />
  <div
    :class="{
      'h-full w-full overflow-auto scroll': true,
      'bg-[#191919]': store.state.previewApp === 4,
      'bg-[#0d1117]': store.state.previewApp === 5,
    }"
  >
    <!-- better hidden not visible if possible -->
    <ProjectsWebsite :hidden="isWebsiteComponentHidden" />
    <ProjectsAbout />
    <ProjectsGithub />
  </div>
</template>
