<template>
  <page-loader :show="loading"></page-loader>

  <NuxtLayout>
    <NuxtPage @gsap-init-done="onGsapInitDone" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import PageLoader from "@/components/PageLoader/index.vue";

const route = useRoute();

const loading = ref(true);

const onGsapInitDone = () => {
  setTimeout(() => {
    loading.value = false;
  }, 1400);
};

onMounted(() => {
  if (!route.path.includes("adoptions")) {
    setTimeout(() => {
      loading.value = false;
    }, 1400);
  }
});

watch(
  () => route.path,
  (newRoute) => {
    if (newRoute.includes("adoptions")) {
      loading.value = true;
    }
  },
  { immediate: true }
);
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
  overflow-x: hidden;

  main {
    transition: margin 0.64s ease-in-out;
  }

  &:has(.page-loader:not(.fade-out-fwd)) {
    width: 100dvw;
    height: 100svh;
    overflow: hidden;
  }
}
</style>
