<script setup lang="ts">
import { projects } from "~/data/projects";
import type { ProjectDataType } from "~/types/github";

import type {
  ScreenStoreActionType,
  ScreenStoreStateType,
  ScreenStoreType,
} from "~/types/store";

const state = reactive<ScreenStoreStateType>({
  previewProject: 1,
  previewApp: 3,
  data: [],
});

const isDataAvailable = computed<boolean>(() => state.data.length !== 0);

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

// For development purpose
// import response from "~/data/dev/tmp-fetch-all-response";
// store.state.data = response;

onMounted(async () => {
  const fetchPromises = projects.map((project) => {
    const baseUrl = `https://api.github.com/repos/${project.repo}`;
    return Promise.all([
      fetch(baseUrl).then((res) => res.json()), // repoDetails
      fetch(`${baseUrl}/languages`).then((res) => res.json()), // languages
      fetch(`${baseUrl}/contributors`).then((res) => res.json()), // contributors
      fetch(`${baseUrl}/branches`).then((res) => res.json()), // branches
      fetch(`${baseUrl}/tags`).then((res) => res.json()), // tags
      fetch(`${baseUrl}/contents/LICENSE`) // license
        .then(async (res) => {
          const data = await res.json();
          return data.message === "Not Found" ? null : data;
        }),
      fetch(`${baseUrl}/contents/README.md`) // readme
        .then(async (res) => {
          const data = await res.json();
          return data.message === "Not Found" ? null : data;
        }),
    ]);
  });

  try {
    const results = await Promise.all(fetchPromises);
    const formattedData: ProjectDataType[] = results.map(
      ([
        repoDetails,
        languages,
        contributors,
        branches,
        tags,
        license,
        readme,
      ]) => ({
        repoDetails,
        languages,
        contributors,
        branches,
        tags,
        license,
        readme,
      })
    );
    
    store.state.data = formattedData;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Error fetching data from GitHub API:", error);
    }
  }
});

const isWebsiteComponentHidden = computed(() => store.state.previewApp !== 3);
const isGithubComponentVisible = computed(() => store.state.previewApp === 5);
const previewData = computed<ProjectDataType>(
  () => store.state.data[store.state.previewProject - 1]
);
</script>

<template>
  <ProjectsFloatingDock />
  <div class="h-full w-full overflow-auto scroll">
    <ProjectsWebsite :hidden="isWebsiteComponentHidden" />
    <ProjectsAbout
      :preview-project="store.state.previewProject"
      :preview-app="store.state.previewApp"
    />
    <div v-show="isGithubComponentVisible" class="bg-[#0d1117] h-full">
      <ProjectsGithub v-if="isDataAvailable" :data="previewData" />
      <ProjectsScreenFallbackGithubUi
        v-else
        :repo="projects[store.state.previewProject - 1]?.repo"
      />
    </div>
  </div>
</template>

<style>
.scroll {
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: #5b5d61 #191919;
}

.scroll::-webkit-scrollbar {
  width: 8px;
}
</style>
