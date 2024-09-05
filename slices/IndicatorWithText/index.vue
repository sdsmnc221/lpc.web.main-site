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
.indicator-with-text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0;

  &__heading * {
    @extend .size-large;
  }

  &__description * {
    @extend .size-24;
    margin-top: calc(var(--spacing-m) * -1);
  }
}

@container app (min-width: 700px) {
  .indicator-with-text {
    &__heading * {
      @extend .size-xlarge;
    }

    &__description * {
      @extend .size-large;
    }
  }
}

@container app (min-width: 1000px) {
  .indicator-with-text {
  }
}
</style>
