<script setup lang="ts">

const props = defineProps({
  mouseX: {
    type: Number,
    required: true,
  },
  title: String,
  icon: String,
  isSelected: Boolean,
  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: false,
  },
  isHoverd: Boolean,
});

const iconRef = ref<HTMLDivElement | null>(null);
const hovered = ref(false);
const isHoverdOnDock = computed(() => !props.isHoverd && props.isSelected);

const distance = computed(() => {
  const bounds = iconRef.value?.getBoundingClientRect() ?? { x: 0, width: 0 };
  return props.mouseX - bounds.x - bounds.width / 2;
});

const calculateSize = (dist: number, min: number, max: number) => {
  if (dist < -150 || dist > 150) return min;
  return min + ((max - min) * (150 - Math.abs(dist))) / 150;
};

// const width = computed(() => calculateSize(distance.value, 35, 70));
// const height = computed(() => calculateSize(distance.value, 35, 70));
// const widthIcon = computed(() => calculateSize(distance.value, 12, 24));
// const heightIcon = computed(() => calculateSize(distance.value, 12, 24));

const width = computed(() => calculateSize(distance.value, 40, 65));
const height = computed(() => calculateSize(distance.value, 50, 65));
const widthIcon = computed(() => calculateSize(distance.value, 40, 75));
const heightIcon = computed(() => calculateSize(distance.value, 40, 75));
</script>

<template>
  <div ref="iconRef" :style="{ width: width + 'px', height: height + 'px' }" @mouseenter="hovered = true"
    @mouseleave="hovered = false" class="aspect-square rounded-xl bg-transparent" @click="onClick && onClick($event)"
    role="button">
    <div v-if="hovered" class="tooltip">{{ title }}</div>
    <div class="icon-box" :class="{ 'dock-hover': isHoverdOnDock }" :style="{
      width: `${widthIcon}px`,
      height: `${heightIcon}px`,
    }">
      <img :src="icon" alt="icon" class="icon-image w-full h-full" />
    </div>
    <div v-if="isHoverdOnDock" class="center mt-0.5">
      <span class="indicator" />
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(100% + 8px);
  padding: 0.5rem;
  border-radius: 0.25rem;
  background: #f9f9f9;
  border: 1px solid #ddd;
  color: #333;
  white-space: nowrap;
  font-size: 0.75rem;
  opacity: 0;
  animation: fade-in 0.3s forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(-12px);
  }
}

.icon-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.icon-box.dock-hover {
  box-shadow: 0 5px 12px 9px rgba(0, 0, 0, 0.3);
  background: rgba(0, 0, 0, 0.3);
}

.icon-image {
  width: 100%;
}

.indicator {
  height: 4px;
  width: 4px;
  border-radius: 50%;
  background: #555;
}
</style>
