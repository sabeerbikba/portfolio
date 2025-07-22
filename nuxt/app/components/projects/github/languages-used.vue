<script setup lang="ts">
import type { GitHubLanguagesType } from "~~/types/github";

const { githubBaseURL } = useRuntimeConfig().public;

const { repoName, languageData } = defineProps<{
  repoName: string;
  languageData: GitHubLanguagesType;
}>();

const languagesBytesOnePercentage = computed(() => {
  if (!languageData || Object.keys(languageData).length === 0) {
    return 0;
  }

  const total = Object.values(languageData).reduce(
    (acc, curr) => acc + curr,
    0
  );
  return total > 0 ? total / 100 : 0;
});

const getLanguagePercentage = (bytes: number) =>
  languagesBytesOnePercentage.value === 0
    ? 0
    : parseFloat((bytes / languagesBytesOnePercentage.value).toFixed(1));
</script>

<template>
  <div>
    <div class="text-[#f0f6fc] py-4">
      <h2 class="h4 mb-3 text-lg font-semibold">Languages</h2>
      <div
        role="img"
        :aria-label="
          languageData
            ? `Language usage breakdown: ${Object.entries(languageData)
                .map(
                  ([language, bytes]) =>
                    `${language} ${getLanguagePercentage(bytes)}%`
                )
                .join(', ')}`
            : ''
        "
        class="mb-2 rounded-full flex overflow-hidden"
      >
        <span
          v-for="(bytes, language) in languageData"
          :key="language"
          :data-language="language"
          :style="{
            width: getLanguagePercentage(bytes) + '%',
          }"
          class="h-2 mx-[.3px]"
        />
      </div>
      <ul class="list-style-none text-sm">
        <li
          v-for="(bytes, language) in languageData"
          :key="language"
          class="inline"
        >
          <SharedExternalLink
            :href="`${githubBaseURL + repoName}/search?l=${language
              .toString()
              .toLowerCase()}`"
            class="github-languages-used-link"
          >
            <span class="github-languages-used-dot" :data-language="language" />
            <span class="github-languages-used-info">
              {{ language }}
            </span>
            <span class="text-[#747b83]">
              {{ getLanguagePercentage(bytes) + "%" }}
            </span>
          </SharedExternalLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.github-languages-used-link {
  @apply inline-flex items-center flex-nowrap no-underline mr-4 text-[13.5px];
}

.github-languages-used-dot {
  @apply w-2 h-2 mr-2 block rounded-full;
}

.github-languages-used-info {
  @apply mr-1 font-semibold text-[#f0f6fc];
}
</style>
