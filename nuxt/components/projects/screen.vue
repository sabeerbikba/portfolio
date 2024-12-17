<!-- <script setup lang="ts"> -->
<script setup>
import FloatingDock from "./floating-dock.vue";
import website from "./website.vue";
import useScreenStore from "~/composables/use-screen-store";

// import FloatingDock from "@/components/ui/floating-dock.vue";
// import About from "./about.vue";
// import Github from "./github.vue";
// import Website from "./website.vue";
// import ExternalLink from "@/components/ui/link.vue";
// import { projects } from "@/data/projects";
// import { MarkGithubIcon } from "@primer/octicons-vue";

const { state, isDataAvailable, previewProjectIndex } = useScreenStore();
</script>

<template>
  <div>
    <FloatingDock />
    <div class="overflow-scroll h-full w-full">
      <Website
        :tab="previewProjectIndex"
        :data="projects"
        :hidden="previewApp !== 3"
      />
      <About :number="[previewProject, previewApp]" />
      <div v-show="previewApp === 5" class="bg-[#0d1117] h-full">
        <Github
          v-if="isDataAvailable"
          :data="state.data[previewProjectIndex]"
        />
        <FallbackGithubUI v-else :repo="projects[previewProjectIndex]?.repo" />
      </div>
    </div>
  </div>
</template>

<template #fallbackGithubUI>
  <script setup>
    const props = defineProps({
      repo: String,
    });

    const [userName, repositoryName] = computed(() =>
      props.repo ? props.repo.split("/") : ["", ""]
    );
  </script>

  <template>
    <div class="center h-full">
      <div
        class="max-xs:rounded-md rounded-xl bg-white p-2 max-md:p-1 border-slate-100 text-black max-xs:text-lg max-md:text-xl text-2xl"
      >
        <ExternalLink
          :href="repo"
          class="border-2 max-xs:p-0.5 max-xs:py-1 max-md:p-1 max-md:py-2 p-2 py-3 border-black max-xs:rounded-md rounded-xl flex"
        >
          <span class="text-xl max-xs:text-base max-md:text-lg pt-[2px]">
            {{ userName }}/
          </span>
          {{ repositoryName }}
          <MarkGithubIcon :size="32" class="ml-2" />
        </ExternalLink>
      </div>
    </div>
  </template>

  <style>
    .center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
</template>
