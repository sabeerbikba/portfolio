<script setup lang="ts">
import type { NullableFileContent } from "~/types/github";
const props = defineProps<{ licenseData: NullableFileContent }>();

const decoded = computed<string>(() =>
  props.licenseData &&
  typeof props.licenseData === "object" &&
  "content" in props.licenseData
    ? atob(props.licenseData.content)
    : ""
);

const isMitLicense = computed<boolean>(() =>
  decoded.value.trimStart().startsWith("MIT License")
);

const license = computed<string[] | string>(() => {
  if (isMitLicense.value) {
    return decoded.value
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
  }
  return decoded.value;
});
</script>

<template>
  <div
    :class="[
      'p-8 text-[#dfe5eb] font-medium overflow-auto w-full',
      isMitLicense
        ? 'max-sm:text-xs max-md:text-sm max-lg:text-[0.910rem] text-base mit-license'
        : 'text-xs',
    ]"
  >
    <template v-if="isMitLicense">
      <p v-for="(para, i) in license" :key="i">
        {{ para }}
      </p>
    </template>
    <pre
      v-else
      class="overflow-x-auto w-full whitespace-pre-line [word-break:break-word]"
    >
      {{ license }}
    </pre>
  </div>
</template>

<style>
.mit-license p {
  @apply pb-4 text-[15.8px] leading-relaxed;
}
</style>
