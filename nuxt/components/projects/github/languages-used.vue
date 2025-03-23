<script setup>
import "~/css/github-markdown-dark.css";
const props = defineProps({
  licenseData: Object,
  contributorData: Array,
  repoName: String,
  languageData: Object,
});

const license = computed(() => {
  return props.licenseData && typeof props.licenseData === 'object' && 'content' in props.licenseData
    ? atob(props.licenseData.content)
    : '';
});

const languagesBytesOnePercentage = computed(() => {
  return (
    Object.values(props.languageData).reduce((acc, curr) => acc + curr, 0) / 100
  );
});

const contributors = computed(() => props.contributorData || []);
const { githubBaseURL } = useRuntimeConfig().public;
</script>

<template>
  <div v-if="license" class="p-8 text-[#dfe5eb] text-xs font-medium overflow-auto w-full">
    <pre class="whitespace-pre-wrap overflow-x-auto w-full" style="word-break: break-word;">
      {{ license }}
    </pre>
  </div>
  <div v-if="contributors.length" class="w-full text-[#f0f6fc] border-b border-[#3d444d]">
    <div class="py-4 w-full">
      <h2 class="h-7 mb-3 text-lg font-semibold">
        <a :href="`${githubBaseURL + repoName}/graphs/contributors`" class="block hover:text-[#4493f8]">
          Contributors
          <span title="Contributors count"
            class="ml-1 rounded-full bg-[#1e242a] inline-block w-5 h-5 !text-[#f0f6fc] text-sm font-thin text-center">
            {{ contributors.length }}
          </span>
        </a>
      </h2>
      <ul class="list-none">
        <li v-for="contributor in contributors" :key="contributor.login" class="mb-2 flex">
          <a :href="contributor.html_url" class="mr-2">
            <img :src="contributor.avatar_url" :alt="'@' + contributor.login" height="32" width="32"
              :class="contributor.type === 'Bot' ? 'rounded-md' : 'rounded-full'" />
          </a>
          <span class="text-ellipsis">
            <a :href="contributor.html_url" class="hover:text-[#4493f8]">
              <strong class="font-semibold text-[15.2px]">{{ contributor.login }}</strong>
            </a>
          </span>
        </li>
      </ul>
    </div>
  </div>
  <div v-if="Object.keys(languageData).length" class="BorderGrid-row">
    <div class="BorderGrid-cell text-[#f0f6fc] py-4">
      <h2 class="h4 mb-3 text-lg font-semibold">Languages</h2>
      <div class="mb-2 rounded-full">
        <span class="flex rounded-full">
          <span v-for="(bytes, language) in languageData" :key="language" :data-language="language"
            :style="{ width: (bytes / languagesBytesOnePercentage).toFixed(1) + '%' }"
            :aria-label="language + ' ' + (bytes / languagesBytesOnePercentage).toFixed(1) + '%'"
            class="h-2 mx-[.3px]"></span>
        </span>
      </div>
      <ul class="list-style-none text-sm">
        <li v-for="(bytes, language) in languageData" :key="language" class="inline">
          <a :href="`/sabeerbikba/dev.tools/search?l=${language.toLowerCase()}`"
            class="inline-flex items-center flex-nowrap no-underline text-small mr-4">
            <span class="w-2 h-2 mr-2 block rounded-full" :data-language="language"></span>
            <span class="color-fg-default text-bold mr-1 font-semibold">
              {{ language }}
            </span>
            <span class="text-[#747b83]">
              {{ (bytes / languagesBytesOnePercentage).toFixed(1) + '%' }}
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
