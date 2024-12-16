<script setup lang="ts">
defineProps({
  /**
   * Additional CSS classes to apply to the LabelInputContainer.
   */
  className: {
    type: String,
    default: '',
  },
});
</script>


<template>
  <div :class="cn('flex flex-col space-y-2 w-full', className)" role="group" aria-label="Input field group">
    <slot />
  </div>
</template>






<!-- 

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)} role="group" aria-label="Input field group">
      {children}
    </div>
  );
}; -->
