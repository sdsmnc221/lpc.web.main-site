<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="hero-banner-with-text"
    :class="`--${variant} ${withTextOnly ? '--text-only' : ''} ${descriptionParagraph.length > 0 ? '--with-description' : ''} --image-${heroImagePosition} ${withEmphasis ? '--emphasis' : ''} `"
  >
    <div class="hero-banner-with-text__text-content">
      <prismic-rich-text
        class="hero-banner-with-text__sub-text cl-gray size-medium"
        :field="subText"
      />

      <prismic-rich-text
        class="hero-banner-with-text__heading gloock-regular"
        :class="{
          '--text-centered': descriptionParagraph.length === 0,
        }"
        :field="headingText"
      />

      <prismic-rich-text
        v-if="descriptionParagraph.length > 0"
        class="hero-banner-with-text__description albert-sans-regular"
        :field="descriptionParagraph"
      />

      <div
        class="hero-banner-with-text__buttons-group"
        v-if="buttons && buttons.length"
      >
        <ui-button
          v-for="(btn, index) in buttons"
          :key="`hero-banner-with-text__button-item-${index}`"
          :label="btn.buttonlabel"
          :variant="
            withEmphasis || (withButton && variant !== 'light')
              ? 'light'
              : 'dark'
          "
          :link="btn.buttonitem"
        ></ui-button>
      </div>
    </div>

    <div class="hero-banner-with-text__image-content" v-if="!withTextOnly">
      <prismic-image
        class="hero-banner-with-text__hero-image"
        :class="{ '--square': descriptionParagraph.length > 0 }"
        :field="heroImage"
      />
      <prismic-rich-text
        v-if="heroImageDescription?.length > 0"
        class="hero-banner-with-text__hero-image-description"
        :field="heroImageDescription"
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
const withEmphasis = computed(() =>
  variation.value.toLowerCase().includes("emphasis")
);
const withTextOnly = computed(() =>
  variation.value.toLowerCase().includes("heading")
);

const primary = computed(() => props.slice.primary);

const variant = computed(() => primary.value.variant);
const heroImagePosition = computed(() => primary.value?.heroimageposition);

const heroImage = computed(() => primary.value?.heroimage);
const heroImageDescription = computed(
  () => primary.value?.heroimagedescription
);
const subText = computed(() => primary.value?.subtext);
const headingText = computed(() => primary.value?.headingtext);
const descriptionParagraph = computed(
  () => primary.value?.descriptionparagraph
);
const buttons = computed(() => primary.value?.buttonsgroups);
</script>

<style lang="scss">
.hero-banner-with-text {
  display: flex;
  gap: var(--spacing-l);
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  position: relative;

  // padding: var(--spacing-m) 0 var(--spacing-l) 0;

  & > * {
    position: relative;
    z-index: 1;
  }

  &.--text-only {
    padding-bottom: 0;
    align-items: flex-start;

    & + * {
      margin-top: 0 !important;
      padding-top: var(--spacing-m);
    }
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200%;
    height: 100%;
    z-index: 0;
  }

  &.--light {
    @extend .bg-white;

    .hero-banner-with-text__heading *,
    .hero-banner-with-text__description * {
      @extend .cl-black;
      @extend .a-button;
    }

    &::after {
      @extend .bg-white;
    }
  }

  &.--dark {
    @extend .bg-black;

    .hero-banner-with-text__heading *,
    .hero-banner-with-text__description * {
      @extend .cl-white;
    }

    &::after {
      @extend .bg-black;
    }
  }

  &.--emphasis {
    .hero-banner-with-text {
      &__heading {
        * {
          text-transform: uppercase;
          width: 100%;
          text-align: center;
          @include ft-s(xxlarge);
        }
      }

      &__description {
        * {
          text-align: center;
        }
      }

      &__buttons-group {
        * {
          text-transform: uppercase;
        }
      }
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

    &.--text-centered {
      * {
        text-align: center;
      }
    }
  }

  &__description {
    * {
      line-height: 1.5em;
      @include ft-s(16);
    }
  }

  &__buttons-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-m);
  }

  &__hero-image {
    --w: 640px;

    width: var(--w);
    height: auto;
    object-fit: cover;
    aspect-ratio: 1;

    &-description {
      width: 72%;
      margin: 0;
      margin-top: var(--spacing-s);
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      align-items: center;

      * {
        text-align: left;
        line-height: 1.5em;
        @include ft-s(small);
        margin: 0 !important;
      }

      a {
        text-decoration: underline;
      }
    }

    &.--square {
      --w: 360px !important;

      aspect-ratio: 1;
    }
  }

  &__image-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}

@container app (max-width: 699px) {
  .app {
    .hero-banner-with-text {
      &__image-content {
        flex: 1;
      }

      &__hero-image.--square {
        --w: 100% !important;
        --h: auto !important;
        aspect-ratio: 1/1;
      }

      &__hero-image-description {
        width: 100%;
        align-items: flex-start;
      }
    }
  }
}

@container app (min-width: 700px) {
  .hero-banner-with-text {
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--spacing-m);
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
        // justify-content: flex-end;
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

    &.--emphasis {
      flex-direction: column;

      & > * {
        width: 100%;
      }

      .hero-banner-with-text {
        &__heading {
          * {
            @extend .size-fullW;
          }
        }

        &__description {
          margin: var(--spacing-m) 0;
        }

        &__buttons-group {
          margin: var(--spacing-m) 0;
          * {
            margin: 0 auto;
          }
        }

        &__hero-image.--square {
          --w: 710px !important;
          --h: 600px !important;
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

      &:has(.ui-button:nth-child(3)) {
        flex-direction: column;
        margin-top: calc(-1 * var(--spacing-s));
      }
    }

    &__hero-image {
      width: 100%;
      height: var(--h);
      object-fit: cover;
    }
  }
}

@container app (min-width: 1000px) {
  .hero-banner-with-text {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-l);

    &:not(.--text-only) {
      min-height: 100vh;
    }

    * {
      text-align: left;
    }

    &.--image-right {
      .hero-banner-with-text__image-content {
        justify-content: flex-end;
        align-items: flex-end;
      }
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

    &.--emphasis {
      flex-direction: column;

      & > * {
        width: 100%;
      }

      .hero-banner-with-text {
        &__description {
          padding: 0 12vw;
        }

        &__hero-image.--square {
          --w: 1000px !important;
          --h: 600px !important;
          aspect-ratio: var(--w) / var(--h);
          margin: 0 auto;
        }
      }
    }

    &__text-content {
      gap: var(--spacing-l);
    }

    &:not(.--emphasis):not(:has(.hero-banner-with-text__buttons-group)) {
      .hero-banner-with-text__text-content {
        align-self: flex-start;
      }
    }

    &__heading {
      text-align: center;
    }

    &__description * {
      @include ft-s(20);
    }

    &__hero-image {
      --w: 72vw !important;
      width: auto;
    }
  }
}

@container app (min-width: 1600px) {
  .hero-banner-with-text {
    &:not(.--emphasis):not(:has(.hero-banner-with-text__buttons-group)) {
      .hero-banner-with-text__text-content {
        align-self: center;
      }
    }

    .hero-banner-with-text__hero-image {
      --w: 72vw !important;
      height: 50%;
    }

    &.--with-description {
      min-height: 0;

      .hero-banner-with-text__hero-image {
        width: var(--w);
        height: auto;
        object-fit: cover;
        aspect-ratio: 1/1;

        &.--square {
          --w: 72% !important;
          --h: auto !important;
        }
      }
    }
  }
}
</style>
