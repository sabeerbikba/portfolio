<template>
  <!-- This component created to addEventListener with attribute `data-nuxt-link` to save the home page path in useState() -->
  <!-- See: ~/pages/index.vue & ~/pages/contact.vue -->
  <NuxtLink data-nuxt-link>
    <slot />
  </NuxtLink>
</template>
