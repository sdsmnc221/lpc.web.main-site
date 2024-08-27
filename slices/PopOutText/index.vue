<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="pop-out-text"
    :class="{ '--with-heading': isWithHeading }"
    v-if="!doFitText"
  >
    <prismic-rich-text
      v-if="headingText"
      class="heading-text gloock-regular cl-black"
      :field="headingText"
    />
    <prismic-rich-text
      class="content-text gloock-regular cl-black"
      :field="textContent"
    />
  </section>
  <template v-else>
    <section
      :data-slice-type="slice.slice_type"
      :data-slice-variation="slice.variation"
      class="pop-out-text"
    >
      <svg
        :data-slice-type="slice.slice_type"
        :data-slice-variation="slice.variation"
        :viewBox="computedViewBoxHeading"
      >
        <text x="0%" y="80%" textLength="100%" class="heading-text-svg">
          {{ headingText[0].text }}
        </text>
      </svg>
      <svg
        :data-slice-type="slice.slice_type"
        :data-slice-variation="slice.variation"
        :viewBox="computedViewBoxParagraph"
      >
        <text
          v-for="(t, index) in textContent"
          :key="`${slice.id}-content-text-${index}`"
          x="0%"
          :y="
            (100 / textContent.length) * index + 20 * textContent.length + '%'
          "
          textLength="100%"
          class="content-text-svg"
        >
          {{ t }}
        </text>
      </svg>
    </section>
  </template>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";
import { computed, ref } from "vue";

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
const variation = computed(() => props.slice.variation);

const isWithHeading = computed(() =>
  variation.value?.toLowerCase().includes("heading")
);
const doFitText = computed(() => primary.value.fittext);

const computedViewBoxHeading = ref("0 0 0 0");
const computedViewBoxParagraph = ref("0 0 0 0");

const textContent = computed(() =>
  doFitText.value
    ? primary.value?.text[0].text.split("\n")
    : primary.value?.text
);
const headingText = computed(
  () => isWithHeading.value && primary.value?.headingtext
);

onMounted(() => {
  console.log(props.slice, primary.value);

  computedViewBoxHeading.value = `0 0 ${window.innerWidth / 2} ${16 * 4}`;
  computedViewBoxParagraph.value = `0 0 ${window.innerWidth / 2} ${16 * textContent.value.length}`;
});
</script>

<style lang="scss">
@import "@/styles/imports";

.pop-out-text {
  margin: var(--spacing-s) var(--spacing-m);

  *:not(text) {
    line-height: 1.2em;
    text-align: center;
    // @extend .size-medium;
    font-size: calc((var(--base-ft-size) * 2));
  }

  &.--with-heading {
    .heading-text * {
      @extend .size-xlarge;
      letter-spacing: 0.24rem;
    }
    .content-text * {
      @extend .size-medium;
      @extend .gloock-regular;
      letter-spacing: 0.2rem;
    }
  }

  &:has(svg) {
    display: flex;
    flex-direction: column;

    svg {
      width: 100%;

      text {
        @extend .gloock-regular;

        &.heading-text-svg {
          @extend .size-xlarge;
        }
        &.content-text-svg {
          @extend .size-16;
        }
      }
    }
  }
}

@container app (min-width: 768px) {
  .pop-out-text {
    margin: var(--spacing-l) 12vw;

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
