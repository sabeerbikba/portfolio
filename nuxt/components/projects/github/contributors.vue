<script setup>
const props = defineProps({
  licenseData: Object,
  contributorData: Array,
  repoName: String,
});

const license = computed(() => {
  return props.licenseData && typeof props.licenseData === 'object' && 'content' in props.licenseData
    ? atob(props.licenseData.content)
    : '';
});

const contributors = computed(() => props.contributorData || []);

const githubBaseURL = 'https://github.com';
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
        <a :href="`${githubBaseURL}/${repoName}/graphs/contributors`" class="block hover:text-[#4493f8]">
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
</template>
