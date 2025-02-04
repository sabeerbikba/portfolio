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
const isReadmeAvailable = readme !== null;
const repoName = repoDetails.full_name;
const blobAbsoluteUrl = `${githubBaseURL + repoName}/blob/${repoDetails.default_branch
  }/`;

console.log('github.vue: props.data', props.data);

</script>

<template>
  <div>
    <ProjectsGithubInfoCard :repoData="repoDetails" :branchData="branches" :tagData="tags"
      :hasReadme="isReadmeAvailable" />

    <!-- <div class="px-4 bg-[#0d1117]">
      <ProjectsRepositoryOverview v-if="readme || license" :readmeData="readme" :licenseData="license"
        :repoName="repoName" :blobAbsoluteUrl="blobAbsoluteUrl" />
      <ProjectsContributors :contributorData="contributors" :repoName="repoName" />
      <ProjectsLanguagesUsed :languageData="languages" />
    </div> -->
  </div>
</template>
