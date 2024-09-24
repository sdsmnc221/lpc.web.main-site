<template>
  <hero-banner-with-text
    v-for="(hero, index) in heroBanners"
    :key="`hero-banner-with-text-adoptions-page-${index}`"
    :slice="hero"
  ></hero-banner-with-text>

  <hero-photo-background :slice="adoptionsHeadline"></hero-photo-background>

  <Suspense>
    <adoptions-group
      v-for="(group, index) in adoptionsGroup"
      :key="`${group.id}-${index}`"
      :slice="group"
    ></adoptions-group>
  </Suspense>

  <multi-text-block :slice="faq"></multi-text-block>

  <pop-out-text :slice="popOutText"></pop-out-text>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroBannerWithText from "@/slices/HeroBannerWithText/index.vue";
import HeroPhotoBackground from "@/slices/HeroPhotoBackground/index.vue";
import AdoptionsGroup from "@/slices/AdoptionsGroup/index.vue";
import MultiTextBlock from "@/slices/MultiTextBlock/index.vue";
import PopOutText from "@/slices/PopOutText/index.vue";

gsap.registerPlugin(ScrollTrigger);

const { client } = usePrismic();

const { data: adoptions, status } = await useAsyncData("adoptions", () =>
  client.getByUID("navigationpage", "adoptions")
);

const heroBanners = computed(
  () =>
    adoptions.value?.data?.slices.filter(
      (s) => s?.slice_type == "hero_banner_with_text"
    ) ?? []
);

const adoptionsHeadline = computed(() =>
  adoptions.value?.data?.slices.find(
    (s) => s?.slice_type === "hero_photo_background"
  )
);

const faq = computed(() =>
  adoptions.value?.data?.slices.find(
    (s) => s?.slice_type === "multi_text_block"
  )
);

const adoptionsGroup = computed(() =>
  adoptions.value?.data?.slices.filter(
    (s) => s?.slice_type == "adoptions_group"
  )
);

const popOutText = computed(() =>
  adoptions.value?.data?.slices.find((s) => s?.slice_type === "pop_out_text")
);

const playFade = () => {
  const children = [...document.body.querySelectorAll(".adoptions-group > *")];

  children.forEach((section) => {
    gsap.from(section as any, {
      y: 240,
      opacity: 0,
      backgroundColor: "transparent",
      filter: "blur(16px)",
      delay: 0.2,
      scrollTrigger: {
        trigger: section as any,
        start: "top bottom-=120",
      },
    });
  });
};

watch(
  () => status.value,
  (newStatus) => {
    if (newStatus === "success") {
      setTimeout(() => {
        playFade();
      }, 100);
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
.app.--adoptions {
  .multi-text-block {
    & > div:not(:first-of-type) {
      margin-top: var(--spacing-m);
    }
  }
}

@container app (min-width: 700px) {
  .app {
    .hero-banner-with-text {
      &__sub-text * {
        text-align: center;
      }
    }
  }
}

@container app (min-width: 1000px) {
  .app.--adoptions {
    .multi-text-block {
      &__block {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
}
</style>
