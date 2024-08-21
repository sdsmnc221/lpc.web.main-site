<template>
  <main class="app">
    <hero-banner-with-text
      v-for="(hero, index) in heroBanners"
      :key="`hero-banner-with-text-homepage-${index}`"
      :slice="hero"
    ></hero-banner-with-text>
  </main>
</template>

<script setup lang="ts">
import HeroBannerWithText from "../slices/HeroBannerWithText";

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

onMounted(() => {
  console.log(home);
});
</script>

<style lang="scss">
@import "../styles/index.scss";
</style>
