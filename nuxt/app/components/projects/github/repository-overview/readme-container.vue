<script setup lang="ts">
import "~/assets/css/github-markdown-dark.css";
import type { NullableFileContent } from "~~/types/github";

const { readmeData, repoName, defaultBranch } = defineProps<{
  readmeData: NullableFileContent;
  repoName: string;
  defaultBranch: string | undefined;
}>();

const { githubBaseURL } = useRuntimeConfig().public;

const blobAbsoluteUrl = computed(
  () => `${githubBaseURL + repoName}/blob/${defaultBranch}/`
);

const markdownHtml = computed(() => {
  if (readmeData && typeof readmeData === "object" && "content" in readmeData) {
    return useParsedMarkdown(readmeData.content).replace(
      /<a\s([^>]*href=")([^"]*)"/gi,
      (_, prefix, href) => {
        const isAbsolute = href.startsWith("http") || href.startsWith("#");
        const finalHref = isAbsolute ? href : blobAbsoluteUrl.value + href;
        return `<a ${prefix}${finalHref}"`;
      }
    );
  }
  return "";
});
</script>

<template>
  <div v-if="markdownHtml && readmeData" class="p-8 max-xs:p-5">
    <article class="markdown-body" v-html="markdownHtml" />
  </div>
</template>
