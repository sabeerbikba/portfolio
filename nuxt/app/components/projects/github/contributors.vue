<script setup lang="ts">
import type { GitHubContributorType } from "~~/types/github";

const { contributorData } = defineProps<{
  contributorData: GitHubContributorType;
  repoName: string;
}>();

const imgFailedPlaceholder =
  "data:image/webp;base64,UklGRg4BAABXRUJQVlA4IAIBAACQBgCdASogACAAPhkMhEGhBQFVBABhLSAAiCXjN+g/UZ/rXVd9ABa4z1fpibV1/D5jML3Qa0PHr5kxk+4AAP7//xvY3wvxj/v1x+ntFEzZfyoPYi7t30BbojhLx5FGiqIepSsUFQvCoH/koj+1+Nt4Omt8sstpk6h9krhVUcf//eyZAadm4N3OPGaP5/fU7/mbO1tai4mW6y+171sq0/6KV5iQqpxvQpc9eHzHprfbvyChmX/eLUdQg4C7zh6Ahra8bma2yN05wzTR/6lB7GN47qQqYVE/tN6Nna4m7O5pg1StgJr3ri/LRzQ+m0dwdllln/n8+lEUGRr3qY6ByHAAAAA=";

const { githubBaseURL } = useRuntimeConfig().public;
const contributors = computed(() => contributorData || []);
</script>

<template>
  <div class="w-full text-[#f0f6fc] border-b border-[#3d444d]">
    <div class="py-4 w-full">
      <h2 class="h-7 mb-3 text-lg font-semibold">
        <SharedExternalLink
          :href="`${githubBaseURL + repoName}/graphs/contributors`"
          class="block hover:text-[#4493f8]"
        >
          Contributors
          <span
            title="Contributors count"
            class="ml-1 rounded-full bg-[#1e242a] inline-block w-5 h-5 !text-[#f0f6fc] text-sm font-thin text-center"
          >
            {{ contributors?.length || 0 }}
          </span>
        </SharedExternalLink>
      </h2>
      <ul class="list-none">
        <li
          v-for="contributor in contributors"
          :key="contributor.login"
          class="mb-2 flex"
        >
          <SharedExternalLink
            :href="contributor.html_url || ''"
            class="flex hover:text-[#4493f8]"
          >
            <SharedErrorFallbackImg
              :src="`${contributor.avatar_url}&s=32`"
              :fallback-src="imgFailedPlaceholder"
              :alt="'@' + contributor.login"
              height="32"
              width="32"
              :class="[
                'mr-2',
                contributor.type === 'Bot' ? 'rounded-md' : 'rounded-full',
              ]"
              loading="lazy"
            />
            <span class="text-ellipsis">
              <strong class="font-semibold text-[15.2px] pt-[5px]">
                {{ contributor.login }}
              </strong>
            </span>
          </SharedExternalLink>
        </li>
      </ul>
    </div>
  </div>
</template>
