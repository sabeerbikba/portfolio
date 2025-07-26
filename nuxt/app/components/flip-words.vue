<script setup lang="ts">
// Inspiration URL: https://ui.aceternity.com/components/flip-words
// Source URL: https://inspira-ui.com/components/text-animations/flip-words

const {
  words,
  duration = 3000,
  className = "",
} = defineProps<{
  words: string[];
  duration?: number;
  className?: string;
}>();

defineEmits(["animationStart", "animationComplete"]);

const currentWord = ref(words[0] ?? "");
const isVisible = ref(true);
const timeoutId = ref<number | null>(null);

const startAnimation = (): void => {
  if (!words.length) return;

  isVisible.value = false;

  setTimeout(() => {
    const currentIndex = words.indexOf(currentWord.value);
    const nextWord = words[currentIndex + 1] || words[0] || "";
    currentWord.value = nextWord;
    isVisible.value = true;
  }, 600);
};

const splitWords = computed(() => {
  return currentWord.value.split(" ").map((word) => ({
    word,
    letters: word.split(""),
  }));
});

const startTimeout = (): void => {
  timeoutId.value = window.setTimeout(() => {
    startAnimation();
  }, duration);
};

onMounted(() => {
  startTimeout();
});

onBeforeUnmount(() => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
  }
});

watch(isVisible, (newValue) => {
  if (newValue) {
    startTimeout();
  }
});
</script>

<template>
  <span class="relative inline-block px-2 text-current">
    <Transition
      enter-active-class="word-enter-active"
      leave-active-class="word-leave-active"
      @after-enter="$emit('animationStart')"
      @after-leave="$emit('animationComplete')"
    >
      <span
        v-show="isVisible"
        :class="
          useCn(
            'relative z-10 inline-block text-left text-neutral-600',
            className
          )
        "
      >
        <template
          v-for="(wordObj, wordIndex) in splitWords"
          :key="wordObj.word + wordIndex"
        >
          <span
            class="word-fade-in"
            :style="{ animationDelay: `${wordIndex * 0.3}s` }"
          >
            <span
              v-for="(letter, letterIndex) in wordObj.letters"
              :key="wordObj.word + letterIndex"
              class="letter-fade-in"
              :style="{
                animationDelay: `${wordIndex * 0.3 + letterIndex * 0.05}s`,
              }"
            >
              {{ letter }}
            </span>
            <span class="inline-block">&nbsp;</span>
          </span>
        </template>
      </span>
    </Transition>
  </span>
</template>

<style>
.word-fade-in {
  @apply inline-block whitespace-nowrap opacity-0;
  animation: wordFadeIn 0.3s ease forwards;
}

.letter-fade-in {
  @apply inline-block opacity-0;
  animation: letterFadeIn 0.2s ease forwards;
}

.word-enter-active {
  animation: wordEnter 0.6s ease-in-out forwards;
}

.word-leave-active {
  animation: wordLeave 0.6s ease-in-out forwards;
}

@keyframes wordFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes letterFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes wordEnter {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes wordLeave {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
  100% {
    opacity: 0;
    transform: scale(2);
    filter: blur(8px);
  }
}
</style>
