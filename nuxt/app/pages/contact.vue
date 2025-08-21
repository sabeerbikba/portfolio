<script setup lang="ts">
import { Motion, MotionPresence } from "@oku-ui/motion";
import socialMedia from "@/content/social-media";
import type { NuxtIconName } from "~~/types/icons";
import seoMetaMap from "~/content/seo";

type ContactInfoType = {
  icon: NuxtIconName;
  text: string;
  href: string;
  ariaLabel: string;
};

const URL = useNormalizeUrl();
const isHommePageLoading = ref(false);
const homepageLink = useState("home-page-link", () => "/");

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
  title: seoMetaMap.contact.title,
  description: seoMetaMap.contact.description,
  keywords: seoMetaMap.contact.keywords,

  ogTitle: seoMetaMap.contact.title,
  ogDescription: seoMetaMap.contact.description,
  ogUrl: URL,
  ogType: "website",

  twitterCard: "summary_large_image",
  twitterTitle: seoMetaMap.contact.title,
  twitterDescription: seoMetaMap.contact.description,
});

let interval: number | undefined;
const lastScrollY = ref(0);
const scrollDir = ref<"up" | "down">("up");
const isBackBtnFocused = ref(false);
const status = ref("Send");
const sendingFrame = ref(0);
const sendingFrames = ["Sending", "Sending.", "Sending..", "Sending..."];

const handleSubmit = async (): Promise<void> => {
  // html message accepting empty spaces need to check before submit
  // TODO: create api or use same page api link to process the data with post request
  status.value = "Sending";
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const success = false;
  if (success) {
    status.value = "Sent";
    // name.value = "";
    // email.value = "";
    // message.value = "";
  } else {
    status.value = "Retry";
  }
};

watchEffect(() => {
  if (status.value === "Sending") {
    interval = window.setInterval(() => {
      sendingFrame.value = (sendingFrame.value + 1) % sendingFrames.length;
    }, 500);
  } else {
    clearInterval(interval);
  }
});

