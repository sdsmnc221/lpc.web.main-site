<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="hero-banner-with-text bg-black"
  >
    <div class="hero-banner-with-text__text-content">
      <prismic-rich-text class="cl-gray size-medium" :field="subText" />
      <prismic-rich-text
        class="cl-white size-large gloock-regular"
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
</style>
