<script setup>
import tools from "~/data/tools";

const toolss = [
  {
    // Code Editors

    name: "VScode",
    linkUrl: "https://code.visualstudio.com/",
    proficiency: 40,
    imageUrl: `<svg viewBox="-5 -10 150 150">
      <mask id="a" width="128" height="128" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }}>
        <path fill="#fff" fill-rule="evenodd" d="M90.767 127.126a7.968 7.968 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64 1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.327 5.327 0 0 0 6.807.303l21.974-16.68 50.45 46.025a7.96 7.96 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z" clip-rule="evenodd" />
      </mask>
      <g mask="url(#a)">
        <path fill="#0065A9" d="M123.471 13.82 97.097 1.12A7.973 7.973 0 0 0 88 2.668L1.662 81.387a5.333 5.333 0 0 0 .006 7.887l7.052 6.411a5.333 5.333 0 0 0 6.811.303l103.971-78.875c3.488-2.646 8.498-.158 8.498 4.22v-.306a8.001 8.001 0 0 0-4.529-7.208Z" />
        <g filter="url(#b)">
          <path fill="#007ACC" d="m123.471 114.181-26.374 12.698A7.973 7.973 0 0 1 88 125.333L1.662 46.613a5.333 5.333 0 0 1 .006-7.887l7.052-6.411a5.333 5.333 0 0 1 6.811-.303l103.971 78.874c3.488 2.647 8.498.159 8.498-4.219v.306a8.001 8.001 0 0 1-4.529 7.208Z" />
        </g>
        <g filter="url(#c)">
          <path fill="#1F9CF0" d="M97.098 126.882A7.977 7.977 0 0 1 88 125.333c2.952 2.952 8 .861 8-3.314V5.98c0-4.175-5.048-6.266-8-3.313a7.977 7.977 0 0 1 9.098-1.549L123.467 13.8A8 8 0 0 1 128 21.01v85.982a8 8 0 0 1-4.533 7.21l-26.369 12.681Z" />
        </g>
        <path fill="url(#d)" fill-rule="evenodd" d="M90.69 127.126a7.968 7.968 0 0 0 6.349-.244l26.353-12.681a8 8 0 0 0 4.53-7.21V21.009a8 8 0 0 0-4.53-7.21L97.039 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026-21.974-16.68a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.336 5.336 0 0 0-.006 7.888L20.718 64 1.662 81.386a5.335 5.335 0 0 0 .006 7.888l7.048 6.411a5.328 5.328 0 0 0 6.807.303l21.975-16.681 50.45 46.026a7.959 7.959 0 0 0 2.742 1.793Zm5.252-92.184L57.662 64l38.28 29.057V34.943Z" clip-rule="evenodd" opacity="0.25" style={{ mixBlendMode: "overlay" }} />
      </g>
      <defs>
        <filter id="b" width="144.744" height="113.408" x="-8.41115" y="22.5944" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood flood-opacity="0" result="BackgroundImageFix">
          </feFlood>
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0">
          </feColorMatrix>
          <feOffset>
          </feOffset>
          <feGaussianBlur stdDeviation="4.16667">
          </feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0">
          </feColorMatrix>
          <feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow_1_36">
          </feBlend>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_36" result="shape">
          </feBlend>
        </filter>
        <filter id="c" width="56.6667" height="144.007" x="79.6667" y="-8.0035" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood flood-opacity="0" result="BackgroundImageFix">
          </feFlood>
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0">
          </feColorMatrix>
          <feOffset>
          </feOffset>
          <feGaussianBlur stdDeviation="4.16667">
          </feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0">
          </feColorMatrix>
          <feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow_1_36">
          </feBlend>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_36" result="shape">
          </feBlend>
        </filter>
        <linearGradient id="d" x1="63.9222" x2="63.9222" y1="0.329902" y2="127.67" gradientUnits="userSpaceOnUse">
          <stop stop-color="#fff" />
          <stop offset="1" stop-color="#fff" stop-opacity="0">
          </stop>
        </linearGradient>
      </defs>
    </svg>`,
  },
];

