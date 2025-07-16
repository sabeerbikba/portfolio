<script setup lang="ts">
import "~/css/github-markdown-dark.css";
import type { NullableFileContent } from "~/types/github";

const props = defineProps<{
  readmeData: NullableFileContent;
  repoName: string;
  defaultBranch: string | undefined;
}>();

const { githubBaseURL } = useRuntimeConfig().public;

const blobAbsoluteUrl = computed<string | undefined>(
  () => `${githubBaseURL + props.repoName}/blob/${props.defaultBranch}/`
);

const markdownHtml = computed(() => {
  if (
    props.readmeData &&
    typeof props.readmeData === "object" &&
    "content" in props.readmeData
  ) {
    return useParsedMarkdown(props.readmeData.content).replace(
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
