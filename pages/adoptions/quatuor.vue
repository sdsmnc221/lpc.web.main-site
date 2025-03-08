<template>
  <div class="fixed bg">
    <AuroraBackground
      class="aurora-background bg-fuchsia-950"
    ></AuroraBackground>
  </div>
  <div class="adoptions quatuor min-w-[100vw] min-h-[100vh]">
    <section class="quatuor__cover relative flex flex-col items-center">
      <figure class="w-[50vh] h-[50vh]">
        <img
          src="/quatuor/quatuor-cover.png"
          alt="Adoptez Notre Quatuor !"
          class="w-full h-full aspect-square object-cover relative rotate-[-24deg] top-[-10vh] left-[-10vw]"
        />
      </figure>
      <figure
        class="w-[50vh] h-[50vh] absolute top-[32%] left-[24%] rotate-[24deg] scale-[0.9] mix-blend-hard-light"
      >
        <img
          src="/quatuor/quatuor-h1.png"
          alt=""
          class="w-full h-full object-contain"
        />
      </figure>
      <figure
        class="music-player w-[100vw] flex justify-around items-center rotate-[24deg] mix-blend-hard-light"
      >
        <img alt="" src="/quatuor/cta-left.png" class="scale-x-[-1] invert" />
        <img alt="" src="/quatuor/cta-play.png" />
        <img alt="" src="/quatuor/cta-right.png" />
      </figure>
    </section>
  </div>
</template>

<script setup lang="ts">
import AuroraBackground from "~/components/AuroraBackground.vue";

const emits = defineEmits(["animation-init-done"]);

onMounted(() => {
  nextTick(() => emits("animation-init-done"));
});

definePageMeta({
  layout: "discover",
});
</script>

<style lang="scss">
* {
  text-wrap: balance;
}

.bg {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: -1;
}

.aurora-background {
  div div {
    --aurora: repeating-linear-gradient(
      100deg,
      #3e0647 10%,
      #b191b5 15%,
      #c7a7cb 20%,
      #b191b5 25%,
      #9a7b9f 30%
    );
  }
}

.discover .quatuor {
  .music-player {
    img {
      filter: invert(0.8) !important;
    }
  }
}
</style>
