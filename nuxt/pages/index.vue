<script setup>
import tools from "~/data/tools";

const aboutSectionParagraphs = [
  "Hi, I’m Sabeer Bikba, a <strong class='font-medium'>full-stack developer</strong> with a passion for creating dynamic <strong class='font-medium'>React front-end applications</strong>. I specialize in building intuitive and responsive user interfaces that provide smooth experiences across devices.",
  "While my expertise spans both front-end and back-end development, I’m particularly focused on delivering high-quality, interactive React apps. I’m also exploring <strong class='font-medium'>mobile development with React Native</strong> to create seamless cross-platform mobile experiences.",
  "I’m always eager to take on new challenges and push the boundaries of web and mobile development.",
];
</script>

<template>
  <div>
    <section aria-labelledby="hero-section"
      class="flex flex-col items-center justify-end h-[18rem] xs:h-[22rem] sm:h-[27rem] md:h-[32rem] bg-gradient-to-b from-white-400 via-gray-100 to-white-400">
      <UiHeading id="hero-section">
        Let&apos;s Build Something Amazing
      </UiHeading>
      <div
        class="font-normal text-neutral-600 mx-auto py-4 xs:py-5 sm:py-6 md:py-7 text-[24px] xs:text-[28px] sm:text-[34px] md:text-[40px]">
        Designing
        <AceternityFlipWords :words="['functional', 'beautiful', 'impactful', 'responsive']" :duration="3000"
          class="text-4xl !text-primary" />
        <br />
        solutions for your business
      </div>
      <div role="group" aria-label="Call to action button"
        class="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <NuxtLink to="/contact" aria-label="Start a conversation with me by visiting the contact page"
          class="border border-transparent font-medium rounded-3xl text-white bg-black hover:bg-black/90 px-7 py-1.5 md:py-2.5 md:text-lg md:px-8">
          Let&apos;s Chat
        </NuxtLink>
      </div>
    </section>

    <ContainerScroll>
      <template #title>
        <UiHeading as="h2" className="md:text-[2.8rem]">
          Browse My Creations
          <br />
          <span className="text-5xl xs:text-[3.4rem] sm:text-[4.2rem] md:text-[5rem] font-bold mt-1 leading-none">
            Featured Works
          </span>
        </UiHeading>
      </template>
      <template #screen>
        <div class="text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum voluptas voluptatibus harum quidem quas
          repellat id asperiores aliquid? Eius placeat ipsa reprehenderit distinctio repellendus neque nesciunt velit,
          corporis dolor esse quis minima voluptates eligendi recusandae vero magnam commodi beatae reiciendis non
          facilis
          itaque optio assumenda saepe earum. Ex dignissimos consectetur quidem, non modi earum laboriosam officiis
          eius.
          Necessitatibus, dolorum aliquam labore dolore quam consequuntur possimus distinctio dicta exercitationem nam
          praesentium perferendis maiores eveniet excepturi odio quia fugit non voluptatem accusantium dolores modi enim
          tempore sint! Fugiat, totam voluptatibus quo quas laboriosam quos, officiis impedit eum aperiam eius veniam
          voluptas in, quis fuga. Non, beatae similique ipsa iure libero quo dolor quasi voluptatibus voluptas quae
          impedit? Alias harum maiores eos et minus. Repellendus nam animi iste, esse, nemo suscipit sapiente repellat
          laborum blanditiis illum ad culpa quo saepe voluptas, necessitatibus enim consequuntur eum! At, illo
          asperiores?
          Rerum placeat voluptatem iusto maiores minus ab unde eum ullam veniam aut doloribus velit sit alias, eveniet
        </div>
      </template>
    </ContainerScroll>


    <section aria-describedby="tools-section">
      <div class="mb-4 text-center">
        <UiHeading id="tools-section">Development Tools & Expertise</UiHeading>
        <h2 class="font-bold text-xg xs:text-2xl sm:text-3xl md:text-4xl max-xs:px-3 text-black/70">
          Core Skills & Technologies
        </h2>
      </div>
      <ToolsPack :tools="tools" />
    </section>

    <section aria-labelledby="about-heading" class="about-section py-12 px-10 mt-9 bg-[rgb(240,240,240)]" style="
        background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.15) 0%,
          rgb(240, 240, 240) 39%,
          rgba(255, 255, 255, 0.15) 100%
        );
      ">
      <UiHeading id="about-heading"> About Me </UiHeading>
      <div class="max-w-[1200px] mx-auto text-center">
        <p v-for="(paragraph, index) in aboutSectionParagraphs" :key="index"
          class="mt-10 max-sm:mt-6 text-gray-600 font-medium indent-6 tracking-wider text-base xs:text-lg sm:text-xl md:text-2xl"
          style="word-spacing: 4px" v-html="paragraph" />
      </div>
    </section>

    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white shadow-inner">
      <div class="max-w-3xl mx-auto text-center">
        <UiHeading as="h2" class="text-xl xs:text-2xl sm:text-3xl md:text-4xl">
          Ready to start your next project?
        </UiHeading>
        <p class="mt-4 text-gray-600 text-base xs:text-lg sm:text-xl md:text-2xl">
          Let&apos;s connect and bring your ideas to reality. Get in touch
          today!
        </p>
        <!-- whileHover={{ scale: 1.05 }} -->
        <!-- whileTap={{ scale: 0.95 }} -->
        <div class="mt-8" tabIndex="-1">
          <NuxtLink to="/contact"
            class="inline-flex items-center justify-center text-base font-medium rounded-3xl text-white bg-black hover:bg-black/90 px-7 py-2 md:py-3 md:text-lg md:px-8">
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
