<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import type { IconName } from "@primer/octicons";

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

const stats = computed<{ href: string; icon: IconName; count: number | null; what: string }[]>(() => [
    { href: `${full_name}/stargazers`, icon: 'star', count: stargazers_count, what: 'stars' },
    { href: `${full_name}/forks`, icon: 'repo-forked', count: forks_count, what: 'forks' },
    { href: `${full_name}/watchers`, icon: 'eye', count: subscribers_count, what: 'watching' },
    { href: `${full_name}/branches`, icon: 'git-branch', count: props.branchData.length, what: 'Branch' },
    { href: `${full_name}/tags`, icon: 'tag', count: props.tagData.length, what: 'Tags' },
    { href: `${full_name}/activity`, icon: 'pulse', count: null, what: 'Activity' },
]);

</script>

<template>
    <div class="p-4 border-b border-[#3d444d] text-[#9198a1]">
        <h2 class="space-y-4 text-2xl font-extrabold ml-1 mb-4 text-[#f0f6fc]">
            <UiExternalLink :href="`${githubBaseURL}${full_name}`" class="hover:underline">
                <ProjectsIcon name="mark-github" :size="32" class="mr-2" />
                <span class="text-xl text-[#9198a1]">{{ userName }}/</span>
                {{ repositoryName }}
            </UiExternalLink>
        </h2>
        <div class="space-y-4">
            <p v-if="description" class="text-base font-normal">{{ description }}</p>
            <Website :link="homepage" />
            <div v-if="hasReadme">
                <h3 hidden>License</h3>
                <button class="flex items-center gap-2 hover:text-blue-400" @click="previewTab = 'MIT License'">
                    <ProjectsIcon name="law" class="fill-current" />
                    <span class="text-sm">MIT license</span>
                </button>
            </div>
            <ul class="flex flex-wrap items-center gap-5 text-sm">
                <li v-for="({href, icon, count, what}) in stats" :key="what">
                    <UiExternalLink :href="`${githubBaseURL}${href}`"
                        class="inline-flex items-center gap-2 text-current hover:text-blue-400">
                        <!-- <component :is="stat.icon" class="fill-current" /> -->
                        <ProjectsIcon :name="icon" class="fill-current" />
                        <span v-if="count != null" class="font-semibold">{{ count }}</span>
                        <span>{{ what }}</span>
                    </UiExternalLink>
                </li>
            </ul>
            <div class="inline-flex items-center gap-1 text-sm">
                <!-- <GlobeIcon fill="#9198a1" /> -->
                <ProjectsIcon name="globe" />
                <span>Public repository</span>
            </div>
        </div>
    </div>
</template>
