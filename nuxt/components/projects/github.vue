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
const blobAbsoluteUrl = `${githubBaseURL + repoName}/blob/${
  repoDetails.default_branch
}/`;
</script>

<template>
  <div>
    <InfoCard
      :repoData="repoDetails"
      :branchData="branches"
      :tagData="tags"
      :hasReadme="isReadmeAvailable"
    />

    <div class="px-4 bg-[#0d1117]">
      <RepositoryOverview
        v-if="readme || license"
        :readmeData="readme"
        :licenseData="license"
        :repoName="repoName"
        :blobAbsoluteUrl="blobAbsoluteUrl"
      />
      <Contributors :contributorData="contributors" :repoName="repoName" />
      <LanguagesUsed :languageData="languages" />
    </div>
  </div>
</template>

<template #infoCard>
  <script setup>
    import { useStorage } from "@vueuse/core";
    import numeral from "numeral";
    import {
      LawIcon,
      MarkGithubIcon,
      StarIcon,
      RepoForkedIcon,
      EyeIcon,
      GitBranchIcon,
      TagIcon,
      PulseIcon,
      GlobeIcon,
    } from "@primer/octicons-vue";

    const githubBaseURL = "https://github.com/";
    const formatNumber = (num) => new Intl.NumberFormat().format(num);

    // Props
    defineProps({
      repoData: Object,
      branchData: Array,
      tagData: Array,
      hasReadme: Boolean,
    });

    const {
      full_name,
      description,
      homepage,
      stargazers_count,
      forks_count,
      subscribers_count,
    } = repoData || {};
    const [userName, repositoryName] = full_name
      ? full_name.split("/")
      : ["", ""];

    const previewTab = useStorage(
      `home:projects:RepositoryOverview:${full_name}`,
      "README"
    );

    const updatePreviewTab = (tabName) => {
      previewTab.value = tabName;
    };

    const statItems = [
      {
        href: `${full_name}/stargazers`,
        icon: StarIcon,
        count: stargazers_count,
        what: "stars",
      },
      {
        href: `${full_name}/forks`,
        icon: RepoForkedIcon,
        count: forks_count,
        what: "forks",
      },
      {
        href: `${full_name}/watchers`,
        icon: EyeIcon,
        count: subscribers_count,
        what: "watching",
      },
      {
        href: `${full_name}/branches`,
        icon: GitBranchIcon,
        count: branchData.length,
        what: "Branch",
      },
      {
        href: `${full_name}/tags`,
        icon: TagIcon,
        count: tagData.length,
        what: "Tags",
      },
      {
        href: `${full_name}/activity`,
        icon: PulseIcon,
        count: null,
        what: "Activity",
      },
    ];
  </script>

  <template>
    <div class="p-4 border-b border-[#3d444d] text-[#9198a1]">
      <h2 class="space-y-4 text-2xl font-extrabold ml-1 mb-4 text-[#f0f6fc]">
        <a
          :href="githubBaseURL + full_name"
          target="_blank"
          rel="noopener"
          class="hover:underline"
        >
          <MarkGithubIcon size="32" class="mr-2" />
          <span class="text-xl text-[#9198a1]">{{ userName }}/</span>
          {{ repositoryName }}
        </a>
      </h2>
      <div class="space-y-4">
        <p v-if="description" class="text-base font-normal">
          {{ description }}
        </p>
        <Website v-if="homepage" :link="homepage" />
        <div v-if="hasReadme">
          <h3 hidden>License</h3>
          <button
            class="flex items-center gap-2 hover:text-blue-400"
            @click="updatePreviewTab('MIT license')"
          >
            <LawIcon class="fill-current" />
            <span class="text-sm">MIT license</span>
          </button>
        </div>
        <ul class="flex flex-wrap items-center gap-5 text-sm">
          <li v-for="item in statItems" :key="item.what">
            <a
              :href="githubBaseURL + item.href"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 text-current hover:text-blue-400"
            >
              <component :is="item.icon" class="fill-current" />
              <span v-if="item.count !== null" class="font-semibold">{{
                formatNumber(item.count)
              }}</span>
              <span>{{ item.what }}</span>
            </a>
          </li>
        </ul>
        <div class="inline-flex items-center gap-1 text-sm">
          <GlobeIcon fill="#9198a1" />
          <span>Public repository</span>
        </div>
      </div>
    </div>
  </template>
</template>
