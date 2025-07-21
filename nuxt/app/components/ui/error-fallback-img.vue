<script setup lang="ts">
import { useImage } from "@vueuse/core";

defineOptions({ inheritAttrs: false });
const { src } = defineProps<{
  src: string;
  fallbackSrc: string;
}>();

const rawAttrs = useAttrs();
const { isLoading, error } = useImage({ src: src }) as {
  isLoading: Ref<boolean>;
  error: Ref<Event | null>;
};

const filteredAttrs = computed(() => {
  const { src, ...rest } = rawAttrs as Record<string, any>;
  return rest;
});
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <img :src="src" v-bind="filteredAttrs" />
    </template>
    <img :src="error || isLoading ? fallbackSrc : src" v-bind="filteredAttrs" />
  </ClientOnly>
</template>
