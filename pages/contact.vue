<template>
  <hero-banner-with-text
    v-for="(hero, index) in heroBanners"
    :key="`hero-banner-with-text-adoptions-page-${index}`"
    :slice="hero"
  ></hero-banner-with-text>

  <multi-text-block :slice="faq"></multi-text-block>

  <pop-out-text :slice="popOutText"></pop-out-text>
</template>

<script setup lang="ts">
import HeroBannerWithText from "@/slices/HeroBannerWithText/index.vue";

import MultiTextBlock from "@/slices/MultiTextBlock/index.vue";
import PopOutText from "@/slices/PopOutText/index.vue";

const { client } = usePrismic();

const { data: adoptions } = await useAsyncData("adoptions", () =>
  client.getByUID("navigationpage", "contact")
);

const heroBanners = computed(
  () =>
    adoptions.value?.data?.slices.filter(
      (s) => s?.slice_type == "hero_banner_with_text"
    ) ?? []
);

const faq = computed(() =>
  adoptions.value?.data?.slices.find(
    (s) => s?.slice_type === "multi_text_block"
  )
);

const popOutText = computed(() =>
  adoptions.value?.data?.slices.find((s) => s?.slice_type === "pop_out_text")
);

onMounted(() => console.log("contact", adoptions.value));
</script>

<style lang="scss">
@import "../styles/index.scss";

.app {
}

@container app (min-width: 768px) {
  .app {
  }
}

@container app (min-width: 1200px) {
  .app {
    .hero-banner-with-text {
      &.--emphasis {
        .hero-banner-with-text__heading * {
          font-size: calc((var(--base-ft-size) * 8)) !important;
        }
      }
    }
  }
}
</style>
