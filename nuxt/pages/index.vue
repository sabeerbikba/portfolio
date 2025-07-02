<script setup lang="ts">
import localIcons from "~/data/icons";
import seoMetaMap from "~/data/seo";

const { baseUrl } = useRuntimeConfig().public;

useSeoMeta({
  robots: "index, follow",
  title: seoMetaMap.index.title,
  description: seoMetaMap.index.description,
  keywords: seoMetaMap.index.keywords,

  ogTitle: seoMetaMap.index.title,
  ogDescription: seoMetaMap.index.description,
  // TODO:
  // ogImage: ,
  ogUrl: baseUrl,
  ogType: "website",

  twitterCard: "summary_large_image",
  twitterTitle: seoMetaMap.index.title,
  twitterDescription: seoMetaMap.index.description,
  // TODO:
  // twitterImage: ,
});

const flipWords = ["functional", "beautiful", "impactful", "responsive"];

const aboutSectionParagraphs: string[] = [
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
        <ClientOnly>
          <FlipWords
            :words="flipWords"
            :duration="3000"
            class="text-neutral-700"
          />
          <template #fallback>
            <span class="sr-only">
              <template v-for="(word, i) in flipWords" :key="i">
                {{ word + (flipWords.length === i + 1 ? "" : ", ") }}
              </template>
            </span>
          </template>
        </ClientOnly>
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

    <!-- if good also add section here -->
    <ContainerScroll>
      <template #title>
        <UiHeading as="h2" class-name="md:text-[2.8rem]">
          Browse My Creations
          <br />
          <span
            class="text-5xl xs:text-[3.4rem] sm:text-[4.2rem] md:text-[5rem] font-bold mt-1 leading-none"
          >
            Featured Works
          </span>
        </UiHeading>
      </template>
      <template #screen>
        <ProjectsScreen />
      </template>
    </ContainerScroll>

    <section aria-describedby="tools-section">
      <div class="mb-4 text-center">
        <UiHeading id="tools-section">Development Tools & Expertise</UiHeading>
        <h2
          class="font-bold text-xg xs:text-2xl sm:text-3xl md:text-4xl max-xs:px-3 text-black/70"
        >
          Core Skills & Technologies
        </h2>
      </div>
      <!-- TODO: Is have any effect: in package size -->
      <LazyToolsPack :hydrate-on-idle="4200" />
      <!-- <ToolsPack /> -->
    </section>

    <section
      aria-labelledby="about-heading"
      class="about-section py-12 px-10 mt-9 bg-[rgb(240,240,240)] bg-[linear-gradient(0deg,_rgba(255,255,255,0.15)_0%,_rgb(240,240,240)_39%,_rgba(255,255,255,0.15)_100%)]"
    >
      <UiHeading id="about-heading"> About Me </UiHeading>
      <div class="max-w-[1200px] mx-auto text-center">
        <p
          v-for="(paragraph, index) in aboutSectionParagraphs"
          :key="index"
          class="mt-10 max-sm:mt-6 text-gray-600 font-medium indent-6 xs:tracking-wider text-base xs:text-lg sm:text-xl md:text-2xl"
          style="word-spacing: 4px"
          v-html="paragraph"
        />
      </div>
    </section>

    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white shadow-inner">
      <div class="max-w-3xl mx-auto text-center">
        <UiHeading
          as="h2"
          class-name="text-xl xs:text-2xl sm:text-3xl md:text-4xl"
        >
          Ready to start your next project?
        </UiHeading>
        <p
          class="mt-4 text-gray-600 text-base xs:text-lg sm:text-xl md:text-2xl"
        >
          Let&apos;s connect and bring your ideas to reality. Get in touch
          today!
        </p>
        <div
          class="mt-8 transition-transform duration-200 hover:scale-105 active:scale-95"
          tabindex="-1"
        >
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center text-base font-medium rounded-3xl text-white bg-black hover:bg-black/90 px-7 py-2 md:py-3 md:text-lg md:px-8"
          >
            Contact Me
            <span
              class="ml-2 animate-wiggle"
              v-html="localIcons.home.arrowRight"
            />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
