<template>
  <main class="app">
    <hero-banner-with-text
      :slice="home?.data.slices[0]"
    ></hero-banner-with-text>
  </main>
</template>

<script setup lang="ts">
import HeroBannerWithText from "../slices/HeroBannerWithText";

const { client } = usePrismic();

const { data: home } = await useAsyncData("home", () =>
  client.getSingle("homepage")
);
</script>

<style lang="scss">
@import "../styles/index";
</style>
