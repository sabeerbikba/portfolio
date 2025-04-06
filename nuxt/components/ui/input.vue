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

const radius: number = 100;
const visible: Ref<boolean> = ref(false);
const mouseX: Ref<number> = ref(0);
const mouseY: Ref<number> = ref(0);
const inputRef: Ref<HTMLInputElement | null> = ref(null);
const textareaRef: Ref<HTMLTextAreaElement | null> = ref(null);

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
      background: `radial-gradient(${
        visible ? radius + 'px' : '0px'
      } circle at ${mouseX}px ${mouseY}px, var(--gray-500), transparent 80%)`,
    }"
    @mousemove="handleMouseMove"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
    class="p-[2px] rounded-lg transition-all duration-300 ease-in-out relative overflow-hidden"
  >
    <template v-if="elementType === 'textarea'">
      <textarea
        v-bind="$attrs"
        :class="cn(baseClasses, className)"
        ref="textareaRef"
      />
    </template>
    <template v-else>
      <input
        v-bind="$attrs"
        :class="cn(baseClasses, className)"
        ref="inputRef"
      />
    </template>
  </div>
</template>

<style>
.shadow-input {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.group-hover-input:hover .shadow-input {
  box-shadow: none;
}
</style>
