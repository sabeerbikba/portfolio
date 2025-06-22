<script setup lang="ts">
import type { NullableGitHubFileContent } from "~/types/github";
import type { OcticonsIconName } from "~/types/icons";

type RepositoryOverviewTabType = "README" | "MIT License";

const props = defineProps<{
  readmeData: NullableGitHubFileContent;
  licenseData: NullableGitHubFileContent;
  repoName: string;
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
  `RepositoryOverview:${props.repoName}`,
  () => initialTab
);
</script>

<template>
  <div class="border border-[#3d444d] rounded-md w-full mt-4">
    <div class="border-b border-[#3d444d] bg-[#0d1117] sticky top-0">
      <h2 class="sr-only">Repository files navigation</h2>
      <div
        class="h-11 px-2 py-1.5 text-[#9198a1]"
        aria-label="Repository files"
      >
        <button
          v-for="{ icon, text } in tabs"
          :key="text"
          @click="previewTab = text"
          class="mx-0.5 px-1.5 py-0.5 repo-overview-button relative hover:bg-[#656c7633]"
          :aria-selected="previewTab === text"
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
      <ProjectsGithubRepositoryOverviewReadmeShadowContainer
        v-show="previewTab === 'README' && readmeData"
        :readmeData="readmeData"
        :repoName="repoName"
      />
      <ProjectsGithubRepositoryOverviewLicenseDisplay
        v-show="previewTab === 'MIT License' && licenseData"
        :licenseData="licenseData"
      />
    </div>
  </div>
</template>

<style>
.repo-overview-button::after {
  position: absolute;
  right: 50%;
  bottom: calc(50% - calc(var(--control-xlarge-size, 48px) / 2 + 1px));
  width: 100%;
  height: 2.16px;
  content: "";
  background-color: transparent;
  border-radius: 0;
  transform: translate(50%, 55%);
}

.repo-overview-button[aria-current]:not([aria-current="false"])::after,
.repo-overview-button[aria-selected="true"]::after {
  background-color: #fd8c73;
}
</style>
