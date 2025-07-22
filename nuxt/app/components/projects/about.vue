<script setup lang="ts">
import { projects } from "~/content/projects";
import type { ScreenStoreType } from "~~/types/store";

const store = inject("store") as ScreenStoreType;
const [isProjectsAbout] = useTabState(["is-projects-about"]);
</script>

<template>
  <div v-show="store.state.previewApp === 3" class="bg-[#191919]">
    <AccessibilityNotifier :app-store="3" />
    <template
      v-for="({ aboutHtmlBase64, name }, index) in projects"
      :key="index"
    >
      <div
        @focus="isProjectsAbout.focused = true"
        @keydown.tab="isProjectsAbout.tabClicked = true"
        tabindex="0"
        :aria-label="`scrollable about ${name} project`"
        v-show="store.state.previewProject === index"
        v-html="useParsedMarkdown(aboutHtmlBase64)"
        class="notes-body"
      />
    </template>
  </div>
</template>

<style>
/* about.vue */
div.notes-body {
  @apply max-w-prose mx-auto p-6 max-xs:px-7;
}

div.notes-body:focus {
  @apply outline-none;
  /* @apply outline-4 outline-double outline-offset-[50px] outline-[#606060]; */
}

.notes-body h1 {
  @apply text-3xl font-extrabold mb-6 text-[#d4d4d4];
}

.notes-body h2 {
  @apply text-2xl font-bold mb-4 text-[#d4d4d4];
}

.notes-body h3 {
  @apply text-xl font-semibold mb-3 text-[#d4d4d4];
}

.notes-body p {
  @apply text-base leading-relaxed mb-5 text-[#cecece];
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
