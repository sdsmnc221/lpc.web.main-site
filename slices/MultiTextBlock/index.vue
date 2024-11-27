<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="multi-text-block"
  >
    <prismic-rich-text
      class="multi-text-block__title cl-black gloock-regular"
      :field="title"
    />

    <div>
      <div
        class="multi-text-block__block"
        v-for="(block, index) in textBlocks"
        :key="`${id}-block-${index}`"
      >
        <h4 class="multi-text-block__block__title cl-black albert-sans-bold">
          {{ block.textblocktitle }}
        </h4>

        <prismic-rich-text
          class="multi-text-block__block__description albert-sans-bold"
          :field="block.textblockcontent"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.MultiTextBlockSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const id = computed(() => props.slice.id);
const primary = computed(() => props.slice.primary);
const title = computed(() => primary.value?.title);
const textBlocks = computed(() => primary.value?.textblocksgroup);
</script>

<style lang="scss">
.multi-text-block {
  &__title {
    margin-bottom: var(--spacing-m);
  }

  & > div:not(:first-child) {
    margin-top: var(--spacing-l) !important;
  }

  &__block {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);

    &:not(:last-child) {
      margin-bottom: var(--spacing-m);
    }

    &__title {
      @include ft-s(20);
    }

    &__description {
      * {
        line-height: 1.5em;
      }
    }
  }

  a {
    display: inline-block;
    padding: 12px 24px;
    margin: var(--spacing-m) 0;

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

@container app (min-width: 700px) {
  .multi-text-block {
    & > div {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    &__block {
      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
}

@container app (min-width: 1000px) {
  .multi-text-block {
    &__block {
      padding: 0 var(--spacing-m);

      width: 50%;

      &:not(:last-child) {
        margin-right: 10%;
      }
    }
  }
}
</style>
