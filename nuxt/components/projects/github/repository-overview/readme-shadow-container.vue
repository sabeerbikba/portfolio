<script setup lang="ts">
import { marked } from 'marked';
import githubMarkdownCss from "~/css/github-markdown-dark"; // .ts file 
import type { GitHubFileContentType } from "~/types/github";

const props = defineProps<{
  readmeData: GitHubFileContentType | null,
  blobAbsoluteUrl: String,
}>();

const hostRef: Ref<HTMLDivElement | null> = ref(null);
const markdown: Ref<string> = ref('');

if (props.readmeData && typeof props.readmeData === 'object' && 'content' in props.readmeData) {
  markdown.value = atob(props.readmeData.content);
}

const processMarkdown = async () => {
  if (!markdown.value || !hostRef.value) return;

  const htmlContent = await marked.parse(markdown.value);
  const shadowRoot = hostRef.value.shadowRoot || hostRef.value.attachShadow({ mode: 'open' });
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  const links = tempDiv.querySelectorAll('a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const absoluteUrl = href.startsWith('http') ? href : props.blobAbsoluteUrl + href;
      link.setAttribute('href', absoluteUrl);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  shadowRoot.innerHTML =
    `<style>${githubMarkdownCss}</style><article class="markdown-body">${tempDiv.innerHTML}</article>`;
};

watch(markdown, processMarkdown);
onMounted(processMarkdown);
</script>

<template>
  <div v-if="markdown" class="p-8" ref="hostRef" />
</template>
