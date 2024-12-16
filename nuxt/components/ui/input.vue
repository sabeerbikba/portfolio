<script setup>
defineProps({
  elementType: {
    type: String,
    default: "input",
  },
  className: {
    type: String,
    default: "",
  }
});

const radius = 100;
const visible = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);

const inputRef = ref(null);
const textareaRef = ref(null);

const baseClasses = `
  flex h-10 w-full border-none bg-gray-50 text-black shadow-input rounded-md px-3 py-2 text-sm 
  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400
  focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400
  disabled:cursor-not-allowed disabled:opacity-50
  group-hover-input:shadow-none transition duration-400 isolate
`;

const handleMouseMove = (event) => {
  const { left, top } = event.currentTarget.getBoundingClientRect();
  mouseX.value = event.clientX - left;
  mouseY.value = event.clientY - top;
};
</script>

<template>
  <div :style="{
    background: `radial-gradient(${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px, var(--gray-500), transparent 80%)`
  }" @mousemove="handleMouseMove" @mouseenter="visible = true" @mouseleave="visible = false"
    class="p-[2px] rounded-lg transition duration-300 group-input">
    <template v-if="elementType === 'textarea'">
      <textarea v-bind="$attrs" :class="cn(
        baseClasses,
        className
      )" ref="textareaRef" />
    </template>
    <template v-else>
      <input v-bind="$attrs" :class="cn(
        baseClasses,
        className
      )" ref="inputRef" />
    </template>
  </div>
</template>



<style>
.group-input {
  position: relative;
  overflow: hidden;
}

.shadow-input {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.group-hover-input:hover .shadow-input {
  box-shadow: none;
}

.transition {
  transition: all 0.3s ease-in-out;
}
</style>
