<template>
  <aside
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="indicator-with-text"
  >
    <prismic-rich-text
      class="indicator-with-text__heading gloock-regular"
      :field="headingText"
    />

    <prismic-rich-text
      class="indicator-with-text__description albert-sans-regular"
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

<style lang="scss">
@import "@/styles/imports";

.indicator-with-text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--spacing-m);

  &:not(:last-child) {
    margin-bottom: var(--spacing-m);
  }

  &__heading * {
    @extend .size-large;
  }

  &__description * {
    @extend .size-24;
  }
}

@container app (min-width: 768px) {
  .indicator-with-text {
    gap: var(--spacing-m);

    &:not(:last-child) {
      margin-bottom: var(--spacing-l);
    }

    &__heading * {
      @extend .size-xlarge;
    }

    &__description * {
      @extend .size-large;
    }
  }
}

@container app (min-width: 1200px) {
  .indicator-with-text {
    gap: var(--spacing-l);
  }
}
</style>
