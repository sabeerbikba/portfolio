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

const props = defineProps<{
  data: ProjectDataType | undefined;
  isLoading: boolean;
}>();
const store = inject("store") as ScreenStoreType;

const getComputedProp = <T>(key: keyof NonNullable<ProjectDataType>) => {
  return computed(() => props.data?.[key] as T);
};

const isAvailable = <T>(
  source: Ref<T | null | undefined>
): ComputedRef<boolean> => {
  return computed(() => source.value !== null && source.value !== undefined);
};

const repoDetails = getComputedProp<GitHubRepositoryType>("repoDetails");
const languages = getComputedProp<GitHubLanguagesType>("languages");
const contributors = getComputedProp<GitHubContributorType>("contributors");
const branches = getComputedProp<GithubBranchesType>("branches");
const tags = getComputedProp<GithubTagsType>("tags");
const readme = getComputedProp<NullableGitHubFileContent>("readme");
const license = getComputedProp<NullableGitHubFileContent>("license");
const repoName = computed<string>(
  () => projects[store.state.previewProject - 1]?.repo
);

const isDataAvailable = computed<boolean>(
  () =>
    props.data?.repoDetails !== undefined ||
    Object.values(props.data ?? {}).some((val) => val !== undefined)
);
const isReadmeAvailable = isAvailable(readme);
const isGithubContributorsAvailable = isAvailable(contributors);
const isGithubLanguagesUsedAvailable = isAvailable(languages);
const isGithubComponentVisible = computed(() => store.state.previewApp === 5);
</script>

<template>
  <div v-show="isGithubComponentVisible" class="bg-[#0d1117] h-full">
    <div v-if="isLoading" class="center w-full h-full">
      <span
        v-for="(bar, i) in 3"
        :key="i"
        :class="[
          'inline-block w-[3px] h-[20px] rounded-[10px] bg-white/50 animate-scale-up4',
          i === 1 && 'h-[35px] mx-[5px] [animation-delay:0.25s]',
          i === 2 && '[animation-delay:0.5s]',
        ]"
      />
    </div>
    <div v-else class="h-full">
      <div v-if="isDataAvailable">
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
          />
          <ProjectsGithubContributors
            v-if="isGithubContributorsAvailable"
            :contributorData="contributors"
            :repoName="repoName"
          />
          <ProjectsGithubLanguagesUsed
            v-if="isGithubLanguagesUsedAvailable"
            :languageData="languages"
            :repoName="repoName"
          />
        </div>
      </div>
      <ProjectsScreenFallbackGithubUi
        v-if="!isDataAvailable"
        :repoName="repoName"
      />
    </div>
  </div>
</template>
