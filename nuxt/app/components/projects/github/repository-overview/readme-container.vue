<script setup lang="ts">
import "~/assets/css/github-markdown-dark.css";
import type { NullableFileContent } from "~~/types/github";

// TODO: Implement permalinks similar to GitHub's readme headings.
// - Must be done without using onMounted() to ensure server-side compatibility.
// - Format: /?app=github&project=${useSlugify(project.name)}#github-readme-${useSlugify(headingName)}
//   Example: /?app=github&project=rickshaw#github-readme-dev-tools

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
