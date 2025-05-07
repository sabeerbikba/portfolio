<script setup lang="ts">
import type {
  GitHubContributorType,
  GithubBranchesType,
  GitHubLanguagesType,
  GitHubRepositoryType,
  GithubTagsType,
  NullableGitHubFileContent,
  ProjectDataType,
} from "~/types/github";

const { githubBaseURL } = useRuntimeConfig().public;
const props = defineProps<{ data: ProjectDataType }>();

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
const repoName = computed<string>(() => repoDetails.value.full_name);
const blobAbsoluteUrl = computed<string>(
  () =>
    `${githubBaseURL + repoName.value}/blob/${
      repoDetails.value.default_branch
    }/`
);
</script>

<template>
  <div>
    <ProjectsGithubInfoCard
      :repoData="repoDetails"
      :branchData="branches"
      :tagData="tags"
      :hasReadme="isReadmeAvailable"
    />
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
</template>
