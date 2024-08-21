<script setup lang="ts">
import { type Content } from "@prismicio/client";

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

console.log(props.slice);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    Placeholder component for hero_banner_with_text (variation:
    {{ slice.variation }}) Slices toto
  </section>
</template>
