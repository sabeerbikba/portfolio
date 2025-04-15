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

// TODO: isNeeded : if focused in input remove placeholder text
// TODO: problem with this component adding attributes to both elements div and child element
/* 
                          <div
                          class="!p-[2px] rounded-lg transition-all duration-300 ease-in-out relative overflow-hidden"
                          id="name"
                          type="text"
                          modelvalue=""
                          placeholder="Your name"
                          minlength="3"
                          maxlength="70"
                          required=""
                          aria-required="true"
                          style="
                            height: 100%;
                            background: radial-gradient(
                              0px circle at 314.8201370239258px
                                34.896881103515625px,
                              var(--gray-500),
                              transparent 80%
                            );
                          "
                        >
                          <input
                            id="name"
                            type="text"
                            modelvalue=""
                            placeholder="Your name"
                            minlength="3"
                            maxlength="70"
                            required=""
                            aria-required="true"
                            class="flex h-10 w-full border-none bg-gray-50 text-black shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 group-hover-input:shadow-none transition-all duration-400 ease-in-out isolate"
                          />
                        </div>
  */

const radius: number = 100;
const visible: Ref<boolean> = ref(false);
const mouseX: Ref<number> = ref(0);
const mouseY: Ref<number> = ref(0);

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
        visible ? radius + 'px' : '0px'
      } circle at ${mouseX}px ${mouseY}px, var(--gray-500), transparent 80%)`,
    }"
    @mousemove="handleMouseMove"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
    class="p-[2px] rounded-lg transition-all duration-300 ease-in-out relative overflow-hidden"
  >
    <template v-if="elementType === 'textarea'">
      <textarea v-bind="$attrs" :class="cn(baseClasses, className)" />
    </template>
    <template v-else>
      <input v-bind="$attrs" :class="cn(baseClasses, className)" />
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
