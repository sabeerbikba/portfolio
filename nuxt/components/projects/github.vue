<script setup lang="ts">
/**
📘 Flow Overview: 

┌────────────────────────────────────────────────────────┐
│   clientFetchedGithubData (useState)                   │
├────────────────────────────────────────────────────────┤
│ - Initialized with all fields = `undefined`            │
│ - Shape matches ProjectDataType                        │
│ - Purpose: Mark all GitHub fields as "need to fetch"   │
└────────────────────────────────────────────────────────┘
             │
             ▼
┌────────────────────────────┐
│        onMounted()         │ ◄─ Runs when:
└────────────┬───────────────┘     - Page initially loads
             │                     - Page (route) is revisited (SPA)
             ▼
┌────────────────────────────────────────────────┐
│ Check if any value in                          │`
│ clientFetchedGithubData is `undefined`         │
│ (i.e., not fetched yet)                        │
└────────────┬───────────────────────────────────┘
             │
             ├── Yes ──▶ Call fetchMissingGithubData()
             │          ┌────────────────────────────────────────────┐
             │          │ Fetches missing GitHub fields only         │
             │          │ Updates clientFetchedGithubData in-place   │
             │          └────────────────────────────────────────────┘
             │
             ▼
┌───────────────────────────────────────────────────────┐
│ Use mergedGithubData (computed ref)                   │
├───────────────────────────────────────────────────────┤
│ - Combines:                                           │
│     clientFetchedGithubData + serverFetchedGithubData │
│                                                       │
│ - Rule:                                               │
│     If client has value ≠ undefined → use it          │
│     Else fallback to server data                      │
│     Nulls are preserved (means file not found)        │
└───────────────────────────────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────────┐
│ Used in UI rendering                                   │
├────────────────────────────────────────────────────────┤
│ - Initially shows: serverFetchedGithubData - SSR       │
│ - Updates live: as clientFetchedGithubData gets filled │
└────────────────────────────────────────────────────────┘
 */

import { projects } from "~/data/projects";
import type { ScreenStoreType } from "~/types/store";
import type {
  GithubBranchesType,
  GitHubContributorType,
  GitHubLanguagesType,
  GitHubRepositoryType,
  GithubTagsType,
  NullableFileContent,
  ProjectDataType,
} from "~/types/github";

const { githubBaseURL, repoOwner } = useRuntimeConfig().public;
const store = inject("store") as ScreenStoreType;

const ABORT_TIMEOUT: number = 8000;
const GITHUB_API_BASEURL: string = "https://api.github.com/repos/";
const isGithubFreshDataLoading = ref(false);

const createAbortSignal = (timeout = ABORT_TIMEOUT): AbortSignal => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  return controller.signal;
};

// fetchSafeJson: returns data or undefined if fetch fails (e.g., network/server error)
const fetchSafeJson = async <T>(api: string): Promise<T | undefined> => {
  const signal = import.meta.browser ? createAbortSignal() : undefined;
  return $fetch<T>(api, { signal }).catch(() => undefined);
};

// fetchSafeContent: returns data, null if file not found (404), or undefined on other errors
const fetchSafeContent = async <T>(
  api: string
): Promise<T | null | undefined> => {
  const signal = import.meta.browser ? createAbortSignal() : undefined;
  return $fetch<T>(api, { signal }).catch((err) =>
    err?.data?.message === "Not Found" ? null : undefined
  );
};

const getEndpoints = (fullRepoName: string) =>
  [
    {
      key: "branches",
      url: `${fullRepoName}/branches`,
      fn: fetchSafeJson<GithubBranchesType>,
    },
    {
      key: "contributors",
      url: `${fullRepoName}/contributors`,
      fn: fetchSafeJson<GitHubContributorType>,
    },
    {
      key: "languages",
      url: `${fullRepoName}/languages`,
      fn: fetchSafeJson<GitHubLanguagesType>,
    },
    {
      key: "repoDetails",
      url: fullRepoName,
      fn: fetchSafeJson<GitHubRepositoryType>,
    },
    {
      key: "tags",
      url: `${fullRepoName}/tags`,
      fn: fetchSafeJson<GithubTagsType>,
    },

    // Contents
    {
      key: "license",
      url: `${fullRepoName}/contents/LICENSE`,
      fn: fetchSafeContent<NullableFileContent>,
    },
    {
      key: "readme",
      url: `${fullRepoName}/contents/README.md`,
      fn: fetchSafeContent<NullableFileContent>,
    },
  ] as const;

const clientFetchedGithubData = useState<ProjectDataType[]>(
  "client-fetched-github-data",
  () =>
    projects.map(() =>
      Object.fromEntries(getEndpoints("_").map(({ key }) => [key, undefined]))
    ) as ProjectDataType[]
);

const fetchProjectData = async (): Promise<ProjectDataType[]> =>
  await Promise.all(
    projects.map((project) =>
      (async (repoPath: string) => {
        const baseUrl = GITHUB_API_BASEURL + repoPath;
        const endpoints = getEndpoints(baseUrl);
        const results = await Promise.all(endpoints.map((e) => e.fn(e.url)));

        return endpoints.reduce((acc, e, i) => {
          acc[e.key] = results[i];
          return acc;
        }, {} as Record<(typeof endpoints)[number]["key"], any>);
      })(project.repo)
    )
  );

