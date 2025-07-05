<script setup lang="ts">
import type { OcticonsIconName } from "~/data/icons";
import type { NullableFileContent } from "~/types/github";
import type { RepositoryOverviewTabType } from "~/types/global";

const props = defineProps<{
  readmeData: NullableFileContent;
  licenseData: NullableFileContent;
  repoName: string;
  defaultBranch: string | undefined;
}>();

const tabs = computed<
  { icon: OcticonsIconName; text: RepositoryOverviewTabType }[]
>(() =>
  [
    props.readmeData
      ? { icon: "book" as OcticonsIconName, text: "README" }
      : null,
    props.licenseData
      ? { icon: "law" as OcticonsIconName, text: "MIT License" }
      : null,
  ].filter(
    (tab): tab is { icon: OcticonsIconName; text: RepositoryOverviewTabType } =>
      tab !== null
  )
);

const initialTab = tabs.value.length === 1 ? tabs.value[0].text : "README";

const previewTab = useState<RepositoryOverviewTabType>(
  `repository-overview-preview-tab:${props.repoName}`,
  () => initialTab
);
</script>

<template>
  <div class="border border-[#3d444d] rounded-md w-full mt-4">
    <div class="border-b border-[#3d444d] bg-[#0d1117] sticky top-0">
      <UiHeadingSrOnly>Repository files navigation</UiHeadingSrOnly>
      <div
        class="h-11 px-2 py-1.5 text-[#9198a1]"
        aria-label="Repository files"
      >
        <button
          v-for="{ icon, text } in tabs"
          :key="text"
          class="mx-0.5 px-1.5 py-0.5 repo-overview-button relative hover:bg-[#656c7633]"
          :aria-selected="previewTab === text"
          @click="previewTab = text"
        >
          <ProjectsOcticonsIcon :name="icon" />
          <span
            :class="{
              'm-1.5 text-[#f0f6fc] text-[15px]': true,
              'font-semibold': previewTab === text,
            }"
          >
            {{ text }}
          </span>
        </button>
      </div>
    </div>
    <div class="p-4">
      <ProjectsGithubRepositoryOverviewReadmeContainer
        v-show="previewTab === 'README' && readmeData"
        :readme-data="readmeData"
        :repo-name="repoName"
        :default-branch="defaultBranch"
      />
      <ProjectsGithubRepositoryOverviewLicenseDisplay
        v-show="previewTab === 'MIT License' && licenseData"
        :license-data="licenseData"
      />
    </div>
  </div>
</template>

<style>
.repo-overview-button::after {
  bottom: calc(50% - calc(var(--control-xlarge-size, 48px) / 2 + 1px));
  content: "";
  transform: translate(50%, 55%);
  @apply absolute right-1/2 w-full h-[2.16px] bg-transparent rounded-none;
}

.repo-overview-button[aria-current]:not([aria-current="false"])::after,
.repo-overview-button[aria-selected="true"]::after {
  @apply bg-[#fd8c73];
}
</style>
