<template>
  <main class="app">
    <hero-banner-with-text
      v-for="(hero, index) in heroBanners"
      :key="`hero-banner-with-text-homepage-${index}`"
      :slice="hero"
    ></hero-banner-with-text>

    <pop-out-text :slice="popOutText"></pop-out-text>
  </main>
</template>

<script setup lang="ts">
import HeroBannerWithText from "@/slices/HeroBannerWithText/index.vue";
import PopOutText from "@/slices/PopOutText/index.vue";

const { client } = usePrismic();

const { data: home } = await useAsyncData("home", () =>
  client.getSingle("homepage")
);

const heroBanners = computed(
  () =>
    home.value?.data?.slices.filter(
      (s) => s.slice_type === "hero_banner_with_text"
    ) ?? []
);

const popOutText = computed(() =>
  home.value?.data?.slices.find((s) => s.slice_type === "pop_out_text")
);

onMounted(() => {
  console.log(home);
});
</script>

<style lang="scss">
@import "../styles/index.scss";
</style>
