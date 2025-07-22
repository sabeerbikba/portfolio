<script setup lang="ts">
import "~/assets/css/style.index.css";
import seoMetaMap from "~/content/seo";
import { localIcons } from "~/content/icons";

const router = useRouter();
const URL = useNormalizeUrl();
const homepageLink = useState<string>("home-page-link");
const [isHeroCotBtn] = useTabState(["is-projects-github"]);

const isToolsPackHydrationComplete = ref(false);
const toolPackOpacityStyle = ref("0");
const toolPackPointerEventsStyle = ref("none");

useHead({
  link: [
    {
      rel: "canonical",
      href: URL,
    },
  ],
});

useSeoMeta({
  robots: "index, follow",
  title: seoMetaMap.index.title,
  description: seoMetaMap.index.description,
  keywords: seoMetaMap.index.keywords,

  ogTitle: seoMetaMap.index.title,
  ogDescription: seoMetaMap.index.description,
  // TODO:
  // ogImage: ,
  ogUrl: URL,
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

const onToolPackHydreate = () => {
  isToolsPackHydrationComplete.value = true;
};

watch(isToolsPackHydrationComplete, (isHydrated) => {
  toolPackOpacityStyle.value = isHydrated ? "1" : "0";
  toolPackPointerEventsStyle.value = isHydrated ? "auto" : "none";
});

onMounted(() => {
  const hash = window.location.hash;

  if (hash) {
    useTimeoutFn(
      () => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      },
      6,
      { immediate: true }
    );
  }
});
</script>

<template>
  <div class="overflow-x-hidden">
    <section
      aria-labelledby="hero"
      class="flex flex-col items-center justify-end h-[18rem] xs:h-[22rem] sm:h-[27rem] md:h-[32rem] bg-gradient-to-b from-white-400 via-gray-100 to-white-400"
    >
      <SharedHeading id="hero"> Let&apos;s Build Something Amazing </SharedHeading>
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
        <SharedNuxtLink
          to="/contact"
          aria-label="Start a conversation with me by visiting the contact page"
          class="border border-transparent font-medium rounded-3xl text-white bg-black hover:bg-black/90 px-7 py-1.5 md:py-2.5 md:text-lg md:px-8"
          @focus="isHeroCotBtn.focused = true"
          @keydown.tab="isHeroCotBtn.tabClicked = true"
        >
          Let&apos;s Chat
        </SharedNuxtLink>
      </div>
    </section>

    <ContainerScrollSection aria-labelledby="projects">
      <template #heading>
        <AccessibilityHeadingSrOnly as="h1" id="projects">
          Projects Details
        </AccessibilityHeadingSrOnly>
      </template>
      <template #title>
        <SharedHeading as="h1" class-name="md:text-[2.8rem]">
          Browse My Creations
          <br />
          <span
            class="text-5xl xs:text-[3.4rem] sm:text-[4.2rem] md:text-[5rem] font-bold mt-1 leading-none"
          >
            Featured Works
          </span>
        </SharedHeading>
      </template>
      <template #screen>
        <ProjectsScreen />
      </template>
    </ContainerScrollSection>

    <section aria-describedby="tools-using">
      <div class="mb-4 text-center">
        <SharedHeading id="tools-using">Development Tools & Expertise</SharedHeading>
        <h2
          class="font-bold text-xg xs:text-2xl sm:text-3xl md:text-4xl max-xs:px-3 text-black/70"
        >
          Core Skills & Technologies
        </h2>
      </div>
      <div class="relative">
        <LazyToolsPack
          :hydrate-after="2300"
          class="tools-pack-visible"
          @hydrated="onToolPackHydreate"
        />
        <ClientOnly v-if="!isToolsPackHydrationComplete">
          <div
            data-nosnippet
            class="center wh-full absolute top-0"
            aria-hidden="true"
            role="presentation"
          >
            <div class="relative center loader-tools-pack" />
          </div>
        </ClientOnly>
      </div>
    </section>

    <section
      aria-labelledby="about-me"
      class="about-section py-12 px-10 mt-9 bg-[rgb(251 251 251 / 50%)] bg-[linear-gradient(0deg,_rgba(255,255,255,1)_0%,_rgba(250,250,250,50)_50%,_rgba(255,255,255,0)_100%)]"
    >
      <SharedHeading id="about-me">About Me</SharedHeading>
      <div class="max-w-[1200px] mx-auto text-center about-div">
        <p
          v-for="(paragraph, key) in aboutSectionParagraphs"
          :key
          v-html="paragraph"
        />
      </div>
    </section>

    <section
      aria-labelledby="connect"
      class="py-20 px-4 sm:px-6 lg:px-8 bg-white shadow-inner"
    >
      <div class="max-w-3xl mx-auto text-center">
        <SharedHeading
          as="h2"
          id="connect"
          class-name="text-xl xs:text-2xl sm:text-3xl md:text-4xl"
        >
          Ready to start your next project?
        </SharedHeading>
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
          <SharedNuxtLink
            to="/contact"
            class="inline-flex items-center justify-center text-base font-medium rounded-3xl text-white bg-black hover:bg-black/90 px-7 py-2 md:py-3 md:text-lg md:px-8"
          >
            Contact Me
            <span
              class="ml-2 animate-wiggle"
              data-nosnippet
              v-html="localIcons.home.arrowRight"
            />
          </SharedNuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.about-div p {
  @apply mt-10 max-sm:mt-6 text-gray-600 font-medium indent-6 xs:tracking-wider text-base xs:text-lg sm:text-xl md:text-2xl [word-spacing:4px] max-md:[word-spacing:2px] max-xs:[word-spacing:normal];
}

a.text-white[data-nuxt-link]:focus-visible {
  @apply outline outline-gray-500 outline-[3px] outline-offset-4;
}

.tools-pack-visible {
  opacity: v-bind(toolPackOpacityStyle);
  pointer-events: v-bind(toolPackPointerEventsStyle);
  transition: opacity 0.3s ease;
}
</style>
