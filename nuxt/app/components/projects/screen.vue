<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { apps, projects } from "~/content/projects";
import type {
  ScreenStoreActionType,
  ScreenStoreStateType,
  ScreenStoreType,
} from "~~/types/store";

const state = reactive<ScreenStoreStateType>({
  previewProject: 0,
  previewApp: 0,
});

const projectSelectedSlug = useRouteQuery(
  "project",
  useSlugify(projects[0]!.name)
);
const appSelectedSlug = useRouteQuery("app", useSlugify(apps[0]!.name));

const dispatch = ({ type, payload }: ScreenStoreActionType) => {
  switch (type) {
    case "TOGGLE_PROJECT":
      state.previewProject = payload;
      break;
    case "TOGGLE_APP":
      state.previewApp = payload;
      break;
    default:
      throw new Error("Unknown action");
  }
};

const syncFromQueryIifeFn = (() => {
  const iifeFn = () => {
    const projectIdx = projects.findIndex(
      (p) => useSlugify(p.name) === projectSelectedSlug.value
    );
    if (projectIdx !== -1) state.previewProject = projectIdx;

    const appIdx = apps.findIndex(
      (a) => useSlugify(a.name) === appSelectedSlug.value
    );
    if (appIdx !== -1) state.previewApp = appIdx;
  };
  iifeFn();
  return iifeFn;
})();

onMounted(syncFromQueryIifeFn);

watch(projectSelectedSlug, (slug) => {
  const idx = projects.findIndex((p) => useSlugify(p.name) === slug);
  if (idx !== -1 && state.previewProject !== idx) {
    state.previewProject = idx;
  }
});

watch(appSelectedSlug, (slug) => {
  const idx = apps.findIndex((a) => useSlugify(a.name) === slug);
  const appIdx = idx;
  if (idx !== -1 && state.previewApp !== appIdx) {
    state.previewApp = appIdx;
  }
});

const store: ScreenStoreType = { state, dispatch };
provide("store", store);
</script>

<template>
  <ProjectsNavigation />
  <div
    :class="{
      'h-full w-full overflow-auto scroll': true,
      'bg-[#191919]':
        store.state.previewApp === useFindProjectsBtnIndex('apps', 'about'),
      'bg-[#0d1117]':
        store.state.previewApp === useFindProjectsBtnIndex('apps', 'github'),
    }"
  >
    <ProjectsWebsite />
    <ProjectsAbout />
    <ProjectsGithub />
  </div>
</template>
