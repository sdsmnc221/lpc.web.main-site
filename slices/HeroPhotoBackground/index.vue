<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="hero-photo-background"
    :style="`--bg-img: url(${backgroundImage})`"
  >
    <prismic-rich-text
      class="hero-photo-background__text-content gloock-regular"
      :field="textContent"
    />
  </section>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.HeroPhotoBackgroundSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const primary = computed(() => props.slice.primary);
const textContent = computed(() => primary.value?.text);
const backgroundImage = computed(() => primary.value?.backgroundimage?.url);
</script>

<style lang="scss">
.hero-photo-background {
  --bg-img: "";

  width: 100%;
  height: 100vh;

  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  position: relative;

  filter: saturate(0);

  &::after {
    content: "";
    position: absolute;
    width: calc(100% + 24vw);
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.4);
    pointer-events: none;
    opacity: 0.48;
  }

  &::before {
    content: "";
    position: absolute;
    width: calc(100% + 24vw);
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;

    background-image: var(--bg-img);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  &__text-content {
    position: relative;
    z-index: 2;
    padding: 0 10vw;

    * {
      @include ft-s(large);
    }

    strong {
      @extend .gloock-regular;
    }
  }
}

@container app (min-width: 700px) {
  .hero-photo-background {
    &__text-content {
      * {
        @include ft-s(xlarge);
      }
    }
  }
}
</style>
