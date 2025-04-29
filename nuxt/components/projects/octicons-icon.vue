<script setup lang="ts">
import type { IconName, IconSize } from "@primer/octicons";
import octicons from "@primer/octicons";

const props = withDefaults(
  defineProps<{
    name: IconName;
    size?: IconSize | 32;
  }>(),
  {
    size: 16,
  }
);

console.log(octicons.home.toSVG());

const attrs = useAttrs();
const classNames = (attrs.class as string) || "";
const svgRef = ref<SVGElement | null>(null);

// const updateSVG = async () => {
//   if (svgRef.value) {
//     try {
//       const { [props.name]: icon } = await import(`@primer/octicons`);

//       if (icon) {
//         const span = document.createElement("span");
//         span.innerHTML = icon.toSVG({
//           width: props.size,
//           height: props.size,
//           class: classNames,
//         });

//         const svg = span.firstChild as SVGElement | null;
//         if (svg) {
//           svgRef.value.replaceWith(svg);
//           svgRef.value = svg;
//           svgRef.value.setAttribute("fill", "currentColor");
//           svgRef.value.setAttribute("focusable", "false");
//           svgRef.value.setAttribute(
//             "style",
//             `display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;`
//           );
//         }
//       } else {
//         console.error(`Icon "${props.name}" not found.`);
//       }
//     } catch (error) {
//       console.error(`Error loading icon "${props.name}":`, error);
//     }
//   }
// };

const updateSVG = () => {
  if (svgRef.value) {
    const span = document.createElement("span");
    const icon = octicons[props.name].toSVG({
      width: props.size,
      height: props.size,
      class: classNames,
    });
    // console.log(icon);
    span.innerHTML = icon;

    const svg = span.firstChild as SVGElement | null;
    if (svg) {
      svgRef.value.replaceWith(svg);
      svgRef.value = svg;
      svgRef.value.setAttribute("fill", "currentColor");
      svgRef.value.setAttribute("focusable", "false");
      svgRef.value.setAttribute(
        "style",
        `display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;`
      );
    }
  }
};

onMounted(updateSVG);
watchEffect(updateSVG);
</script>

<template><span ref="svgRef" /></template>
