<script setup lang="ts">
import { marked } from "marked";
import { projects } from "~/data/projects";
import type { ScreenStoreType } from "~/types/store";

const store = inject("store") as ScreenStoreType;

const processMarkdown = (base64: string) => {
  const markdown = atob(base64);
  const html = marked.parse(markdown, { async: false });

  const withAttrs = html.replace(
    /<a\s/g,
    '<a target="_blank" rel="noopener noreferrer" '
  );

  // Fix invalid <a><p></p></a> from marked caused by using withAttrs to add target/rel
  const fixedStructure = withAttrs.replace(
    /<a([^>]+)>\s*<p>(.*?)<\/p>\s*<\/a>/gi,
    "<a$1>$2</a>"
  );

  return fixedStructure;
};
</script>

<template>
  <div class="text-black bg-[#191919]" v-show="store.state.previewApp === 4">
    <div class="notes-body max-w-prose mx-auto p-6">
      <template v-for="({ aboutHtmlBase64 }, index) in projects" :key="index">
        <div
          v-show="store.state.previewProject === index + 1"
          v-html="processMarkdown(aboutHtmlBase64)"
        />
      </template>
    </div>
  </div>
</template>

<style>
.notes-body h3 {
  @apply text-3xl font-extrabold mb-6 text-[#d4d4d4];
}

.notes-body h4 {
  @apply text-2xl font-bold mb-4 text-[#d4d4d4];
}

.notes-body h5 {
  @apply text-xl font-semibold mb-3 text-[#d4d4d4];
}

.notes-body p {
  @apply text-base leading-relaxed mb-5 text-[#cecece] indent-2;
}

.notes-body a {
  @apply text-blue-500 underline hover:text-blue-600;
}

.notes-body ul {
  @apply list-disc ml-6 mb-4 text-[#cecece];
}

.notes-body ol {
  @apply list-decimal ml-6 mb-4 text-[#cecece];
}

.notes-body li {
  @apply mb-2 leading-6;
}

.notes-body code {
  @apply rounded px-1 py-0.5 font-mono text-sm;
}

.notes-body blockquote {
  @apply border-l-4 border-[#d4d4d4] pl-4 italic py-2 my-4 text-[#a8a8a8];
}

.notes-body img {
  @apply max-w-full rounded-lg border border-gray-300 shadow-sm mt-4 mb-6;
}

.notes-body hr {
  @apply border-t border-gray-200 my-6;
}

.notes-body table {
  @apply w-full border-collapse overflow-hidden rounded-lg shadow-sm mb-5 text-[#a8a8a8];
}

.notes-body th {
  @apply font-semibold px-[9px] py-[7px] border-2 border-[#2f2f2f];
}

.notes-body td {
  @apply px-[9px] py-[7px] border-2 border-[#2f2f2f];
}

.notes-body pre {
  @apply bg-[#202020] p-4 rounded-lg text-sm overflow-x-auto mb-6 text-[#a8a8a8];
}
</style>
