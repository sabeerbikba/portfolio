<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import type { IconName } from '@primer/octicons';
import type { GitHubFileContentType } from "~/types/github";

const props = defineProps<{
  readmeData: GitHubFileContentType | null,
  licenseData: GitHubFileContentType | null,
  repoName: string,
  blobAbsoluteUrl: string,
}>();

const previewTab = useLocalStorage(`home:projects:RepositoryOverview:${props.repoName}`,
  'README');

const tabs = computed<{ icon: IconName; text: string }[]>(() => [
  props.readmeData ? { icon: 'book' as IconName, text: 'README' } : null,
  props.licenseData ? { icon: 'law' as IconName, text: 'MIT License' } : null,
].filter((tab): tab is { icon: IconName; text: string } => tab !== null));

watch(tabs, (newTabs) => {
  if (newTabs.length === 1) {
    previewTab.value = newTabs[0].text;
  }
}, { immediate: true });
</script>

<template>
  <div class="border border-[#3d444d] rounded-md w-full mt-4">
    <div class="border-b border-[#3d444d] bg-[#0d1117] sticky top-0">
      <h2 class="hidden">Repository files navigation</h2>
      <div class="h-11 px-2 py-1.5 text-[#9198a1]" aria-label="Repository files">
        <button v-for="({ icon, text }) in tabs" :key="text" @click="previewTab = text"
          class="mx-0.5 px-1.5 py-0.5 repo-overview-button relative hover:bg-[#656c7633]"
          :aria-selected="previewTab === text">
          <ProjectsIcon :name="icon" />
          <span :class="['m-1.5 text-[#f0f6fc] text-[15px]', previewTab === text ? 'font-semibold' : '']">
            {{ text }}
          </span>
        </button>
      </div>
    </div>
    <div class="p-4">
      <ProjectsGithubRepositoryOverviewReadmeShadowContainer v-if="previewTab === 'README' && readmeData"
        :readmeData="readmeData" :blobAbsoluteUrl="blobAbsoluteUrl" />
      <ProjectsGithubRepositoryOverviewLicenseDisplay v-if="previewTab === 'MIT License' && licenseData"
        :licenseData="licenseData" />
    </div>
  </div>
</template>

<style>
.repo-overview-button::after {
  position: absolute;
  right: 50%;
  bottom: calc(50% - calc(var(--control-xlarge-size, 48px) / 2 + 1px));
  width: 100%;
  height: 2px;
  content: "";
  background-color: transparent;
  border-radius: 0;
  transform: translate(50%, -50%);
}


.repo-overview-button[aria-current]:not([aria-current="false"])::after,
.repo-overview-button[aria-selected="true"]::after {
  background-color: #fd8c73;
}
</style>