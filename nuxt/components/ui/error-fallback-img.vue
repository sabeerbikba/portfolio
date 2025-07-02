<script setup lang="ts">
import { useImage } from "@vueuse/core";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs();
const props = defineProps<{
  src: string;
  fallbackSrc: string;
}>();

const { isLoading, error } = useImage({ src: props.src }) as {
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
