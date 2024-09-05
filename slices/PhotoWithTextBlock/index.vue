<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="photo-with-text-block"
  >
    <prismic-image
      class="photo-with-text-block__photo --square"
      :field="photo"
    />

    <h3 class="photo-with-text-block__title albert-sans-bold">
      {{ title }}
    </h3>

    <prismic-rich-text
      class="photo-with-text-block__description albert-sans-regular"
      :field="description"
    />
  </section>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";
import { computed } from "vue";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.PhotoWithTextBlockSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const primary = computed(() => props.slice.primary);

const photo = computed(() => primary.value?.photo);
const title = computed(() => primary.value?.title);
const description = computed(() => primary.value?.description);
</script>

<style lang="scss">
.photo-with-text-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-s);

  margin: 0 auto;
  text-align: left;

  &__photo {
    width: var(--w);
    height: var(--h);
    object-fit: cover;

    &.--square {
      --w: 360px !important;
      --h: 360px !important;
    }
  }

  h3 {
    @extend .size-medium;
  }

  &__description * {
    line-height: 1.5em;
    @include ft-s(16);
  }
}

@container app (min-width: 700px) {
  .photo-with-text-block {
    align-items: flex-start;
    flex: 1;

    &__photo {
      &.--square {
        --w: 210px !important;
        --h: 210px !important;
      }
    }
  }
}

@container app (min-width: 1000px) {
  .photo-with-text-block {
    flex: 1;

    &__photo {
      &.--square {
        --w: 310px !important;
        --h: 310px !important;
      }
    }

    &__description * {
      @include ft-s(20);
    }
  }
}
</style>
