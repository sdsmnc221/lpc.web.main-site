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
  computedViewBoxHeading.value = `0 0 ${window.innerWidth / 2} ${16 * (window.innerWidth < 768 ? 4 : 8)}`;
  computedViewBoxParagraph.value = `0 0 ${window.innerWidth / 2} ${(window.innerWidth < 768 ? 16 : 16 * 3) * textContent.value.length}`;

  window.addEventListener("resize", () => {
    computedViewBoxHeading.value = `0 0 ${window.innerWidth / 2} ${16 * (window.innerWidth < 768 ? 4 : 8)}`;
    computedViewBoxParagraph.value = `0 0 ${window.innerWidth / 2} ${(window.innerWidth < 768 ? 16 : 16 * 3) * textContent.value.length}`;
  });
});
</script>

<style lang="scss">
.pop-out-text {
  *:not(text) {
    line-height: 1.2em;
    text-align: center;

    font-size: calc((var(--base-ft-size) * 2.4));
  }

  &.--with-heading {
    .heading-text * {
      @include ft-s(xlarge);
      letter-spacing: 0.24rem;
    }
    .content-text * {
      @include ft-s(medium);
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
          @include ft-s(large);
        }
        &.content-text-svg {
          @include ft-s(16);
        }
      }
    }
  }
}

@container app (min-width: 700px) {
  .pop-out-text {
    *:not(text) {
      font-size: calc((var(--base-ft-size) * 4));
    }

    &:has(svg) {
      svg {
        text {
          &.heading-text-svg {
            font-size: calc((var(--base-ft-size) * 8));
          }

          &.content-text-svg {
            font-size: calc((var(--base-ft-size) * 3));
          }
        }
      }
    }
  }
}

@container app (min-width: 1000px) {
  .pop-out-text {
    *:not(text) {
      font-size: calc((var(--base-ft-size) * 5));
    }
  }
}

@container app (min-width: 1600px) {
  .pop-out-text {
    padding: 7.2vw 3.6vw !important;

    *:not(text) {
      font-size: calc((var(--base-ft-size) * 7));
    }

    &:has(svg) {
      svg {
        text {
          &.content-text-svg {
            font-size: calc((var(--base-ft-size) * 4));
          }
        }
      }
    }
  }
}
</style>
