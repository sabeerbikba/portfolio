<script setup lang="ts">
import {
  ProjectsGithubRepositoryOverviewLicenseDisplay,
  ProjectsGithubRepositoryOverviewReadmeContainer,
} from "#components";
import type { OcticonsIconName } from "~/data/icons";
import type { NullableFileContent } from "~/types/github";
import type { RepositoryOverviewTabType } from "~/types/global";

const { readmeData, licenseData, repoName, defaultBranch } = defineProps<{
  readmeData: NullableFileContent;
  licenseData: NullableFileContent;
  repoName: string;
  defaultBranch: string | undefined;
}>();

const tabs = computed<
  { icon: OcticonsIconName; text: RepositoryOverviewTabType }[]
>(() =>
  [
    readmeData ? { icon: "book" as OcticonsIconName, text: "README" } : null,
    licenseData
      ? { icon: "law" as OcticonsIconName, text: "MIT License" }
      : null,
  ].filter(
    (tab): tab is { icon: OcticonsIconName; text: RepositoryOverviewTabType } =>
      tab !== null
  )
);

const initialTab = tabs.value.length === 1 ? tabs.value[0].text : "README";
const previewTab = useState<RepositoryOverviewTabType>(
  `repository-overview-preview-tab:${repoName}`,
  () => initialTab
);

const repoProject = computed(() => repoName.split("/").pop());

const getTabComponent = (tabText: RepositoryOverviewTabType) => {
  switch (tabText) {
    case "README":
      return ProjectsGithubRepositoryOverviewReadmeContainer;
    case "MIT License":
      return ProjectsGithubRepositoryOverviewLicenseDisplay;
    default:
      return "div"; // fallback
  }
};

const getTabProps = (tabText: RepositoryOverviewTabType) => {
  if (tabText === "README") {
    return {
      readmeData,
      repoName,
      defaultBranch,
    };
  }
  if (tabText === "MIT License") {
    return {
      licenseData,
    };
  }
  return {};
};

const getTabMeta = (tabText: string) => {
  const slug = useSlugify(`${tabText}-${repoProject.value}`);
  return {
    id: `tab-${slug}`,
    labelId: `tab-btn-${slug}`,
  };
};
</script>

<template>
  <div class="border border-[#3d444d] rounded-md w-full mt-4">
    <div class="border-b border-[#3d444d] bg-[#0d1117] sticky top-0">
      <UiHeadingSrOnly>Repository files navigation</UiHeadingSrOnly>
      <div
        role="tablist"
        aria-label="Repository navigation"
        class="h-11 px-2 py-1.5 text-[#9198a1]"
      >
        <!-- :aria-controls="`tab-${useSlugify(text + '-' + repoProject)}`"
      :id="`tab-btn-${useSlugify(text + '-' + repoProject)}`" -->
        <button
          v-for="{ icon, text } in tabs"
          :key="text"
          type="button"
          role="tab"
          v-bind="{
            'aria-controls': getTabMeta(text).id,
            id: getTabMeta(text).labelId,
            'aria-selected': previewTab === text,
          }"
            class="mx-0.5 px-1.5 py-0.5 repo-overview-button relative hover:bg-[#656c7633]"
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
      <component
        v-for="tab in tabs"
        :is="getTabComponent(tab.text)"
        :key="tab.text"
        role="tabpanel"
        v-show="previewTab === tab.text"
        v-bind="{
          id: getTabMeta(tab.text).id,
          'aria-labelledby': getTabMeta(tab.text).labelId,
          ...getTabProps(tab.text),
        }"
      />
      <!-- :id="`tab-${useSlugify(tab.text + '-' + repoProject)}`" -->
      <!-- :aria-labelledby="`tab-btn-${useSlugify(tab.text + '-' + repoProject)}`" -->
      <!-- v-bind="getTabProps(tab.text)" -->
      <!-- <ProjectsGithubRepositoryOverviewReadmeContainer
        role="tabpanel"
        :id="tabs[0]?.text ? `tab-${useSlugify(tabs[0].text)}`: undefined"
        :aria-labelledby="tabs[0]?.text ? `tab-button-${useSlugify(tabs[0]?.text)}` : undefined"
        v-show="previewTab === 'README' && readmeData"
        :readme-data="readmeData"
        :repo-name="repoName"
        :default-branch="defaultBranch"
      />
      <ProjectsGithubRepositoryOverviewLicenseDisplay
        role="tabpanel"
        :id="tabs[1]?.text ?` tab-${useSlugify(tabs[1].text)}` : undefined"
        :aria-labelledby="tabs[1]?.text ? `tab-button-${useSlugify(tabs[1]?.text)}` : undefined"
        v-show="previewTab === 'MIT License' && licenseData"
        :license-data="licenseData"
      /> -->
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
