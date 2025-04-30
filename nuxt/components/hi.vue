<template>
    <div class="center w-full h-full">
        <div class="relative center loader" />
    </div>
</template>

<style>
.loader::before,
.loader::after {
    position: absolute;
    content: "";
    height: 8em;
    width: 8em;
    border: 1em solid gray;
    border-radius: 50%;
    animation: loader_79178 2s linear infinite;
}

.loader::after {
    opacity: 0;
    animation-delay: 1s;
}

@keyframes loader_79178 {
    0% {
        border: 1em solid black;
        transform: scale(0);
        opacity: 1;
    }

    100% {
        border: 0 solid gray;
        transform: scale(1);
        opacity: 0;
    }
}
</style>