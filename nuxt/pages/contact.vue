<script setup lang="ts">
import { IoMdMail, IoIosArrowBack } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import socialMedia from "@/data/social-media";
import type { IconType } from "react-icons/lib";

type ContactInfoType = {
  icon: IconType;
  text: string;
  href: string;
  ariaLabel: string;
};

const name: Ref<string> = ref("");
const email: Ref<string> = ref("");
const message: Ref<string> = ref("");
const status: Ref<string> = ref("Send");

const contactInfo: ContactInfoType[] = [
  {
    icon: IoMdMail,
    text: "sabeerbikba02@gmail.com",
    href: "mailto:sabeerbikba02@gmail.com",
    ariaLabel: "Email sabeerbikba02@gmail.com",
  },
  {
    icon: FaPhoneAlt,
    text: "+91 861 871 8358",
    href: "tel:+918618718358",
    ariaLabel: "Call +91 861 871 8358",
  },
  {
    icon: FaLocationDot,
    text: "India, Karnataka",
    href: "https://www.google.com/maps/place/Karnataka",
    ariaLabel: "Location India, Karnataka",
  },
];

const handleSubmit = async (): Promise<void> => {
  status.value = "Sending";
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const success = false;
  if (success) {
    status.value = "Sent";
    name.value = "";
    email.value = "";
    message.value = "";
  } else {
    status.value = "Retry";
  }
};
</script>

<template>
  <div
    class="min-h-screen w-full overflow-x-hidden text-white py-12 px-4 sm:px-6 lg:px-8 lg:py-28 lg:table"
  >
    <div class="max-w-7xl mx-auto lg:table-cell lg:align-middle lg:text-center">
      <transition name="fade-slide-up">
        <div
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
            Let&apos;s Create Something Amazing
          </h2>
          <p
            class="mt-3 max-w-md mx-auto text-xl text-gray-600 sm:text-2xl md:mt-5 md:max-w-3xl"
          >
            Have a project in mind or just want to say hello? Feel free to reach
            out!
          </p>
        </div>
      </transition>

      <div class="mt-10 max-lg:mt-2">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <!-- <ContactForm /> start -->
          <div>
            <div
              class="p-5 md:p-6 lg:p-8 rounded-lg shadow-lg grid grid-cols-1 gap-y-6 bg-[#00000008] border border-[#8080804f] max-lg:w-[80%] max-lg:mx-auto max-sm:w-full max-w-2xl ml-auto"
              role="form"
              aria-labelledby="contactFormTitle"
            >
              <h2 id="contactFormTitle" class="sr-only">Contact Us Form</h2>
              <form class="my-8" @submit.prevent="handleSubmit">
                <div class="max-w-xl mx-auto">
                  <div
                    class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"
                  >
                    <UiLabelInputContainer>
                      <UiLabel for="name">Name</UiLabel>
                      <UiInput
                        id="name"
                        type="text"
                        v-model="name"
                        placeholder="Your name"
                        minlength="3"
                        maxlength="70"
                        required
                        aria-required="true"
                      />
                    </UiLabelInputContainer>
                  </div>

                  <UiLabelInputContainer class="mb-4">
                    <UiLabel for="email">Email Address</UiLabel>
                    <UiInput
                      id="email"
                      type="email"
                      v-model="email"
                      placeholder="you@example.com"
                      required
                      aria-required="true"
                      aria-describedby="emailDescription"
                    />
                    <small id="emailDescription" class="sr-only"
                      >Please enter a valid email address.</small
                    >
                  </UiLabelInputContainer>

                  <UiLabelInputContainer class="mb-4">
                    <UiLabel for="message">Message</UiLabel>
                    <UiInput
                      element-type="textarea"
                      id="message"
                      v-model="message"
                      placeholder="Your message here..."
                      minlength="20"
                      maxlength="600"
                      required
                      aria-required="true"
                      class="h-40 resize-none"
                      aria-describedby="messageDescription"
                    />
                    <small id="messageDescription" class="sr-only"
                      >Please enter your message. Minimum 20 characters.</small
                    >
                  </UiLabelInputContainer>

                  <button
                    class="center text-xl gap-1 bg-gradient-to-br from-black to-neutral-600 block w-full text-white rounded-md h-11 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    type="submit"
                    :disabled="status === 'Sending'"
                    :aria-busy="status === 'Sending'"
                    :aria-live="status === 'Sending' ? 'polite' : 'assertive'"
                    :aria-label="status"
                  >
                    <span class="flex items-center justify-center">
                      <i v-if="status === 'Send'" class="icon-send"></i>
                      <i
                        v-else-if="status === 'Sent'"
                        class="icon-check-circle"
                      ></i>
                      <i v-else-if="status === 'Retry'" class="icon-error"></i>
                      {{ status }}
                    </span>
                    <UiBottomGradient />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <!-- <ContactForm /> end -->

          <div>
            <transition name="fade-slide-right">
              <div
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
                        v-for="(item, index) in contactInfo"
                        :key="index"
                        class="center space-x-3 ml-2"
                      >
                        <UiExternalLink
                          :href="item.href"
                          class="pr-2 text-gray-600 hover:text-gray-800 center text-base sm:text-lg md:text-xl"
                          :aria-label="item.ariaLabel"
                        >
                          <div
                            class="w-7 sm:w-9 md:w-10 h-7 sm:h-9 md:h-10 mr-2 rounded-full bg-gray-100 center"
                            aria-hidden="true"
                            role="presentation"
                          >
                            <!-- <item.icon class="h-[18px] sm:h-5 md:h-6 w-[18px] sm:w-5 md:w-6 fill-current"
                              aria-hidden="true" /> -->
                          </div>
                          {{ item.text }}
                        </UiExternalLink>
                      </div>
                    </div>

                    <div
                      role="separator"
                      aria-hidden="true"
                      class="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-0.5 w-full"
                    />

                    <div class="flex justify-center space-x-4">
                      <UiExternalLink
                        v-for="link in socialMedia"
                        :key="link.label"
                        :href="link.href"
                        :aria-label="`Link to ${link.label}`"
                        class="w-10 h-10 rounded-full max-xs:!ml-[6px] text-gray-600 hover:text-gray-800 bg-gray-200 center hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                      >
                        <!-- <link.icon class="h-5 w-5 fill-current" aria-hidden="true" /> -->
                      </UiExternalLink>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        class="bg-[#ffffffcf] fixed top-5 left-5 border-2 lg:border-[3px] border-black text-black rounded-full shadow-2xl hover:shadow-none shadow-gray-300"
      >
        <NuxtLink
          to="/"
          aria-label="Back to home page"
          title="Back to home page"
          class="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <IoIosArrowBack
            class="md:h-9 md:w-9 lg:h-12 lg:w-12 h-[30px] w-[30px] relative right-0.5"
            aria-hidden="true"
          />
        </NuxtLink>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-slide-up-enter-active,
.fade-slide-right-enter-active {
  transition: all 0.8s ease;
}

.fade-slide-up-enter {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-right-enter {
  opacity: 0;
  transform: translateX(50px);
}

.fade-enter-active {
  transition: opacity 0.8s ease;
}

.fade-enter {
  opacity: 0;
}

/* Contact form animations */

.icon-send::before {
  content: "\f1d8";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}

.icon-check-circle::before {
  content: "\f058";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}

.icon-error::before {
  content: "\f06a";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}
</style>
