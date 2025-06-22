<script setup lang="ts">
import type { GitHubLanguagesType } from "~/types/github";

const props = defineProps<{
  repoName: String;
  languageData: GitHubLanguagesType;
}>();
const { githubBaseURL } = useRuntimeConfig().public;

const languagesBytesOnePercentage = computed(() => {
  if (!props.languageData || Object.keys(props.languageData).length === 0) {
    return 0;
  }

  const total = Object.values(props.languageData).reduce(
    (acc, curr) => acc + curr,
    0
  );
  return total > 0 ? total / 100 : 0;
});
</script>

<template>
  <!-- write all the css class in lowercase -->
  <div class="BorderGrid-row">
    <div class="BorderGrid-cell text-[#f0f6fc] py-4">
      <h2 class="h4 mb-3 text-lg font-semibold">Languages</h2>
      <div class="mb-2 rounded-full">
        <span class="flex rounded-full overflow-hidden">
          <span
            v-for="(bytes, language) in languageData"
            :key="language"
            :data-language="language"
            :style="{
              width: (bytes / languagesBytesOnePercentage).toFixed(1) + '%',
            }"
            :aria-label="
              language +
              ' ' +
              (bytes / languagesBytesOnePercentage).toFixed(1) +
              '%'
            "
            class="h-2 mx-[.3px]"
          ></span>
        </span>
      </div>
      <ul class="list-style-none text-sm">
        <li
          v-for="(bytes, language) in languageData"
          :key="language"
          class="inline"
        >
          <a
            :href="`${githubBaseURL + repoName}/search?l=${language
              .toString()
              .toLowerCase()}`"
            class="inline-flex items-center flex-nowrap no-underline text-small mr-4"
          >
            <span
              class="w-2 h-2 mr-2 block rounded-full"
              :data-language="language"
            ></span>
            <span class="color-fg-default text-bold mr-1 font-semibold">
              {{ language }}
            </span>
            <span class="text-[#747b83]">
              {{ (bytes / languagesBytesOnePercentage).toFixed(1) + "%" }}
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
