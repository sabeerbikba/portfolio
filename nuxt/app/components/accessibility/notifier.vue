<script setup lang="ts">
import { projects, iconsName } from "~/content/projects";
import type { ScreenStoreType } from "~~/types/store";

const store = inject("store") as ScreenStoreType;
const { appStore } = defineProps<{ appStore: number }>();

const notification = computed(() => {
  const openedProject = iconsName.projects[store.state.previewProject];
  const openedApp = iconsName.apps[appStore - projects.length];

  switch (openedApp) {
    case "github": {
      return `${openedProject} ${openedApp} repository opened`;
    }
    case "website": {
      return `${openedProject} ${openedApp} opened`;
    }
    default: /* about */ {
      return `${openedApp} ${openedProject} project opened`;
    }
  }
});
</script>

<template>
  <div class="sr-only" aria-live="polite" aria-atomic="true">
    {{ store.state.previewApp === appStore ? notification : "" }}
  </div>
</template>
