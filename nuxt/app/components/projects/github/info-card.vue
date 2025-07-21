<script setup lang="ts">
import type { RepositoryOverviewTabType } from "~/types/global";
import type {
  GitHubRepositoryType,
  GithubBranchesType,
  GithubTagsType,
} from "~/types/github";
import type { OcticonsIconName } from "~/data/icons";

const { repoData, branchData, tagData, hasLicense, isPublicRepo } =
  defineProps<{
    repoData: GitHubRepositoryType;
    branchData: GithubBranchesType;
    tagData: GithubTagsType;
    hasLicense: boolean;
    isPublicRepo: boolean;
  }>();

const { githubBaseURL } = useRuntimeConfig().public;

const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);

const full_name = computed(() => repoData?.full_name);
const description = computed(() => repoData?.description);
const homepage = computed(() => repoData?.homepage);
const stargazers_count = computed(() => repoData?.stargazers_count);
const forks_count = computed(() => repoData?.forks_count);
const subscribers_count = computed(() => repoData?.subscribers_count);
const repo_name = computed(() => repoData?.name);
const repo_owner = computed(() => repoData?.owner.login);

const previewTab = useState<RepositoryOverviewTabType>(
  `repository-overview-preview-tab:${full_name.value}`
);

const stats = computed<
  { href: string; icon: OcticonsIconName; count: number | null; what: string }[]
>(() => [
  {
    href: `${full_name.value}/stargazers`,
    icon: "star",
    count: stargazers_count.value ?? null,
    what: "stars",
  },
  {
    href: `${full_name.value}/forks`,
    icon: "repo-forked",
    count: forks_count.value ?? null,
    what: "forks",
  },
  {
    href: `${full_name.value}/watchers`,
    icon: "eye",
    count: subscribers_count.value ?? null,
    what: "watching",
  },
  {
    href: `${full_name.value}/branches`,
    icon: "git-branch",
    count: branchData?.length ?? null,
    what: "Branch",
  },
  {
    href: `${full_name.value}/tags`,
    icon: "tag",
    count: tagData?.length ?? null,
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
        <ProjectsOcticonsIcon name="mark-github-24" class="mr-2" />
        <span class="text-xl text-[#9198a1]">{{ repo_owner }}/</span>
        {{ repo_name }}
      </UiExternalLink>
    </h2>
    <div class="space-y-4">
      <p v-if="description" class="text-base font-normal">
        {{ description }}
      </p>
      <UiExternalLink
        v-if="homepage"
        :href="homepage"
        class="text-[#58a6ff] hover:underline inline-flex items-center gap-2 group"
      >
        <ProjectsOcticonsIcon
          name="link"
          class="!text-[#9198a1] group-hover:!text-blue-400"
        />
        {{ homepage ? homepage.split("://")[1] : "" }}
      </UiExternalLink>
      <div v-if="hasLicense">
        <UiHeadingSrOnly as="h3">License</UiHeadingSrOnly>
        <button
          type="button"
          class="flex items-center gap-2 hover:text-blue-400"
          @click="previewTab = 'MIT License'"
        >
          <ProjectsOcticonsIcon name="law" class="fill-current" />
          <span class="text-sm">MIT license</span>
        </button>
      </div>
      <ul
        class="flex flex-wrap items-center gap-5 max-md:gap-4 max-sm:gap-3 max-xs:gap-2 text-sm"
      >
        <li v-for="{ href, icon, count, what } in stats" :key="what">
          <UiExternalLink
            :href="`${githubBaseURL + href}`"
            class="github-info-card-stats-link"
          >
            <ProjectsOcticonsIcon :name="icon" class="fill-current" />
            <span v-if="count != null" class="font-semibold">
              {{ formatNumber(count || 0) }}
            </span>
            <span>{{ what }}</span>
          </UiExternalLink>
        </li>
      </ul>
      <div
        v-if="isPublicRepo"
        class="inline-flex items-center gap-[0.625rem] text-sm"
      >
        <ProjectsOcticonsIcon name="globe" />
        <span>Public repository</span>
      </div>
    </div>
  </div>
</template>

<style>
.github-info-card-stats-link {
  @apply inline-flex items-center gap-2 text-current hover:text-blue-400;
}
</style>
