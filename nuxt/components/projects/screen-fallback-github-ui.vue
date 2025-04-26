<script setup lang="ts">
const props = defineProps<{ repo: String }>();

const repoParts = computed(() =>
  props.repo ? props.repo.split("/") : ["", ""]
);

const userName = computed(() => repoParts.value[0]);
const repositoryName = computed(() => repoParts.value[1]);
</script>

<template>
  <div class="center h-full">
    <div
      class="max-xs:rounded-md rounded-xl bg-white p-2 max-md:p-1 border-slate-100 text-black max-xs:text-lg max-md:text-xl text-2xl"
    >
      <UiExternalLink
        :href="repo"
        class="border-2 max-xs:p-0.5 max-xs:py-1 max-md:p-1 max-md:py-2 p-2 py-3 border-black max-xs:rounded-md rounded-xl flex"
      >
        <span class="text-xl max-xs:text-base max-md:text-lg pt-[2px]">
          {{ userName }}/
        </span>
        {{ repositoryName }}
        <ProjectsOcticonsIcon name="mark-github" class="fill-current" />
      </UiExternalLink>
    </div>
  </div>
</template>
