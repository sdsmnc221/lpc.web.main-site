<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="hero-banner-with-text"
    :class="`--${variant} ${descriptionParagraph.length > 0 ? '--with-description' : ''} --image-${heroImagePosition} }`"
  >
    <div class="hero-banner-with-text__text-content">
      <prismic-rich-text
        class="hero-banner-with-text__sub-text cl-gray size-medium"
        :field="subText"
      />

      <prismic-rich-text
        class="hero-banner-with-text__heading gloock-regular"
        :class="{ '--text-centered': descriptionParagraph.length === 0 }"
        :field="headingText"
      />

      <prismic-rich-text
        v-if="descriptionParagraph.length > 0"
        class="hero-banner-with-text__description albert-sans-regular"
        :field="descriptionParagraph"
      />

      <div
        class="hero-banner-with-text__buttons-group"
        v-if="withButton && buttons.length"
      >
        <ui-button
          v-for="(btn, index) in buttons"
          :key="`hero-banner-with-text__button-item-${index}`"
          :label="btn.buttonlabel"
        ></ui-button>
      </div>
    </div>

    <div class="hero-banner-with-text__image-content">
      <prismic-image
        class="hero-banner-with-text__hero-image"
        :class="{ '--square': descriptionParagraph.length > 0 }"
        :field="heroImage"
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
  getSliceComponentProps<Content.HeroBannerWithTextSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const variation = computed(() => props.slice.variation);
const withButton = computed(() =>
  variation.value.toLowerCase().includes("buttons")
);

const primary = computed(() => props.slice.primary);

const variant = computed(() => primary.value.variant);
const heroImagePosition = computed(() => primary.value?.heroimageposition);

const heroImage = computed(() => primary.value?.heroimage);
const subText = computed(() => primary.value?.subtext);
const headingText = computed(() => primary.value?.headingtext);
const descriptionParagraph = computed(
  () => primary.value?.descriptionparagraph
);
const buttons = computed(() => primary.value?.buttonsgroups);
</script>

<style lang="scss">
@import "@/styles/imports";

.hero-banner-with-text {
  display: flex;
  padding: var(--spacing-m);
  gap: var(--spacing-l);
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  &.--light {
    @extend .bg-white;

    .hero-banner-with-text__heading *,
    .hero-banner-with-text__description * {
      @extend .cl-black;
    }
  }

  &.--dark {
    @extend .bg-black;

    .hero-banner-with-text__heading *,
    .hero-banner-with-text__description * {
      @extend .cl-white;
    }
  }

  &__text-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-m);
    text-align: left;

    * {
      text-align: left;
    }
  }

  &__sub-text * {
    text-align: center;
  }

  &__heading {
    * {
      line-height: 1.2em;
    }

    h1 {
      @extend .size-xlarge;
    }

    h2,
    h3 {
      @extend .size-large;
    }

    &.--text-centered {
      * {
        text-align: center;
      }
    }
  }

  &__description * {
    line-height: 1.5em;
    @extend .size-16;
  }

  &__buttons-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-m);
  }

  &__hero-image {
    --w: 532px;
    --h: 680px;

    width: var(--w);
    height: var(--h);
    object-fit: cover;

    &.--square {
      --w: 360px !important;
      --h: 360px !important;
    }
  }
}

@container app (min-width: 768px) {
  .hero-banner-with-text {
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--spacing-m);
    padding: var(--spacing-l);
    min-height: 0;

    &.--with-description {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &.--image-left {
        flex-direction: row-reverse;

        & > * {
          justify-content: flex-start;
        }
      }

      & > * {
        width: calc(100vw / 2 - var(--spacing-m) * 3);
        display: flex;
        justify-content: flex-end;
      }

      .hero-banner-with-text__hero-image {
        width: var(--w);
        height: var(--h);
        object-fit: cover;

        &.--square {
          --w: 360px !important;
          --h: 360px !important;
        }
      }
    }

    * {
      text-align: left;
    }

    &__text-content {
      gap: var(--spacing-m);
    }

    &__heading {
      &.--text-centered {
        * {
          text-align: left;
        }
      }
    }

    &__buttons-group {
      flex-direction: row;
      justify-content: flex-start;
    }

    &__hero-image {
      width: 100%;
      height: var(--h);
      object-fit: cover;
    }
  }
}

@container app (min-width: 1200px) {
  .hero-banner-with-text {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-l);
    min-height: 100vh;
    padding: 12vh 12vw;

    * {
      text-align: left;
    }

    &.--with-description {
      min-height: 0;

      .hero-banner-with-text__hero-image {
        width: var(--w);
        height: var(--h);
        object-fit: cover;

        &.--square {
          --w: 520px !important;
          --h: 520px !important;
        }
      }
    }

    &__text-content {
      gap: var(--spacing-l);
    }

    &__heading {
      text-align: center;
      h1 {
        @extend .size-xlarge;
      }

      h2,
      h3 {
        @extend .size-large;
      }
    }

    &__description * {
      @extend .size-20;
    }

    &__hero-image {
      width: auto;
      min-width: var(--w);
    }
  }
}
</style>
