<template>
  <div class="relative" aria-describedby="navigation-desc">
    <p id="navigation-desc" class="sr-only">
      Contains both desktop and mobile projects navigation components. Only one
      is visible based on screen size.
    </p>
    <LazyProjectsNavigationDesktop
      hydrate-on-media-query="(min-width: 768px)"
    />
    <LazyProjectsNavigationMobile hydrate-on-media-query="(max-width: 768px)" />
  </div>
</template>
