<template>
  <div class="relative" aria-describedby="navigation-desc">
    <p id="navigation-desc" class="sr-only">
      Contains both desktop and mobile projects navigation components. Only one
      is visible based on screen size.
    </p>
    <ProjectsFloatingDockDesktop class="max-md:hidden" />
    <ProjectsFloatingDockMobile class="md:hidden" />
  </div>
</template>
