<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import numeral from "numeral";

import type { IconName } from "@primer/octicons";
import type {
  GitHubRepositoryType,
  GithubBranchesType,
  GithubTagsType,
} from "~/types/github";

const props = defineProps<{
  repoData: GitHubRepositoryType;
  branchData: GithubBranchesType;
  tagData: GithubTagsType;
  hasReadme: boolean;
}>();

const isHoveredWebsiteLink = ref<boolean>(false);
const { githubBaseURL } = useRuntimeConfig().public;

const full_name = computed(() => props.repoData.full_name);
const description = computed(() => props.repoData.description);
const homepage = computed(() => props.repoData.homepage);
const stargazers_count = computed(() => props.repoData.stargazers_count);
const forks_count = computed(() => props.repoData.forks_count);
const subscribers_count = computed(() => props.repoData.subscribers_count);
const repo_name = computed(() => props.repoData.name);
const repo_owner = computed(() => props.repoData.owner.login);
const previewTab = useLocalStorage(
  `home:projects:RepositoryOverview:${full_name.value}`,
  "README"
);

const formatNumber = (num: number) => numeral(num).format("0.[0]a");

const stats = computed<
  { href: string; icon: IconName; count: number | null; what: string }[]
>(() => [
  {
    href: `${full_name.value}/stargazers`,
    icon: "star",
    count: stargazers_count.value,
    what: "stars",
  },
  {
    href: `${full_name.value}/forks`,
    icon: "repo-forked",
    count: forks_count.value,
    what: "forks",
  },
  {
    href: `${full_name.value}/watchers`,
    icon: "eye",
    count: subscribers_count.value,
    what: "watching",
  },
  {
    href: `${full_name.value}/branches`,
    icon: "git-branch",
    count: props.branchData.length,
    what: "Branch",
  },
  {
    href: `${full_name.value}/tags`,
    icon: "tag",
    count: props.tagData.length,
    what: "Tags",
  },
  {
    href: `${full_name.value}/activity`,
    icon: "pulse",
    count: null,
    what: "Activity",
  },
]);
</script>

<template>
  <div class="p-4 border-b border-[#3d444d] text-[#9198a1]">
    <h2 class="space-y-4 text-2xl font-extrabold ml-1 mb-4 text-[#f0f6fc]">
      <UiExternalLink
        :href="`${githubBaseURL + full_name}`"
        class="hover:underline"
      >
        <ProjectsIcon name="mark-github" :size="32" class="mr-2" />
        <span class="text-xl text-[#9198a1]">{{ repo_owner }}/</span>
        {{ repo_name }}
      </UiExternalLink>
    </h2>
    <div class="space-y-4">
      <p v-if="description" class="text-base font-normal">{{ description }}</p>
      <UiExternalLink
        v-if="homepage"
        :href="homepage"
        class="text-[#58a6ff] hover:underline inline-flex items-center gap-2"
        @mouseenter="isHoveredWebsiteLink = true"
        @mouseleave="isHoveredWebsiteLink = false"
      >
        <ProjectsGithubLinkIcon
          :class="isHoveredWebsiteLink ? '!text-blue-400' : '!text-[#9198a1]'"
        />
        {{ homepage.split("://")[1] }}
      </UiExternalLink>
      <div v-if="hasReadme">
        <h3 hidden>License</h3>
        <button
          class="flex items-center gap-2 hover:text-blue-400"
          @click="previewTab = 'MIT License'"
        >
          <ProjectsIcon name="law" class="fill-current" />
          <span class="text-sm">MIT license</span>
        </button>
      </div>
      <ul class="flex flex-wrap items-center gap-5 text-sm">
        <li v-for="{ href, icon, count, what } in stats" :key="what">
          <UiExternalLink
            :href="`${githubBaseURL + href}`"
            class="inline-flex items-center gap-2 text-current hover:text-blue-400"
          >
            <ProjectsIcon :name="icon" class="fill-current" />
            <span v-if="count != null" class="font-semibold">
              {{ formatNumber(count) }}
            </span>
            <span>{{ what }}</span>
          </UiExternalLink>
        </li>
      </ul>
      <div class="inline-flex items-center gap-1 text-sm">
        <ProjectsIcon name="globe" />
        <span>Public repository</span>
      </div>
    </div>
  </div>
</template>
