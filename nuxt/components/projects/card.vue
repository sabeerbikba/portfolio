<template>
  <div
    class="card-section max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
  >
    <div
      class="screen-container overflow-hidden h-full w-full rounded-2xl bg-gray-100 md:rounded-2xl"
    >
      <ProjectsScreen />
    </div>
  </div>
</template>

<style>
.card-section {
  box-shadow: 0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042,
    0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003;
  transition: transform 0.3s ease;
}
</style>
