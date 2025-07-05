<script setup lang="ts">
import { localIcons } from "~/data/icons";
import seoMetaMap from "~/data/seo";

const router = useRouter();
const { baseUrl } = useRuntimeConfig().public;
const homepageLink = useState<string>("home-page-link");

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

onMounted(() => {
  const setListeners = (() => {
    const iifeFn = () => {
      if (router.currentRoute.value.path === "/") {
        const links = document.querySelectorAll("a[data-nuxt-link]");
        links.forEach((link) => {
          link.addEventListener("click", () => {
            const href = link.getAttribute("href");
            if (href !== "/") {
              const link = router.currentRoute.value.fullPath;
              homepageLink.value = link;
            }
          });
        });
      }
    };
    iifeFn();
    return iifeFn;
  })();

  router.afterEach(() => {
    setTimeout(setListeners, 0); // next tick
  });
});
</script>

<template>
  <div class="overflow-x-hidden">
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
        <UiNuxtLink
          to="/contact"
          aria-label="Start a conversation with me by visiting the contact page"
          class="border border-transparent font-medium rounded-3xl text-white bg-black hover:bg-black/90 px-7 py-1.5 md:py-2.5 md:text-lg md:px-8"
        >
          Let&apos;s Chat
        </UiNuxtLink>
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
      <div class="max-w-[1200px] mx-auto text-center about-div">
        <p
          v-for="(paragraph, index) in aboutSectionParagraphs"
          :key="index"
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
          <UiNuxtLink
            to="/contact"
            class="inline-flex items-center justify-center text-base font-medium rounded-3xl text-white bg-black hover:bg-black/90 px-7 py-2 md:py-3 md:text-lg md:px-8"
          >
            Contact Me
            <span
              class="ml-2 animate-wiggle"
              v-html="localIcons.home.arrowRight"
            />
          </UiNuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.about-div p {
  @apply mt-10 max-sm:mt-6 text-gray-600 font-medium indent-6 xs:tracking-wider text-base xs:text-lg sm:text-xl md:text-2xl [word-spacing:4px] max-md:[word-spacing:2px] max-xs:[word-spacing:normal];
}

/* Moved styles here to avoid separate CSS file creation and reduce extra requests */
/* tools-pack.vue */
.circle-item {
  @apply transition-all duration-200 ease-in-out will-change-transform
    hover:scale-110 hover:z-10 absolute shadow-lg
    bg-white rounded-full z-0 border-[0.5px];
}

.circle-image {
  @apply absolute bg-no-repeat bg-center bg-contain rounded-full
    w-[95%] h-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
}

.circle-tooltip {
  @apply transition-opacity duration-300 ease-in-out absolute z-50
    text-sm bg-gray-800 text-white p-2 pointer-events-none transform
    opacity-0 shadow-xl rounded-lg
    flex flex-col items-center;
}

.circle-tooltip-text {
  @apply whitespace-nowrap font-bold z-20 relative;
}

/* app.vue */
.footer-links li {
  @apply flex justify-center space-y-4 flex-col mt-4;
}

.footer-links li a {
  @apply transition-colors;
}
</style>
