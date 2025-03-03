<!-- <script setup lang="ts">
// import { ref, computed, watchEffect } from 'vue';
// import useLocalStorageState from '@/composables/useLocalStorageState';
// import ReadmeShadowContainer from '@/components/ReadmeShadowContainer.vue';
// import LicenseDisplay from '@/components/LicenseDisplay.vue';
// import BookIcon from '@/components/icons/BookIcon.vue';
// import LawIcon from '@/components/icons/LawIcon.vue';

// Props
const props = defineProps({
  readmeData: Object,
  licenseData: Object,
  repoName: String,
  blobAbsoluteUrl: String,
});

// Local storage state
const { state: previewTab, setState: setPreviewTab } = useLocalStorageState(
  `home:projects:RepositoryOverview:${props.repoName}`,
  'README'
);

// Tabs
const tabs = computed(() => [
  props.readmeData ? { icon: BookIcon, text: 'README' } : null,
  props.licenseData ? { icon: LawIcon, text: 'MIT license' } : null,
].filter(Boolean));

// Watch tabs to set default preview tab if only one tab is available
watchEffect(() => {
  if (tabs.value.length === 1) {
    setPreviewTab(tabs.value[0].text);
  }
});
</script>

<template>
  <div class="border border-[#3d444d] rounded-md w-full mt-4">
    <div class="border-b border-[#3d444d] bg-[#0d1117] sticky top-0">
      <h2 class="hidden">Repository files navigation</h2>
      <div class="h-11 px-2 py-1.5 text-[#9198a1]" aria-label="Repository files">
        <button v-for="tab in tabs" :key="tab.text"
          :class="['mx-0.5 px-1.5 py-0.5 repo-overview-button relative hover:bg-[#656c7633] rounded-md', { 'font-semibold': previewTab === tab.text }]"
          @click="setPreviewTab(tab.text)">
          <component :is="tab.icon" />
          <span class="m-1.5 text-[#f0f6fc] text-[15px]">{{ tab.text }}</span>
        </button>
      </div>
    </div>
    <div class="p-4">
      <ReadmeShadowContainer v-if="previewTab === 'README' && readmeData" :readme-data="readmeData"
        :blob-absolute-url="blobAbsoluteUrl" />
      <LicenseDisplay v-if="previewTab === 'MIT license' && licenseData" :license-data="licenseData" />
    </div>
  </div>
</template>



<style scoped>
.repo-overview-button {
  cursor: pointer;
}
</style> -->

<script setup lang="ts">
// import { ref, computed, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import type { GitHubFileContentType } from "~/types/github";

const props = defineProps<{
  readmeData: GitHubFileContentType | null,
  licenseData: GitHubFileContentType | null,
  repoName: string,
  blobAbsoluteUrl: string,
}>();

const previewTab = useLocalStorage(`home:projects:RepositoryOverview:${props.repoName}`, 'README');

const tabs = computed(() => [
  props.readmeData ? { icon: 'BookIcon', text: 'README' } : null,
  props.licenseData ? { icon: 'LawIcon', text: 'MIT license' } : null,
].filter(tab => tab !== null));

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
        <button v-for="button in tabs" :key="button.text" @click="previewTab = button.text"
          class="mx-0.5 px-1.5 py-0.5 repo-overview-button relative hover:bg-[#656c7633] rounded-md">
          <component :is="button.icon" />
          <span :class="['m-1.5 text-[#f0f6fc] text-[15px]', previewTab === button.text ? 'font-semibold' : '']">
            {{ button.text }}
          </span>
        </button>
      </div>
    </div>
    <div class="p-4">
      <ProjectsGithubRepositoryOverviewReadmeShadowContainer v-if="previewTab === 'README' && readmeData" :readmeData="readmeData"
        :blobAbsoluteUrl="blobAbsoluteUrl" />
      <ProjectsGithubRepositoryOverviewLicenseDisplay v-if="previewTab === 'MIT license' && licenseData" :licenseData="licenseData" />
    </div>
  </div>
</template>
