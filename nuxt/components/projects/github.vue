<script setup lang="ts">
import { projects } from "~/data/projects";
import type { ScreenStoreType } from "~/types/store";
import type {
  GitHubContributorType,
  GithubBranchesType,
  GitHubLanguagesType,
  GitHubRepositoryType,
  GithubTagsType,
  NullableGitHubFileContent,
  ProjectDataType,
} from "~/types/github";

const props = defineProps<{ data: ProjectDataType }>();
const store = inject("store") as ScreenStoreType;
const { githubBaseURL } = useRuntimeConfig().public;

const isDataAvailable = computed<boolean>(
  () => props.data.repoDetails === undefined || props.data === undefined
);
const repoDetails = computed<GitHubRepositoryType>(
  () => props.data.repoDetails
);
const languages = computed<GitHubLanguagesType>(() => props.data.languages);
const contributors = computed<GitHubContributorType>(
  () => props.data.contributors
);
const branches = computed<GithubBranchesType>(() => props.data.branches);
const tags = computed<GithubTagsType>(() => props.data.tags);
const readme = computed<NullableGitHubFileContent>(() => props.data.readme);
const license = computed<NullableGitHubFileContent>(() => props.data.license);

const isReadmeAvailable = computed<boolean>(() => readme !== null);
// const repoName = computed<string | undefined>(() => repoDetails.value?.full_name);
const repoName = computed<string>(
  () => projects[store.state.previewProject - 1]?.repo
);
// const blobAbsoluteUrl = computed<string | undefined>(
//   () =>
//     `${githubBaseURL + repoName.value}/blob/${
//       repoDetails.value?.default_branch
//     }/`
// );
// TODO: how this link work is really needed 
const blobAbsoluteUrl = computed<string>(
  () => "sabeerbikba/dev.tool/blob/nextjs-back-end"
);

// sabeerbikba/dev.tool/blob/nextjs-back-end
</script>

<template>
  <!-- which is good v-if or v-show -->
  <div v-if="isDataAvailable">
    <!-- <ProjectsGithubInfoCard
      :repoData="repoDetails"
      :branchData="branches"
      :tagData="tags"
      :hasReadme="isReadmeAvailable"
    /> -->
    <div class="px-4 bg-[#0d1117]">
      <ProjectsGithubRepositoryOverview
        v-if="readme || license"
        :readmeData="readme"
        :licenseData="license"
        :repoName="repoName"
        :blobAbsoluteUrl="blobAbsoluteUrl"
      />
      <ProjectsGithubContributors
        :contributorData="contributors"
        :repoName="repoName"
      />
      <ProjectsGithubLanguagesUsed
        :languageData="languages"
        :repoName="repoName"
      />
    </div>
  </div>
  <ProjectsScreenFallbackGithubUi
    v-if="!isDataAvailable"
    :repoName="repoName"
  />
</template>
