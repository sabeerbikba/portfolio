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
└────────────┬───────────────┘     - Page loads
             │                     - Page is revisited (SPA)
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
│ - Initially shows: serverFetchedGithubData             │
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
  NullableGitHubFileContent,
  ProjectDataType,
} from "~/types/github";

const { githubBaseURL, repoOwner } = useRuntimeConfig().public;
const store = inject("store") as ScreenStoreType;

// - need to remove any types and replace that proper type



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
      fn: fetchSafeContent<NullableGitHubFileContent>,
    },
    {
      key: "readme",
      url: `${fullRepoName}/contents/README.md`,
      fn: fetchSafeContent<NullableGitHubFileContent>,
    },
  ] as const;

const clientFetchedGithubData = useState<ProjectDataType[]>(
  "clientFetchedGithubData",
  () =>
    projects.map(() =>
      Object.fromEntries(getEndpoints("_").map(({ key }) => [key, undefined]))
    ) as ProjectDataType[]
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

const { data: serverFetchedGithubData } = await useAsyncData<ProjectDataType[]>(
  "projects-data",
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
      // preserve null if it means "not found"
      merged[key] = clientVal !== undefined ? clientVal : serverVal;
    }

    return merged;
  })
);

// const refreshGithubData = async () => {
//   isGithubFreshDataLoading.value = true;

//   const updatedProjects = await Promise.all(
//     clientFetchedGithubData.value.map(async (project, i) => {
//       const repoSlug = projects[i].repo;
//       const baseUrl = GITHUB_API_BASEURL + repoSlug;
//       const updatedProject: ProjectDataType = { ...project };

//       await Promise.all(
//         getEndpoints(baseUrl).map(async ({ key, url, fn }) => {
//           if (!freshDataToLoad[key]) {
//             const data = await fn(url);
//             if (data !== undefined) {
//               (updatedProject as any)[key] = data;
//               freshDataToLoad[key] = true;
//             }
//           }
//         })
//       );

//       return updatedProject;
//     })
//   );

//   clientFetchedGithubData.value = updatedProjects;
//   allFreshDataLoaded.value = Object.values(freshDataToLoad).every(Boolean);
//   isGithubFreshDataLoading.value = false;
// };

const isGithubComponentVisible = computed<boolean>(
  () => store.state.previewApp === 5
);

onMounted(async () => {
  const hasMissingGithubData = clientFetchedGithubData.value.some((obj) =>
    Object.values(obj).some((v) => v === undefined)
  );

  if (hasMissingGithubData) {
    console.log(
      "before clientFetchedGithubData.value: ",
      clientFetchedGithubData.value
    );
    isGithubFreshDataLoading.value = true;
    await fetchMissingClientGithubData();
    // TODO: TMP
    isGithubFreshDataLoading.value = false;
    console.log(
      "after clientFetchedGithubData.value: ",
      clientFetchedGithubData.value
    );
  }

  console.log("hasMissingGithubData: ", hasMissingGithubData);
  console.log("serverFetchedGithubData.value: ", serverFetchedGithubData.value);
});
</script>

<template>
  <div v-show="isGithubComponentVisible" class="h-full">
    <!-- if it's good loading need to always render and stay in backgroudn using z-index something -->
    <!--  -->

    <!-- <ClientOnly>
      <div v-if="isGithubFreshDataLoading" class="center w-full h-full">
        <span
          v-for="(_, i) in 3"
          :key="i"
          :class="[
            'inline-block w-[3px] h-[20px] rounded-[10px] bg-white/50 animate-scale-up4',
            i === 1 && 'h-[35px] mx-[5px] [animation-delay:0.25s]',
            i === 2 && '[animation-delay:0.5s]',
          ]"
        />
      </div>
    </ClientOnly> -->
    <div
      v-show="
        store.state.previewProject === index + 1 && !isGithubFreshDataLoading
      "
      v-for="(project, index) in mergedGithubData"
      :class="{
        'h-full bg-[#0d1117]': true,
        center: !Object.values(project ?? {}).some((val) => val !== undefined),
      }"
    >
      <!-- This condition -->
      <template
        v-if="Object.values(project ?? {}).some((val) => val !== undefined)"
      >
        <ProjectsGithubInfoCard
          :repoData="project.repoDetails"
          :branchData="project.branches"
          :tagData="project.tags"
          :hasLicense="Boolean(project.license)"
          :isPublicRepo="!project.repoDetails?.private"
        />
        <div class="px-4">
          <ProjectsGithubRepositoryOverview
            v-if="project.license || project.readme"
            :readmeData="project.readme"
            :licenseData="project.license"
            :repoName="project.repoDetails?.full_name || projects[index].repo"
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
          !Object.values(project ?? {}).some((val) => val !== undefined)
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