const fetchMissingClientGithubData = async () => {
  const allProjects = clientFetchedGithubData.value;

  await Promise.all(
    allProjects.map(async (projectData, index) => {
      const repo = projects[index].repo;
      const endpoints = getEndpoints(GITHUB_API_BASEURL + repo);

      await Promise.all(
        endpoints.map(async ({ key, url, fn }) => {
          if (projectData[key] === undefined) {
            const data = await fn(url);

            if (data !== undefined) {
              (projectData as any)[key] = data;
            }
          }
        })
      );
    })
  );
};

const { data: serverFetchedGithubData } = await useAsyncData<ProjectDataType[]>(
  "server-fetched-github-data",
  fetchProjectData,
  {
    default: () => [],
  }
);

const mergedGithubData = computed<ProjectDataType[]>(() =>
  clientFetchedGithubData.value.map((clientData, i) => {
    const serverData = serverFetchedGithubData.value?.[i] || {};
    const keys = Object.keys(clientData) as (keyof ProjectDataType)[];

    const merged = {} as ProjectDataType;

    for (const key of keys) {
      const clientVal = clientData[key];
      const serverVal = serverData[key];

      // @ts-ignore
      merged[key] = clientVal !== undefined ? clientVal : serverVal;
    }

    return merged;
  })
);

const isGithubComponentVisible = computed<boolean>(
  () => store.state.previewApp === 5
);

const hasAnyGithubDataAvailable = (project?: ProjectDataType): boolean =>
  Object.values(project ?? {}).some((val) => val !== undefined);

/**
 * ⚠️ Dev Mode Caveat:
 * In development, due to hydration timing and possible fetch failures,
 * - `serverFetchedGithubData` may be late or empty on client
 * - triggers extra fetch from client even when data exists
 * - causes temporary fallback component or loading state
 *
 * ✅ In production, hydration and SSR rehydration are stable, and this works as expected.
 */

onMounted(async () => {
  const hasMissingGithubData = clientFetchedGithubData.value.some((obj) =>
    Object.values(obj).some((v) => v === undefined)
  );

  if (hasMissingGithubData) {
    isGithubFreshDataLoading.value = true;
    await fetchMissingClientGithubData();
    isGithubFreshDataLoading.value = false;
  }
});
</script>

<template>
  <div v-show="isGithubComponentVisible" class="h-full">
    <div v-if="isGithubFreshDataLoading" class="center wh-full">
      <span
        v-for="(_, i) in 3"
        :key="i"
        :class="[
          'loader-bar',
          i === 1 && 'loader-bar-center',
          i === 2 && 'loader-bar-right',
        ]"
      />
    </div>
    <div
      v-for="(project, index) in mergedGithubData"
      v-show="
        store.state.previewProject === index + 1 && !isGithubFreshDataLoading
      "
      :key="index"
      :class="{
        'h-full bg-[#0d1117]': true,
        center: !hasAnyGithubDataAvailable(project),
      }"
    >
      <template v-if="hasAnyGithubDataAvailable(project)">
        <ProjectsGithubInfoCard
          :repoData="project.repoDetails"
          :branchData="project.branches"
          :tagData="project.tags"
          :hasLicense="Boolean(project.license)"
          :isPublicRepo="!project.repoDetails?.private"
        />
        <div class="px-4 bg-[#0d1117]">
          <ProjectsGithubRepositoryOverview
            v-if="project.license || project.readme"
            :readmeData="project.readme"
            :licenseData="project.license"
            :repoName="project.repoDetails?.full_name || projects[index].repo"
            :defaultBranch="
              project.repoDetails?.default_branch ||
              (index === 1 ? 'nextjs-back-end' : 'main')
            "
          />
          <ProjectsGithubContributors
            v-if="
              project.contributors?.length || project.contributors !== undefined
            "
            :contributorData="project.contributors"
            :repoName="project.repoDetails?.full_name || projects[index].repo"
          />
          <ProjectsGithubLanguagesUsed
            v-if="Object.keys(project.languages || {}).length"
            :languageData="project.languages"
            :repoName="project.repoDetails?.full_name || projects[index].repo"
          />
        </div>
      </template>
      <div
        v-if="
          store.state.previewProject === index + 1 &&
          !hasAnyGithubDataAvailable(project)
        "
        class="max-xs:rounded-md rounded-xl bg-white p-2 max-md:p-1 border-slate-100 text-black max-xs:text-lg max-md:text-xl text-2xl"
      >
        <UiExternalLink
          :href="githubBaseURL + projects[index].repo"
          class="border-2 max-xs:p-0.5 max-xs:py-1 max-md:p-1 max-md:py-2 p-2 py-3 border-black max-xs:rounded-md rounded-xl flex"
        >
          <span class="text-xl max-xs:text-base max-md:text-lg pt-[2px]">
            {{ repoOwner }}/
          </span>
          {{ projects[index].name.toLowerCase() }}
          <ProjectsOcticonsIcon
            name="mark-github-24"
            class="fill-current ml-2"
          />
        </UiExternalLink>
      </div>
    </div>
  </div>
</template>

<style>
.loader-bar {
  @apply inline-block w-[3px] h-[20px] rounded-[10px] bg-white/50 animate-scale-up4;
}

.loader-bar-center {
  @apply h-[35px] mx-[5px];
  animation-delay: 0.25s;
}

.loader-bar-right {
  animation-delay: 0.5s;
}
</style>
