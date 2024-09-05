<template>
  <hero-banner-with-text
    v-for="(hero, index) in heroBanners"
    :key="`hero-banner-with-text-adoptions-page-${index}`"
    :slice="hero"
  ></hero-banner-with-text>

  <map-with-text-block :slice="mapHeadquarter"></map-with-text-block>

  <multi-text-block :slice="faq"></multi-text-block>

  <pop-out-text :slice="popOutText"></pop-out-text>
</template>

<script setup lang="ts">
import HeroBannerWithText from "@/slices/HeroBannerWithText/index.vue";
import MapWithTextBlock from "@/slices/MapWithTextBlock/index.vue";
import MultiTextBlock from "@/slices/MultiTextBlock/index.vue";
import PopOutText from "@/slices/PopOutText/index.vue";

const { client } = usePrismic();

const { data: contact } = await useAsyncData("contact", () =>
  client.getByUID("navigationpage", "contact")
);

const heroBanners = computed(
  () =>
    contact.value?.data?.slices.filter(
      (s) => s?.slice_type == "hero_banner_with_text"
    ) ?? []
);

const mapHeadquarter = computed(() =>
  contact.value?.data?.slices.find(
    (s) => s?.slice_type === "map_with_text_block"
  )
);

const faq = computed(() =>
  contact.value?.data?.slices.find((s) => s?.slice_type === "multi_text_block")
);

const popOutText = computed(() =>
  contact.value?.data?.slices.find((s) => s?.slice_type === "pop_out_text")
);
</script>

<style lang="scss">
.app.--contact {
  .hero-banner-with-text {
    &__buttons-group {
      .ui-button {
        align-self: start;
      }
    }
  }
  .multi-text-block {
    & > div:not(:first-of-type) {
      margin-top: var(--spacing-m);
    }
  }
}

@container app (min-width: 1000px) {
  .app.--contact {
    .hero-banner-with-text {
      &.--emphasis {
        .hero-banner-with-text__heading * {
          font-size: calc((var(--base-ft-size) * 8)) !important;
        }
      }
    }

    .multi-text-block {
      &__block {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
}
</style>
