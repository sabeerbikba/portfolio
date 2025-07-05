<script setup lang="ts">
withDefaults(
  defineProps<{
    elementType?: "input" | "textarea";
    className?: string;
  }>(),
  {
    elementType: "input",
    className: "",
  }
);

defineOptions({ inheritAttrs: false });

const isInputFocused = ref<boolean>(false);
const mouseX = ref<number>(0);
const mouseY = ref<number>(0);
const isGradientVisible = ref<boolean>(false);

const baseClasses: string = `
  flex h-10 w-full border-none bg-gray-50 text-black shadow-input rounded-md px-3 py-2 text-sm 
  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400
  focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400
  disabled:cursor-not-allowed disabled:opacity-50
  group-hover-input:shadow-none transition-all duration-400 ease-in-out isolate
`;

const handleMouseMove = (event: MouseEvent): void => {
  const { left, top } = (
    event.currentTarget as HTMLElement
  ).getBoundingClientRect();
  mouseX.value = event.clientX - left;
  mouseY.value = event.clientY - top;
};
</script>

<template>
  <div
    :style="{
      height: '100%',
      background: `radial-gradient(${
        isGradientVisible ? '100px' : '0px'
      } circle at ${mouseX}px ${mouseY}px, var(--gray-500), transparent 80%)`,
    }"
    class="p-[2px] rounded-lg transition-all duration-300 ease-in-out relative overflow-hidden group hover:shadow-none"
    @mousemove="handleMouseMove"
    @mouseenter="isGradientVisible = true"
    @mouseleave="isGradientVisible = false"
  >
    <component
      :is="elementType"
      v-bind="$attrs"
      :class="
        useCn(
          baseClasses,
          className,
          'shadow-[0_1px_3px_#0000001f,0_1px_2px_#0000003d] group-hover:shadow-none'
        )
      "
      :placeholder="isInputFocused ? '' : ($attrs.placeholder as string)"
      @focus="isInputFocused = true"
      @blur="isInputFocused = false"
    />
  </div>
</template>