const aboutSectionParagraphs = [
  "Hi, I’m Sabeer Bikba, a <strong class='font-medium'>full-stack developer</strong> with a passion for creating dynamic <strong class='font-medium'>React front-end applications</strong>. I specialize in building intuitive and responsive user interfaces that provide smooth experiences across devices.",
  "While my expertise spans both front-end and back-end development, I’m particularly focused on delivering high-quality, interactive React apps. I’m also exploring <strong class='font-medium'>mobile development with React Native</strong> to create seamless cross-platform mobile experiences.",
  "I’m always eager to take on new challenges and push the boundaries of web and mobile development.",
];
</script>

<template>
  <div>
    <section
      aria-labelledby="hero-section"
      class="flex flex-col items-center justify-end h-[18rem] xs:h-[22rem] sm:h-[27rem] md:h-[32rem] bg-gradient-to-b from-white-400 via-gray-100 to-white-400"
    >
      <UiHeading id="hero-section">
        Let&apos;s Build Something Amazing
      </UiHeading>
      <div
        class="font-normal text-neutral-600 mx-auto py-4 xs:py-5 sm:py-6 md:py-7 text-[24px] xs:text-[28px] sm:text-[34px] md:text-[40px]"
      >
        Designing
        <AceternityFlipWords
          :words="['functional', 'beautiful', 'impactful', 'responsive']"
          :duration="3000"
          class="text-4xl !text-primary"
        />
        <br />
        solutions for your business
      </div>
      <div
        role="group"
        aria-label="Call to action button"
        class="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4"
      >
        <NuxtLink
          to="/contact"
          aria-label="Start a conversation with me by visiting the contact page"
          class="border border-transparent font-medium rounded-3xl text-white bg-black hover:bg-black/90 px-7 py-1.5 md:py-2.5 md:text-lg md:px-8"
        >
          Let&apos;s Chat
        </NuxtLink>
      </div>
    </section>

    <section aria-describedby="tools-section">
      <div class="mb-4 text-center">
        <UiHeading id="tools-section">Development Tools & Expertise</UiHeading>
        <h2
          class="font-bold text-xg xs:text-2xl sm:text-3xl md:text-4xl max-xs:px-3 text-black/70"
        >
          Core Skills & Technologies
        </h2>
      </div>
      <div
        class="max-w-[1000px] mx-auto aspect-square text-2xl max-xs:-mt-4 max-sm:-mt-3 max-md:-mt-2"
      >
        <ToolsPack :tools="tools" />
      </div>
    </section>

    <section
      aria-labelledby="about-heading"
      class="about-section py-12 px-10 mt-9 bg-[rgb(240,240,240)]"
      style="
        background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.15) 0%,
          rgb(240, 240, 240) 39%,
          rgba(255, 255, 255, 0.15) 100%
        );
      "
    >
      <UiHeading id="about-heading"> About Me </UiHeading>
      <div class="max-w-[1200px] mx-auto text-center">
        <p
          v-for="(paragraph, index) in aboutSectionParagraphs"
          :key="index"
          class="mt-10 max-sm:mt-6 text-gray-600 font-medium indent-6 tracking-wider text-base xs:text-lg sm:text-xl md:text-2xl"
          style="word-spacing: 4px"
          v-html="paragraph"
        />
      </div>
    </section>

    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white shadow-inner">
      <div class="max-w-3xl mx-auto text-center">
        <UiHeading as="h2" class="text-xl xs:text-2xl sm:text-3xl md:text-4xl">
          Ready to start your next project?
        </UiHeading>
        <p
          class="mt-4 text-gray-600 text-base xs:text-lg sm:text-xl md:text-2xl"
        >
          Let&apos;s connect and bring your ideas to reality. Get in touch
          today!
        </p>
        <!-- whileHover={{ scale: 1.05 }} -->
        <!-- whileTap={{ scale: 0.95 }} -->
        <div class="mt-8" tabIndex="-1">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center text-base font-medium rounded-3xl text-white bg-black hover:bg-black/90 px-7 py-2 md:py-3 md:text-lg md:px-8"
          >
            Contact Me
            <!-- animate={{ x: [0, 5, 0] }} -->
            <!-- transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} -->
            <span class="ml-2">
              <!-- <TiArrowRight class="w-5 h-5" /> -->
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- <Teleport to="body"> -->
    <!-- <Teleport :to="teleportTarget"> </Teleport> -->
  </div>
</template>
