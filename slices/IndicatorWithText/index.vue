<template>
  <aside
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="indicator-with-text"
  >
    <prismic-rich-text
      class="hero-banner-with-text__heading gloock-regular size-large"
      :field="headingText"
    />

    <prismic-rich-text
      class="hero-banner-with-text__description albert-sans-regular size-24"
      :field="description"
    />
  </aside>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.IndicatorWithTextSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const primary = computed(() => props.slice.primary);
const headingText = computed(() => primary.value?.indicator);
const description = computed(() => primary.value?.description);
</script>
