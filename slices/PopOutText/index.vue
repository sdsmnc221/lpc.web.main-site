<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="pop-out-text"
  >
    <prismic-rich-text class="gloock-regular cl-black" :field="textContent" />
  </section>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";
import { computed } from "vue";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.PopOutTextSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const primary = computed(() => props.slice.primary);

const textContent = computed(() => primary.value?.text);
</script>

<style lang="scss">
@import "@/styles/imports";

.pop-out-text {
  margin: var(--spacing-l) var(--spacing-s);

  * {
    line-height: 1.2em;
    text-align: center;
    // @extend .size-medium;
    font-size: calc((var(--base-ft-size) * 2));
  }
}

@container app (min-width: 768px) {
  .pop-out-text {
    * {
      // @extend .size-large;
      font-size: calc((var(--base-ft-size) * 4));
    }
  }
}

@container app (min-width: 1200px) {
  .pop-out-text {
    margin: var(--spacing-l) 16vw;

    * {
      // @extend .size-xxlarge;
      font-size: calc((var(--base-ft-size) * 5));
    }
  }
}
</style>
