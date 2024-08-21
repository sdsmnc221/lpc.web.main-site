<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="adoptions-group bg-white"
  >
    <prismic-rich-text
      class="adoptions-group__title cl-black gloock-regular"
      :field="title"
    />
  </section>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.AdoptionsGroupSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const primary = computed(() => props.slice.primary);
const title = computed(() => primary.value?.title);
</script>

<style lang="scss">
@import "@/styles/imports";

.adoptions-group {
  padding: var(--spacing-m);

  &__title {
    * {
      @extend .size-medium;
    }
  }
}
</style>
