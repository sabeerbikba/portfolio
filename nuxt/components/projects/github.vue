<script setup lang="ts">
import type { ProjectDataType } from "~/types/github";
import { toRefs } from "vue";

const { githubBaseURL } = useRuntimeConfig().public;
const props = defineProps<{ data: ProjectDataType }>();

// TODO: add types 
const repoDetails = computed(() => props.data.repoDetails);
const languages = computed(() => props.data.languages);
const contributors = computed(() => props.data.contributors);
const branches = computed(() => props.data.branches);
const tags = computed(() => props.data.tags);
const readme = computed(() => props.data.readme);
const license = computed(() => props.data.license);
const isReadmeAvailable: ComputedRef<boolean> = computed(() => readme !== null);
const repoName: ComputedRef<string> = computed(() => repoDetails.value.full_name);
const blobAbsoluteUrl: ComputedRef<string> =
  computed(() => `${githubBaseURL + repoName.value}/blob/${repoDetails.value.default_branch}/`);
</script>

<template>
  <div>
    <ProjectsGithubInfoCard :repoData="repoDetails" :branchData="branches" :tagData="tags"
      :hasReadme="isReadmeAvailable" />
    <div class="px-4 bg-[#0d1117]">
      <ProjectsGithubRepositoryOverview v-if="readme || license" :readmeData="readme" :licenseData="license"
        :repoName="repoName" :blobAbsoluteUrl="blobAbsoluteUrl" />
      <ProjectsGithubContributors :contributorData="contributors" :repoName="repoName" />
      <ProjectsGithubLanguagesUsed :languageData="languages" />
    </div>
  </div>
</template>
