<script setup lang="ts">
// import DevTools from "./DevTools.vue";
// import Rickshaw from "./Rickshaw.vue";

const props = defineProps<{
  number: [number, number];
}>();

const [project, app] = props.number;
</script>

<template>
  <div class="text-black bg-[#191919]" :hidden="app !== 4">
    <div class="notes-body max-w-prose mx-auto p-6">
      <DevTools v-if="project === 1" />
      <Rickshaw v-else />
    </div>
  </div>
</template>

<template #devTools>
  <div>
    <h3>Dev.Tools</h3>
    <p>
      Dev.Tools is a comprehensive suite of utilities designed specifically for
      developers to streamline their workflow and boost productivity. This
      application includes over 20 essential tools, such as live HTML preview, a
      diff viewer, and other utilities that simplify everyday development tasks.
      With a focus on usability, Dev.Tools is tailored to developers who value
      efficiency and a seamless experience.
    </p>
    <p>
      The project targets developers looking for quick, accessible, and
      efficient solutions without needing to juggle multiple applications or
      write additional code for common tasks.
    </p>
    <hr />
    <h4><strong>Motivation and Goals</strong></h4>
    <p>
      The idea behind Dev.Tools was to create a project that wasn&apos;t just
      another practice application but something that could serve a real purpose
      in the long term. My goal was to develop a platform that simplifies
      frequent developer activities, helping users save time while coding. By
      focusing on a single-page application (SPA) approach, I wanted to ensure
      smooth navigation and an intuitive user experience.
    </p>
    <p>
      This project was not just about creating tools—it was about solving
      problems I faced as a developer. For instance, the Live HTML Preview tool
      eliminates the need to create, save, and open files repeatedly in a
      browser, offering instant feedback to the user. Each tool was designed to
      either enhance productivity or fill a gap I encountered during
      development.
    </p>
    <hr />
    <h4><strong>Features and Technical Implementation</strong></h4>
    <p>Dev.Tools boasts an impressive array of utilities, including:</p>
    <ul>
      <li>
        <strong>Live Previews</strong>: Instant feedback for HTML, React, and
        Markdown code without needing to save or reload.
      </li>
      <li>
        <strong>Color Code Converter</strong>: Quickly switch between HEX, RGB,
        and HSL formats.
      </li>
      <li>
        <strong>QR Code Generator</strong>: Create QR codes effortlessly for any
        URL or text.
      </li>
      <li>
        <strong>CSS Autoprefixer</strong>: Add vendor prefixes to CSS properties
        with ease.
      </li>
      <li>
        <strong>Meta Tags Generator</strong>: Simplify SEO optimization for
        websites.
      </li>
    </ul>
    <p>
      The platform is built using <strong>React</strong> for its speed and
      interactivity, creating a smooth SPA experience. Tools like localStorage
      are integrated to retain user inputs and settings, ensuring a personalized
      experience every time they return. Despite being my first project, I was
      able to solve most challenges independently while experimenting with React
      libraries and best practices.
    </p>
    <hr />
    <h4><strong>Personal Reflection and Future Plans</strong></h4>
    <p>
      Dev.Tools started as a personal practice project, but it has grown into
      something that significantly boosts my own productivity. The tools not
      only make daily development tasks easier but also inspire new ideas for
      future improvements.
    </p>
    <p>
      Dev.Tools is not just a project—it&apos;s a solution for developers like
      me, by developers like me.
    </p>
  </div>
</template>

<template #rickshaw>
  <div>
    <h3>Rickshaw</h3>
    <p>
      Rickshaw is an open-source project designed to provide contact details for
      tourists traveling in rickshaws. The project was initially created as a
      request from a family member, blending utility with creative design.
      Available in the GitHub repository
      <UiExternalLink href="http://github.com/sabeerbikba/rickshaw"
        >sabeerbikba/rickshaw</UiExternalLink
      >, this project aims to deliver a simple yet effective solution tailored
      to a tourist audience.
    </p>
    <p>
      With features like a gallery for uploading and viewing images and a
      creatively designed home page resembling the back of a rickshaw, the
      project showcases both functionality and visual flair. It&apos;s
      accessible, user-friendly, and built to demonstrate creativity while
      meeting practical needs.
    </p>
    <hr />
    <h4><strong>Motivation and Goals</strong></h4>
    <p>
      The primary motivation behind the project was a request from a family
      member to create a website for tourists. This prompted me to take a simple
      idea and add creative touches to make it visually engaging while
      maintaining its utility.
    </p>
    <hr />
    <h4><strong>Features</strong></h4>
    <p>Rickshaw includes four primary pages:</p>
    <ol>
      <li>
        <UiExternalLink href="https://honnavarrickshawservice.vercel.app/">
          <strong>Home Page</strong>
        </UiExternalLink>
      </li>
      <li>
        <UiExternalLink
          href="https://honnavarrickshawservice.vercel.app/about-me"
        >
          <strong>About Me Page</strong>
        </UiExternalLink>
      </li>
      <li>
        <UiExternalLink
          href="https://honnavarrickshawservice.vercel.app/gallery"
        >
          <strong>Gallery Page</strong>
        </UiExternalLink>
      </li>
      <li>
        <UiExternalLink
          href="https://honnavarrickshawservice.vercel.app/contact"
        >
          <strong>Contact Page</strong>
        </UiExternalLink>
      </li>
    </ol>
  </div>
</template>
