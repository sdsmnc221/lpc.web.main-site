<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="hero-banner-with-text"
    :class="`--${variant} ${descriptionParagraph.length > 0 ? '--with-description' : ''} --image-${heroImagePosition} ${withEmphasis ? '--emphasis' : ''} `"
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
          :variant="withEmphasis || withButton ? 'light' : 'dark'"
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
const withEmphasis = computed(() =>
  variation.value.toLowerCase().includes("emphasis")
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
  gap: var(--spacing-l);
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  position: relative;
  // padding: var(--spacing-m) 0 var(--spacing-l) 0;

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200%;
    height: 100%;
    z-index: -1;
  }

  &.--light {
    @extend .bg-white;

    .hero-banner-with-text__heading *,
    .hero-banner-with-text__description * {
      @extend .cl-black;
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
          @extend .size-xxlarge;
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

  &__description {
    * {
      line-height: 1.5em;
      @extend .size-16;
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

  &__image-content {
    display: flex;
    justify-content: center;
  }
}

@container app (max-width: 700px) {
  .app {
    .hero-banner-with-text {
      &__image-content {
        flex: 1;
      }

      &__hero-image.--square {
        --w: 72vw !important;
        --h: auto !important;
        aspect-ratio: 1/1;
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
    min-height: 100vh;

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
