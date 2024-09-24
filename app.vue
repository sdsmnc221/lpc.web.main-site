<template>
  <transition name="page" mode="out-in">
    <page-loader v-if="loading"></page-loader>
  </transition>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import PageLoader from "@/components/PageLoader/index.vue";

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1400);
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition:
    all 1.6s ease-in-out,
    filter 0.8s ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

<style lang="scss">
#__nuxt {
  &:has(.page-loader) {
    width: 100dvw;
    height: 100svh;
    overflow: hidden;
  }
}
</style>
