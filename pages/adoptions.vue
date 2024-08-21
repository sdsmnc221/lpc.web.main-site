<template>
  <hero-banner-with-text
    v-for="(hero, index) in heroBanners"
    :key="`hero-banner-with-text-adoptions-page-${index}`"
    :slice="hero"
  ></hero-banner-with-text>

  <hero-photo-background :slice="adoptionsHeadline"></hero-photo-background>

  <adoptions-group
    v-for="(group, index) in adoptionsGroup"
    :key="`${group.id}-${index}`"
    :slice="group"
  ></adoptions-group>

  <pop-out-text :slice="popOutText"></pop-out-text>
</template>

<script setup lang="ts">
import HeroBannerWithText from "@/slices/HeroBannerWithText/index.vue";
import HeroPhotoBackground from "@/slices/HeroPhotoBackground/index.vue";
import AdoptionsGroup from "@/slices/AdoptionsGroup/index.vue";
import PopOutText from "@/slices/PopOutText/index.vue";

const { client } = usePrismic();

const { data: adoptions } = await useAsyncData("adoptions", () =>
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

const adoptionsGroup = computed(() =>
  adoptions.value?.data?.slices.filter(
    (s) => s?.slice_type == "adoptions_group"
  )
);

const popOutText = computed(() =>
  adoptions.value?.data?.slices.find((s) => s?.slice_type === "pop_out_text")
);

onMounted(() => console.log("adoptions", adoptions.value));
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
  }
}
</style>
