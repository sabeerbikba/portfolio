<script setup>
import { ref, onMounted, watch } from 'vue';
import { marked } from 'marked';

const props = defineProps({
  readmeData: Object,
  blobAbsoluteUrl: String,
});

const hostRef = ref(null);

const markdown = computed(() => {
  return props.readmeData && typeof props.readmeData === 'object' && 'content' in props.readmeData
    ? atob(props.readmeData.content)
    : '';
});

onMounted(() => {
  const updateShadowDOM = async () => {
    if (!markdown.value || !hostRef.value) return;

    const htmlContent = await marked.parse(markdown.value);
    const shadowRoot = hostRef.value.shadowRoot || hostRef.value.attachShadow({ mode: 'open' });

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const links = tempDiv.querySelectorAll('a');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href) {
        const absoluteUrl = href.startsWith('http') ? href : props.blobAbsoluteUrl + href;
        link.setAttribute('href', absoluteUrl);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });

    shadowRoot.innerHTML = `<style>${githubMarkdownCss}</style><article class="markdown-body">${tempDiv.innerHTML}</article>`;
  };

  updateShadowDOM();
});

watch(() => [markdown.value, props.blobAbsoluteUrl], () => {
  const updateShadowDOM = async () => {
    if (!markdown.value || !hostRef.value) return;

    const htmlContent = await marked.parse(markdown.value);
    const shadowRoot = hostRef.value.shadowRoot || hostRef.value.attachShadow({ mode: 'open' });

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const links = tempDiv.querySelectorAll('a');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href) {
        const absoluteUrl = href.startsWith('http') ? href : props.blobAbsoluteUrl + href;
        link.setAttribute('href', absoluteUrl);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });

    shadowRoot.innerHTML = `<style>${githubMarkdownCss}</style><article class="markdown-body">${tempDiv.innerHTML}</article>`;
  };

  updateShadowDOM();
});
</script>

<template>
  <div v-if="markdown" class="p-8" ref="hostRef"></div>
</template>
