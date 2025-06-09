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
  isLoading: false,
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

const safeJson = async (res: Response) => {
  try {
    const data = await res.json();
    return data.message?.includes("API rate limit exceeded") ? undefined : data;
  } catch (err) {
    log(["Error parsing response:", err], "error");
    return undefined;
  }
};

const safeContent = async (res: Response) => {
  const data = await safeJson(res);
  if (!data) return undefined;
  return data.message === "Not Found" ? null : data;
};

onMounted(async () => {
  state.isLoading = true;

  try {
    const fetchPromises = projects.map((project) => {
      const baseUrl = `https://api.github.com/repos/${project.repo}`;
      return Promise.all([
        fetch(baseUrl).then(safeJson),
        fetch(`${baseUrl}/languages`).then(safeJson),
        fetch(`${baseUrl}/contributors`).then(safeJson),
        fetch(`${baseUrl}/branches`).then(safeJson),
        fetch(`${baseUrl}/tags`).then(safeJson),
        fetch(`${baseUrl}/contents/LICENSE`).then(safeContent),
        fetch(`${baseUrl}/contents/README.md`).then(safeContent),
      ]);
    });

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
    log(["Data loaded successfully:", formattedData]);
  } catch (err) {
    log(["Error fetching data:", err], "error");
  } finally {
    state.isLoading = false;
  }
});

const isWebsiteComponentHidden = computed(() => store.state.previewApp !== 3);
const isGithubComponentVisible = computed(() => store.state.previewApp === 5);
const previewData = computed<ProjectDataType | undefined>(() => {
  if (store.state.data.length === 0) return undefined;
  const index = store.state.previewProject - 1;
  return store.state.data[index];
});

const isLoading = computed(() => store.state.isLoading);
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
      <div v-if="isLoading" class="flex items-center justify-center h-full">
        <div class="text-white">Loading data...</div>
      </div>
      <div v-else="previewData" class="h-full">
        <ProjectsGithub :data="previewData" />
      </div>
    </div>
  </div>
</template>
