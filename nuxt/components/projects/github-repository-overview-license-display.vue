<script setup>
const props = defineProps({
  licenseData: Object,
});

const license = computed(() => {
  return props.licenseData && typeof props.licenseData === 'object' && 'content' in props.licenseData
    ? atob(props.licenseData.content)
    : '';
});
</script>

<template>
  <div v-if="license" class="p-8 text-[#dfe5eb] text-xs font-medium overflow-auto w-full">
    <pre class="whitespace-pre-wrap overflow-x-auto w-full" style="word-break: break-word;">
      {{ license }}
    </pre>
  </div>
</template>
