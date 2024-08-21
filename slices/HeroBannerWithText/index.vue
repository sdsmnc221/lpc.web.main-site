<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="hero-banner-with-text bg-black"
  >
    <div class="hero-banner-with-text__text-content">
      <prismic-rich-text class="cl-gray size-medium" :field="subText" />
      <prismic-rich-text
        class="hero-banner-with-text__heading cl-white gloock-regular"
        :field="headingText"
      />

      <div
        class="hero-banner-with-text__buttons-group"
        v-if="withButton && buttons.length"
      >
        <ui-button
          v-for="(btn, index) in buttons"
          :key="`hero-banner-with-text__button-item-${index}`"
          :label="btn.buttonlabel"
        ></ui-button>
      </div>
    </div>

    <div class="hero-banner-with-text__image-content">
      <prismic-image
        class="hero-banner-with-text__hero-image"
        :field="heroImage"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";
import { computed } from "vue";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.HeroBannerWithTextSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const variation = computed(() => props.slice.variation);
const withButton = computed(() =>
  variation.value.toLowerCase().includes("buttons")
);

const primary = computed(() => props.slice.primary);
const heroImage = computed(() => primary.value?.heroimage);
const subText = computed(() => primary.value?.subtext);
const headingText = computed(() => primary.value?.headingtext);
const buttons = computed(() => primary.value?.buttonsgroups);
console.log(props.slice);
</script>

<style lang="scss">
@import "@/styles/imports";

.hero-banner-with-text {
  display: flex;
  padding: var(--spacing-m);
  gap: var(--spacing-l);
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  &__text-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-l);
    text-align: center;
  }

  &__heading {
    * {
      @extend .size-medium;
    }
  }

  &__buttons-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-m);
  }

  &__hero-image {
    --w: 532px;
    --h: 680px;

    width: var(--w);
    height: var(--h);
    object-fit: cover;
  }
}

@container app (min-width: 768px) {
  /* Change the flex direction of the .child element. */
  .hero-banner-with-text {
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--spacing-m);
    min-height: 0;

    * {
      text-align: left;
    }

    &__text-content {
      gap: var(--spacing-m);
    }

    &__buttons-group {
      flex-direction: row;
      justify-content: flex-start;
    }

    &__hero-image {
      width: 100%;
      height: var(--h);
      object-fit: cover;
    }
  }
}

@container app (min-width: 1200px) {
  /* Change the flex direction of the .child element. */
  .hero-banner-with-text {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-l);
    min-height: 100vh;
    padding: 12vh 12vw;

    * {
      text-align: left;
    }

    &__text-content {
      gap: var(--spacing-l);
    }

    &__heading {
      * {
        @extend .size-xlarge;
      }
    }

    &__hero-image {
      width: auto;
      min-width: var(--w);
    }
  }
}
</style>
