<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="map-with-text-block"
  >
    <div class="map-with-text-block__text-content">
      <prismic-rich-text
        class="map-with-text-block__heading gloock-regular"
        :field="title"
      />

      <prismic-rich-text
        class="hero-banner-with-text__description albert-sans-regular"
        :field="descriptionParagraph"
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
  getSliceComponentProps<Content.MapWithTextBlockSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const primary = computed(() => props.slice.primary);

const title = computed(() => primary.value?.title);
const descriptionParagraph = computed(() => primary.value?.description);
const geoPoint = computed(() => primary.value?.geopoint);
</script>

<style lang="scss">
@import "@/styles/imports";

.map-with-text-block {
  display: flex;
  padding: var(--spacing-m);
  gap: var(--spacing-l);
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  &__text-content {
    display: flex;
    gap: var(--spacing-m);
    flex-direction: column;
    justify-content: flex-start;
  }

  &__heading {
    * {
      line-height: 1.2em;
    }

    h1,
    h2,
    h3 {
      @extend .size-xlarge;
    }
  }

  &__description {
    * {
      line-height: 1.5em;
      @extend .size-16;
    }
  }
}

@container app (min-width: 768px) {
  .map-with-text-block {
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--spacing-m);
    padding: var(--spacing-l);
  }
}

@container app (min-width: 1200px) {
  .map-with-text-block {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-l);
    padding: 12vh 12vw;
  }
}
</style>
