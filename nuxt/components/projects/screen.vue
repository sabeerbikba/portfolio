<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { apps, projects } from "~/data/projects";
import type {
  ProjectPayloadType,
  AppPayloadType,
  ScreenStoreActionType,
  ScreenStoreStateType,
  ScreenStoreType,
} from "~/types/store";

const state = reactive<ScreenStoreStateType>({
  previewProject: 1,
  previewApp: 3,
});

const project = useRouteQuery<ProjectPayloadType>("project", "dev-tools");
const app = useRouteQuery<AppPayloadType>("app", "website");

const initAppIdx = apps.findIndex((a) => useSlugify(a.name) === app.value);
const initProjectIdx = projects.findIndex(
  (p) => useSlugify(p.name) === project.value
);

if (initProjectIdx !== -1) {
  state.previewProject = initProjectIdx + 1;
}

if (initAppIdx !== -1) {
  state.previewApp = initAppIdx + projects.length + 1;
}

const setRouteQueryVal = (payload: number, type: "project" | "app") => {
  if (type === "project") {
    project.value = useSlugify(
      projects[payload - 1].name
    ) as ProjectPayloadType;
  }

  if (type === "app") {
    app.value = useSlugify(
      apps[payload - (projects.length + 1)].name
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
  [() => state.previewProject, () => project.value],
  ([newStoreVal, newQueryVal]) => {
    const expectedSlug = useSlugify(projects[newStoreVal - 1].name);
    if (newQueryVal !== expectedSlug) {
      project.value = expectedSlug as ProjectPayloadType;
    } else {
      const idx = projects.findIndex((p) => useSlugify(p.name) === newQueryVal);
      if (idx !== -1 && state.previewProject !== idx + 1) {
        state.previewProject = idx + 1;
      }
    }
  }
);

watch(
  [() => state.previewApp, () => app.value],
  ([newStoreVal, newQueryVal]) => {
    const expectedSlug = useSlugify(
      apps[newStoreVal - (projects.length + 1)].name
    );
    if (newQueryVal !== expectedSlug) {
      app.value = expectedSlug as AppPayloadType;
    } else {
      const idx = apps.findIndex((a) => useSlugify(a.name) === newQueryVal);
      if (idx !== -1 && state.previewApp !== idx + projects.length + 1) {
        state.previewApp = idx + projects.length + 1;
      }
    }
  }
);

const store: ScreenStoreType = { state, dispatch };
provide("store", store);
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
    <ProjectsWebsite />
    <ProjectsAbout />
    <ProjectsGithub />
  </div>
</template>
