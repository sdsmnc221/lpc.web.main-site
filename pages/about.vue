<template>
  <div v-for="(slice, index) in slices" :key="`page-slices-${index}`">
    <component
      v-if="
        slice.component !== 'IndicatorWithText' &&
        slice.component !== 'PhotoWithTextBlock' &&
        slice.component !== 'HeadlinePill'
      "
      :is="getComponent(slice.component)"
      :slice="slice"
    ></component>
    <div
      v-else-if="index === indicatorWithTextFirstIndex"
      class="flex flex-col md:flex-row gap-4"
    >
      <indicator-with-text
        v-for="(sliceIndicator, index) in indicatorWithTextGroups"
        :key="`page-indicator-w-text-${index}`"
        :slice="sliceIndicator"
      ></indicator-with-text>
    </div>
    <div
      v-else-if="index === photoWithTexFirstIndex"
      class="grid grid-rows-1 grid-cols-1 md:grid-rows-2 md:grid-cols-2 gap-4"
    >
      <photo-with-text-block
        v-for="(slicePhoto, index) in photoWithTextGroups"
        :key="`page-photo-w-text-${index}`"
        :slice="slicePhoto"
      ></photo-with-text-block>
    </div>
    <div v-else-if="index === headlinePillFirstIndex">
      <headline-pill
        class="my-2"
        v-for="(slicePill, index) in headlinePillsGroup"
        :key="`page-headline-pill-${index}`"
        :slice="slicePill"
      ></headline-pill>
    </div>
    <div v-else class="empty"></div>
  </div>
</template>

<script setup lang="ts">
import HeroPhotoBackground from "@/slices/HeroPhotoBackground/index.vue";
import HeroBannerWithText from "@/slices/HeroBannerWithText/index.vue";
import MultiTextBlock from "@/slices/MultiTextBlock/index.vue";
import IndicatorWithText from "@/slices/IndicatorWithText/index.vue";
import PopOutText from "@/slices/PopOutText/index.vue";
import HeadlinePill from "@/slices/HeadlinePill/index.vue";
import PhotoWithTextBlock from "@/slices/PhotoWithTextBlock/index.vue";

import { toPascalCase } from "@/lib/helpers";

const emits = defineEmits(["animation-init-done"]);

const { client } = usePrismic();

const { data: page } = await useAsyncData("about", () =>
  client.getByUID("navigationpage", "about")
);

const slices = computed(() => {
  return page.value?.data?.slices.map((s) => ({
    ...s,
    component: toPascalCase(s.slice_type),
  }));
});

const indicatorWithTextGroups = computed(() => {
  return page.value?.data.slices.filter(
    (s) => s.slice_type === "indicator_with_text"
  );
});

const indicatorWithTextFirstIndex = computed(() => {
  return page.value?.data.slices.findIndex(
    (s) => s.slice_type === "indicator_with_text"
  );
});

const photoWithTextGroups = computed(() => {
  return page.value?.data.slices.filter(
    (s) => s.slice_type === "photo_with_text_block"
  );
});

const photoWithTexFirstIndex = computed(() => {
  return page.value?.data.slices.findIndex(
    (s) => s.slice_type === "photo_with_text_block"
  );
});

const headlinePillsGroup = computed(() => {
  return page.value?.data.slices.filter(
    (s) => s.slice_type === "headline_pill"
  );
});

const headlinePillFirstIndex = computed(() => {
  return page.value?.data.slices.findIndex(
    (s) => s.slice_type === "headline_pill"
  );
});

const getComponent = (compName: string) => {
  switch (compName) {
    case "HeroPhotoBackground":
      return HeroPhotoBackground;
    case "HeroBannerWithText":
      return HeroBannerWithText;
    case "MultiTextBlock":
      return MultiTextBlock;
    case "IndicatorWithText":
      return false;
    case "PopOutText":
      return PopOutText;
    case "HeadlinePill":
      return false;
    case "PhotoWithTextBlock":
      return false;
    default:
      return;
  }
};

onMounted(() => {
  console.log(
    page.value?.data?.slices.map((s) => ({
      ...s,
      component: toPascalCase(s.slice_type),
    }))
  );
  nextTick(() => emits("animation-init-done"));
});
</script>

<style lang="scss">
.app.--about {
  & *:has(.empty) {
    padding: 0 !important;
    margin: 0 !important;
  }

  .hero-banner-with-text {
    z-index: 1;

    p {
      text-align: center;
    }
    &__buttons-group {
      .ui-button {
        align-self: start;
      }
    }
  }
  .multi-text-block {
    margin-top: var(--spacing-m);

    & *:has(.multi-text-block__block) {
      flex-direction: column !important;

      & > * {
        width: 100%;
      }
    }

    & > div:not(:first-of-type) {
      margin-top: var(--spacing-m);
    }

    li {
      margin-top: var(--spacing-s);
    }

    a:not([href^="tel:"]) {
      display: inline-block;
      padding: 0;
      margin: 0;
      letter-spacing: -0.2px;

      @include ft-s(16);
      @extend .gloock-regular;

      background-color: transparent;
      color: var(--black);
      text-decoration: underline;
    }
  }
}

@container app (min-width: 1000px) {
  .app.--about {
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
