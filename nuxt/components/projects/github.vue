<script setup lang="ts">
import { marked } from "marked";
import type { ProjectDataType } from "~/types/github";
import { useStorage } from "@vueuse/core";
// import githubMarkdownCss from "~/assets/github-markdown-dark.css";

const githubBaseURL = "https://github.com/";

// Props
// defineProps({
//   data: Object,
// });

const props = defineProps<{ data: ProjectDataType }>();

const {
  repoDetails,
  languages,
  contributors,
  branches,
  tags,
  readme,
  license,
}: ProjectDataType = props.data;
const isReadmeAvailable: ComputedRef<boolean> = computed(() => readme !== null);
const repoName: ComputedRef<string> = computed(() => repoDetails.full_name);
const blobAbsoluteUrl: ComputedRef<string> = computed(() => `${githubBaseURL + repoName.value}/blob/${repoDetails.default_branch
  }/`);

console.log('github.vue: props.data', props.data);

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
