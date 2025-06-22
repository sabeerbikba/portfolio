<!-- <script setup lang="ts">
import { marked } from "marked";
import githubMarkdownCss from "~/css/github-markdown-dark"; // .ts file
import type { NullableGitHubFileContent } from "~/types/github";
import type { ScreenStoreType } from "~/types/store";

const props = defineProps<{
  readmeData: NullableGitHubFileContent;
  repoName: string;
}>();
const store = inject("store") as ScreenStoreType;
const { githubBaseURL } = useRuntimeConfig().public;

const hostRef: Ref<HTMLDivElement | null> = ref(null);
const markdown: Ref<string> = ref("");

const blobAbsoluteUrl = computed<string | undefined>(
  () =>
    `${githubBaseURL + props.repoName}/blob/${
      store.state.data[store.state.previewProject - 1].repoDetails
        ?.default_branch
    }/`
);

if (
  props.readmeData &&
  typeof props.readmeData === "object" &&
  "content" in props.readmeData
) {
  markdown.value = atob(props.readmeData.content);
}

const processMarkdown = () => {
  if (!markdown.value || !hostRef.value) return;

  const htmlContent = marked.parse(markdown.value, { async: false });
  const shadowRoot =
    hostRef.value.shadowRoot || hostRef.value.attachShadow({ mode: "open" });
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  const links = tempDiv.querySelectorAll("a");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href) {
      const absoluteUrl = href.startsWith("http")
        ? href
        : blobAbsoluteUrl.value + href;
      link.setAttribute("href", absoluteUrl);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });

  shadowRoot.innerHTML = `<style>${githubMarkdownCss}</style><article class="markdown-body">${tempDiv.innerHTML}</article>`;
};

watch(markdown, processMarkdown);
onMounted(processMarkdown);
</script>

<template><div v-if="markdown" class="p-8" ref="hostRef" /></template> -->

<script setup lang="ts">
import { marked } from "marked";
// import githubMarkdownCss from "~/css/github-markdown-dark"; // string
import "~/css/github-markdown-dark.css";
import type { NullableGitHubFileContent } from "~/types/github";

// this code generating links like <a href="LICENSE">MIT License</a> that throw build error

const props = defineProps<{
  readmeData: NullableGitHubFileContent;
  repoName: string;
}>();

// let isMarkdownCssInjected = false;
// const styleTag = ref<HTMLStyleElement>();

const markdownHtml = computed(() => {
  if (
    props.readmeData &&
    typeof props.readmeData === "object" &&
    "content" in props.readmeData
  ) {
    const raw = atob(props.readmeData.content);
    return marked.parse(raw, { async: false });
  }
  return "";
});

// onMounted(() => {
//   if (!isMarkdownCssInjected) {
//     if (!styleTag.value) {
//       styleTag.value = document.createElement("style");
//       styleTag.value.textContent = githubMarkdownCss;
//       document.head.appendChild(styleTag.value);
//     }
//   }
// });

// onUnmounted(() => {
//   if (styleTag.value) {
//     styleTag.value.remove();
//   }
// });
</script>

<template>
  <div v-if="markdownHtml" class="p-8 max-xs:p-5">
    <article class="markdown-body" v-html="markdownHtml" />
  </div>
</template>
