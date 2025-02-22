<template>
  <page-loader :show="!loaded"></page-loader>

  <NuxtLayout>
    <NuxtPage @animation-init-done="onGsapInitDone" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import PageLoader from "@/components/PageLoader/index.vue";
import { isMobile, isSafari } from "./lib/helpers";

import { ALLOWED_PAGES } from "./middleware/wip.global";

const route = useRoute();

const gsapLoaded = ref(false);

const loaded = computed(() => {
  return gsapLoaded.value;
});

const onGsapInitDone = () => {
  setTimeout(
    () => {
      gsapLoaded.value = true;
    },
    isMobile() && isSafari() ? 2200 : 1400
  );
};

watch(
  [() => route.path, () => gsapLoaded.value],
  ([newRoute, newGsapLoaded]) => {
    if (ALLOWED_PAGES.some((slug) => newRoute.includes(slug))) {
      gsapLoaded.value = newGsapLoaded;
    }
  },
  { immediate: true, flush: "sync" }
);

watch(
  () => route.path,
  () => {
    gsapLoaded.value = false;
  }
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
    height: 100dvh;
    overflow: hidden;

    .app {
      height: 100dvh;
      overflow-y: hidden;
      position: fixed;
      top: 0;
      left: 0;
    }
  }
}
</style>
