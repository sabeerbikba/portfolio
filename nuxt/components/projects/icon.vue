<script setup lang="ts">
import octicons from "@primer/octicons";
import type { IconName, IconSize } from "@primer/octicons";

type IconSizes = IconSize | 32;

const props = withDefaults(
    defineProps<{
        name: IconName;
        size?: IconSizes;
        fill?: string;
    }>(), {
    size: 16,
    fill: "white",
});

const attrs = useAttrs();
const classNames = attrs.class || "";
const svgRef = ref<SVGElement | null>(null);

const updateSVG = () => {
    if (svgRef.value) {
        const span = document.createElement("span");
        span.innerHTML = octicons[props.name].toSVG({
            width: props.size,
            height: props.size,
            class: cn(classNames),
        });

        const svg = span.firstChild as SVGElement | null;
        if (svg) {
            svgRef.value.replaceWith(svg);
            svgRef.value = svg;
            svgRef.value.setAttribute('fill', 'currentColor');
            svgRef.value.setAttribute('focusable', 'false');
            svgRef.value.setAttribute("style",
                "display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;"
            );
        }
    }
};

onMounted(updateSVG);
watchEffect(updateSVG);
</script>

<template><span ref="svgRef" /></template>
