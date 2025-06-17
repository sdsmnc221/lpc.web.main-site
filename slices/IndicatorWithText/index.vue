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
  margin: var(--spacing-m) 0;

  &__heading * {
    @include ft-s(large);
  }

  &__description p {
    @include ft-s(16);
    margin-top: calc(var(--spacing-s) * -1);
  }

  &__description {
    p {
      line-height: 2.4rem;
    }

    & > p:first-child {
      text-align: center;
    }

    li {
      line-height: 2.4rem;
    }

    a {
      text-decoration: underline;
      line-height: normal;
      display: inline-block;

      &:not(:has(strong)) {
        margin-top: var(--spacing-s);
      }

      &:has(strong) {
        line-height: unset !important;
      }

      strong {
        display: inline-block;
        padding: 12px 24px;

        font-weight: 200;
        letter-spacing: -0.2px;

        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 32px;

        @include ft-s(regular);

        background-color: var(--black);
        color: var(--white);
      }
    }

    em {
      line-height: 2rem;
    }

    p:not(:first-child) {
      margin-top: var(--spacing-s);
    }

    p:not(:first-child),
    a,
    li {
      line-height: 1.2rem;

      &:has(em) * {
        @include ft-s(16);
      }
    }
  }
}

@container app (min-width: 700px) {
  .indicator-with-text {
    &__heading * {
      @include ft-s(xlarge);
    }

    &__description {
      p:first-child * {
        @include ft-s(24);
      }

      * {
        @include ft-s(16);

        &:is(em) {
          text-decoration: underline;
          font-style: italic;
        }
      }

      & > p:first-child {
        text-align: left;
      }
    }

    a {
      display: inline-block;

      @include ft-s(16);
    }

    p:not(:first-child),
    a,
    li {
      line-height: 1.2rem;

      &:has(em) * {
        @include ft-s(16);
      }
    }
  }
}

@container app (max-width: 699px) {
  .indicator-with-text {
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: left;
    padding: 0 24px;

    .indicator-with-text__description {
      margin-top: var(--spacing-s);
      * {
        line-height: 1.6rem;
      }
    }

    a {
      display: inline-block;
      letter-spacing: -0.101px;
      margin-top: var(--spacing-m);
      line-height: normal;
      margin: 30px 0;
      display: inline-block;
    }
  }
}
</style>