const handleScroll = () => {
  const currentY = window.scrollY;
  scrollDir.value = currentY > lastScrollY.value ? "down" : "up";
  lastScrollY.value = currentY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  clearInterval(interval);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div
    class="min-h-screen w-full overflow-x-hidden text-white py-12 px-4 sm:px-6 lg:px-8 lg:py-28 lg:table"
  >
    <div class="max-w-7xl mx-auto lg:table-cell lg:align-middle lg:text-center">
      <Motion
        as="div"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8 }"
        class="text-center mb-12 max-lg:mb-2"
        aria-labelledby="get-in-touch-heading"
      >
        <h1
          id="get-in-touch-heading"
          class="text-4xl font-extrabold sm:text-5xl md:text-6xl text-black mb-2"
        >
          Get in Touch
        </h1>
        <h2
          class="text-2xl font-extrabold sm:text-3xl md:text-4xl text-black/70"
        >
          Let's Create Something Amazing
        </h2>
        <p
          class="mt-3 max-w-md mx-auto text-xl text-gray-600 sm:text-2xl md:mt-5 md:max-w-3xl"
        >
          Have a project in mind or just want to say hello? Feel free to reach
          out!
        </p>
      </Motion>

      <div class="mt-10 max-lg:mt-2">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <Motion
              as="form"
              @submit.prevent="handleSubmit"
              :initial="{ opacity: 0, x: -50 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ duration: 0.8, delay: 0.4 }"
              class="p-5 md:p-6 lg:p-8 rounded-lg shadow-lg grid grid-cols-1 gap-y-6 bg-[#00000008] border border-[#8080804f] max-lg:w-[80%] max-lg:mx-auto max-sm:w-full max-w-2xl ml-auto"
              aria-labelledby="contactFormTitle"
            >
              <AccessibilityHeadingSrOnly id="contactFormTitle"
                >Contact Us Form</AccessibilityHeadingSrOnly
              >
              <div class="my-8">
                <div class="max-w-xl mx-auto">
                  <div
                    v-for="{
                      label,
                      labelId,
                      type,
                      elementType,
                      placeholder,
                      minlength,
                      maxlength,
                      ariaDescribedbyId,
                      ariaDescribedbyText,
                    } in [
                      {
                        label: 'Name',
                        labelId: 'name',
                        type: 'text',
                        elementType: 'input',
                        placeholder: 'Your name',
                        minlength: 3,
                        maxlength: 70,
                        ariaDescribedbyId: 'nameDescription',
                        ariaDescribedbyText:
                          'Please enter your full name (3–70 characters).',
                      },
                      {
                        label: 'Email Address',
                        labelId: 'email',
                        type: 'email',
                        elementType: 'input',
                        placeholder: 'you@example.com',
                        minlength: undefined,
                        maxlength: undefined,
                        ariaDescribedbyId: 'emailDescription',
                        ariaDescribedbyText:
                          'Please enter a valid email address.',
                      },
                      {
                        label: 'Message',
                        labelId: 'message',
                        type: undefined,
                        elementType: 'textarea',
                        placeholder: 'Your message here...',
                        minlength: 20,
                        maxlength: 600,
                        ariaDescribedbyId: 'messageDescription',
                        ariaDescribedbyText:
                          'Please enter your message. Minimum 20 characters.',
                      },
                    ]"
                    :key="label"
                    class="flex flex-col space-y-2 w-full mb-4"
                    aria-label="Input field group"
                    role="group"
                  >
                    <label
                      class="text-sm md:text-base font-medium text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left px-2"
                      :for="labelId"
                    >
                      {{ label }}
                    </label>
                    <SharedInput
                      :id="labelId"
                      :type
                      :placeholder
                      :minlength
                      :maxlength
                      :aria-describedby="ariaDescribedbyId"
                      :autocomplete="
                        elementType === 'input' ? labelId : undefined
                      "
                      :class="{
                        'h-40 resize-none': elementType === 'textarea',
                      }"
                      aria-required="true"
                      required
                      :element-type="elementType as 'input' | 'textarea'"
                    />
                    <small :id="ariaDescribedbyId" class="sr-only">
                      {{ ariaDescribedbyText }}
                    </small>
                  </div>
                  <button
                    class="center text-xl gap-1 bg-gradient-to-br relative group/btn from-black to-neutral-600 block w-full text-white rounded-md h-11 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    type="submit"
                    :disabled="status === 'Sending'"
                    :aria-busy="status === 'Sending'"
                    :aria-live="status === 'Sending' ? 'polite' : 'assertive'"
                    :aria-label="status"
                  >
                    <MotionPresence mode="wait">
                      <Motion
                        v-if="status === 'Sending'"
                        as="span"
                        :initial="{ y: 10, opacity: 0 }"
                        :animate="{ y: 0, opacity: 1 }"
                        :exit="{ y: -10, opacity: 0 }"
                        :transition="{ duration: 0.3 }"
                      >
                        {{ sendingFrames[sendingFrame] }}
                      </Motion>
                      <Motion
                        v-else
                        as="span"
                        :initial="{ y: 10, opacity: 0 }"
                        :animate="{ y: 0, opacity: 1 }"
                        :exit="{ y: -10, opacity: 0 }"
                        :transition="{ duration: 0.3 }"
                      >
                        <span className="center gap-1">
                          <NuxtIcon
                            v-if="status === 'Send'"
                            name="ic:sharp-send"
                            aria-hidden="true"
                            class="rotate-[305deg] relative bottom-0.5 h-[18px] w-auto"
                          />
                          <NuxtIcon
                            v-if="status === 'Sent'"
                            name="ic:baseline-check-circle"
                            aria-hidden="true"
                          />
                          <NuxtIcon
                            v-if="status === 'Retry'"
                            name="ic:sharp-error"
                            aria-hidden="true"
                            class="pr-0.5 h-[18px] w-auto"
                          />

                          <span>{{ status === "Sending" ? "" : status }} </span>
                        </span>
                      </Motion>
                    </MotionPresence>

                    <!-- Button Bottom Gradient  -->
                    <span
                      class="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent"
                    />
                    <span
                      class="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-500 to-transparent"
                    />
                  </button>
                </div>
              </div>
            </Motion>
          </div>

          <div>
            <Motion
              as="div"
              :initial="{ opacity: 0, x: 50 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ duration: 0.8, delay: 0.4 }"
              class="p-5 md:p-6 lg:p-8 rounded-lg shadow-lg bg-[#00000008] border border-[#8080804f] max-lg:w-[80%] max-lg:mx-auto max-sm:w-full h-full w-full max-w-2xl mr-auto grid grid-cols-1"
            >
              <div class="lg:table">
                <div class="lg:table-cell lg:align-middle lg:text-center">
                  <div class="mb-6 w-full">
                    <h1
                      class="text-3xl md:text-4xl font-bold text-black text-start lg:pl-6 center"
                    >
                      Sabeer Bikba
                    </h1>
                    <h2
                      class="text-lg sm:text-xl md:text-2xl text-center pt-2 font-base text-gray-600 lg:pl-6 center"
                    >
                      Full-Stack Developer & UI/UX Enthusiast
                    </h2>
                  </div>

                  <div class="space-y-4 mb-8">
                    <div
                      v-for="({ href, ariaLabel, icon, text }, index) in [
                        {
                          icon: 'ic:round-email',
                          text: 'sabeerbikba02@gmail.com',
                          href: 'mailto:sabeerbikba02@gmail.com',
                          ariaLabel: 'Email sabeerbikba02@gmail.com',
                        },
                        {
                          icon: 'ic:round-phone',
                          // text: '+91 861 871 8358',
                          text: '+91&nbsp;861&nbsp;871&nbsp;8358',
                          href: 'tel:+918618718358',
                          ariaLabel: 'Call +91 861 871 8358',
                        },
                        {
                          icon: 'mdi:map-marker',
                          text: 'India, Karnataka',
                          href: 'https://www.google.com/maps/place/Karnataka',
                          ariaLabel: 'Location India, Karnataka',
                        },
                      ] as ContactInfoType[]"
                      :key="index"
                      class="center space-x-3 ml-2"
                    >
                      <SharedExternalLink
                        :href
                        class="pr-2 text-gray-600 hover:text-gray-800 center text-base sm:text-lg md:text-xl"
                        :aria-label="ariaLabel"
                      >
                        <div
                          class="w-7 sm:w-9 md:w-10 h-7 sm:h-9 md:h-10 mr-2 rounded-full bg-gray-100 center"
                          aria-hidden="true"
                          role="presentation"
                        >
                          <NuxtIcon :name="icon" />
                        </div>
                        {{ text }}
                      </SharedExternalLink>
                    </div>
                  </div>

                  <div
                    role="separator"
                    aria-hidden="true"
                    class="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-0.5 w-full"
                  />

                  <div class="flex justify-center space-x-4">
                    <SharedExternalLink
                      v-for="{ label, href, icon } in socialMedia"
                      :key="label"
                      :href
                      :aria-label="`Link to ${label}`"
                      class="w-10 h-10 rounded-full max-xs:!ml-[6px] text-gray-600 hover:text-gray-800 bg-gray-200 center hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    >
                      <NuxtIcon
                        :name="icon"
                        class="h-[21px] w-[21px] fill-current"
                      />
                    </SharedExternalLink>
                  </div>
                </div>
              </div>
            </Motion>
          </div>
        </div>
      </div>
    </div>

    <Motion
      as="div"
      :initial="{ y: 0, opacity: 0 }"
      :animate="
        scrollDir === 'up' || isBackBtnFocused
          ? { y: 0, opacity: 1 }
          : { y: -100, opacity: 0 }
      "
      :transition="{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: scrollDir === 'up' || isBackBtnFocused ? 0 : 0.57,
      }"
      :class="
        useCn(
          'bg-[#ffffffcf] inline-table border-2 lg:border-[3px] border-black text-black rounded-full shadow-2xl hover:shadow-none shadow-gray-300 fixed top-4 inset-x-4',
          isHommePageLoading && 'border-black/55 border-none'
        )
      "
      @focusin="isBackBtnFocused = true"
      @focusout="isBackBtnFocused = false"
    >
      <NuxtLink
        :to="homepageLink"
        class="center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black md:h-9 md:w-9 lg:h-12 lg:w-12 h-[30px] w-[30px]"
        aria-label="Back to home page"
        title="Back to home page"
      >
        <NuxtIcon
          v-if="!isHommePageLoading"
          name="ic:round-arrow-back-ios"
          class="wh-full relative right-0.5"
          aria-hidden="true"
          @click="isHommePageLoading = true"
        />
        <div
          v-else
          data-nosnippet
          class="relative inline-block text-[28px] h-1 translate-x-[-14px] translate-y-[11px]"
        >
          <span
            v-for="i in 12"
            :key="i"
            class="absolute left-[0.4629em] bottom-0 w-[0.074em] h-[0.2777em] rounded-[0.0555em] origin-[center_-0.2222em] animate-spinner"
            :style="{
              transform: `rotate(${(i - 1) * 30}deg)`,
              animationDelay: `${(i - 1) * (1 / 12)}s`,
            }"
          />
        </div>
      </NuxtLink>
    </Motion>
  </div>
</template>
