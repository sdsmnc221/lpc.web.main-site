<template>
  <aside
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="headline-pill bg-black cl-white"
  >
    <prismic-image class="headline-pill__icon" :field="icon" />

    <p class="albert-sans-regular">{{ text }}</p>
  </aside>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.HeadlinePillSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const primary = computed(() => props.slice.primary);
const icon = computed(() => primary.value?.icon);
const text = computed(() => primary.value?.text);
</script>

<style lang="scss">
@import "@/styles/imports";

.headline-pill {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding: 20px;
  border-radius: 64px;

  &__icon {
    filter: invert(1);
    display: block;
    width: 24px;
    height: 24px;
  }

  p {
    font-size: 20px;
    line-height: 20px;
  }
}

@container app (min-width: 700px) {
  .headline-pill {
    padding: 50px;

    &__icon {
      width: 48px;
      height: 48px;
    }

    p {
      font-size: calc((var(--base-ft-size) * 3));
    }
  }
}

@container app (min-width: 1000px) {
  .headline-pill {
    &__icon {
      width: 64px;
      height: 64px;
    }

    p {
      font-size: calc((var(--base-ft-size) * 3.6));
    }
  }
}
</style>
