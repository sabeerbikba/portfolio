<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';

// TODO: icons 

import type {
    GitHubRepositoryType,
    GithubBranchesType,
    GithubTagsType,
} from "~/types/github";

const props = defineProps<{
    repoData: GitHubRepositoryType,
    branchData: GithubBranchesType,
    tagData: GithubTagsType,
    hasReadme: boolean
}>();

const { githubBaseURL } = useRuntimeConfig().public;

const { full_name, description, homepage, stargazers_count, forks_count, subscribers_count }: GitHubRepositoryType = props.repoData;
const [userName, repositoryName] = full_name ? full_name.split("/") : ["", ""];
const previewTab = useLocalStorage(`home:projects:RepositoryOverview:${full_name}`, 'README');

const stats = computed(() => [
    { href: `${full_name}/stargazers`, icon: 'StarIcon', count: stargazers_count, what: 'stars' },
    { href: `${full_name}/forks`, icon: 'RepoForkedIcon', count: forks_count, what: 'forks' },
    { href: `${full_name}/watchers`, icon: 'EyeIcon', count: subscribers_count, what: 'watching' },
    { href: `${full_name}/branches`, icon: 'GitBranchIcon', count: props.branchData.length, what: 'Branch' },
    { href: `${full_name}/tags`, icon: 'TagIcon', count: props.tagData.length, what: 'Tags' },
    { href: `${full_name}/activity`, icon: 'PulseIcon', count: null, what: 'Activity' },
]);
</script>

<template>
    <div class="p-4 border-b border-[#3d444d] text-[#9198a1]">
        <h2 class="space-y-4 text-2xl font-extrabold ml-1 mb-4 text-[#f0f6fc]">
            <UiExternalLink :href="`${githubBaseURL}${full_name}`" class="hover:underline">
                <MarkGithubIcon size="32" class="mr-2" />
                <span class="text-xl text-[#9198a1]">{{ userName }}/</span>
                {{ repositoryName }}
            </UiExternalLink>
        </h2>
        <div class="space-y-4">
            <p v-if="description" class="text-base font-normal">{{ description }}</p>
            <Website :link="homepage" />
            <div v-if="hasReadme">
                <h3 hidden>License</h3>
                <button class="flex items-center gap-2 hover:text-blue-400" @click="previewTab = 'MIT license'">
                    <LawIcon class="fill-current" />
                    <span class="text-sm">MIT license</span>
                </button>
            </div>
            <ul class="flex flex-wrap items-center gap-5 text-sm">
                <li v-for="stat in stats" :key="stat.what">
                    <UiExternalLink :href="`${githubBaseURL}${stat.href}`"
                        class="inline-flex items-center gap-2 text-current hover:text-blue-400">
                        <component :is="stat.icon" class="fill-current" />
                        <span v-if="stat.count != null" class="font-semibold">{{ stat.count }}</span>
                        <span>{{ stat.what }}</span>
                    </UiExternalLink>
                </li>
            </ul>
            <div class="inline-flex items-center gap-1 text-sm">
                <GlobeIcon fill="#9198a1" />
                <span>Public repository</span>
            </div>
        </div>
    </div>
</template>
