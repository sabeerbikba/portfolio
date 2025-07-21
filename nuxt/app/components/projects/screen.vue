<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { apps, projects } from "~/content/projects";
import type {
  ProjectPayloadType,
  AppPayloadType,
  ScreenStoreActionType,
  ScreenStoreStateType,
  ScreenStoreType,
} from "~~/types/store";

const state = reactive<ScreenStoreStateType>({
  previewProject: 0,
  previewApp: 2,
});

const projectSelectedSlug = useRouteQuery("project", useSlugify(projects[0].name));
const appSelectedSlug = useRouteQuery("app", useSlugify(apps[0].name));

const initAppIdx = apps.findIndex((a) => useSlugify(a.name) === appSelectedSlug.value);
const initProjectIdx = projects.findIndex(
  (p) => useSlugify(p.name) === projectSelectedSlug.value
);

if (initProjectIdx !== -1) {
  state.previewProject = initProjectIdx;
}

if (initAppIdx !== -1) {
  state.previewApp = initAppIdx + projects.length;
}

const setRouteQueryVal = (payload: number, type: "project" | "app") => {
  if (type === "project") {
    projectSelectedSlug.value = useSlugify(projects[payload].name) as ProjectPayloadType;
  }

  if (type === "app") {
    appSelectedSlug.value = useSlugify(
      apps[payload - projects.length].name
    ) as AppPayloadType;
  }
};

const dispatch = ({ type, payload }: ScreenStoreActionType) => {
  switch (type) {
    case "TOGGLE_PROJECT": {
      state.previewProject = payload;
      setRouteQueryVal(payload, "project");
      break;
    }
    case "TOGGLE_APP": {
      state.previewApp = payload;
      setRouteQueryVal(payload, "app");
      break;
    }
    default: {
      throw new Error("Unknown action");
    }
  }
};

watch(
  [() => state.previewProject, () => projectSelectedSlug.value],
  ([newStoreVal, newQueryVal]) => {
    const expectedSlug = useSlugify(projects[newStoreVal].name);
    if (newQueryVal !== expectedSlug) {
      projectSelectedSlug.value = expectedSlug as ProjectPayloadType;
    } else {
      const idx = projects.findIndex((p) => useSlugify(p.name) === newQueryVal);
      if (idx !== -1 && state.previewProject !== idx) {
        state.previewProject = idx;
      }
    }
  }
);

watch(
  [() => state.previewApp, () => appSelectedSlug.value],
  ([newStoreVal, newQueryVal]) => {
    const expectedSlug = useSlugify(apps[newStoreVal - projects.length].name);
    if (newQueryVal !== expectedSlug) {
      appSelectedSlug.value = expectedSlug as AppPayloadType;
    } else {
      const idx = apps.findIndex((a) => useSlugify(a.name) === newQueryVal);
      if (idx !== -1 && state.previewApp !== idx + projects.length) {
        state.previewApp = idx + projects.length;
      }
    }
  }
);

const store: ScreenStoreType = { state, dispatch };
provide("store", store);
</script>

<template>
  <ProjectsNavigation />
  <div
    :class="{
      'h-full w-full overflow-auto scroll': true,
      'bg-[#191919]': store.state.previewApp === 3,
      'bg-[#0d1117]': store.state.previewApp === 4,
    }"
  >
    <ProjectsWebsite />
    <ProjectsAbout />
    <ProjectsGithub />
  </div>
</template>
