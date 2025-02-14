<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="expandable-gallery"
  >
    <prismic-rich-text
      class="expandable-gallery__title cl-black gloock-regular"
      :field="title"
    />

    <prismic-rich-text
      class="expandable-gallery__description cl-black albert-sans-bold"
      :field="description"
    />

    <div
      v-if="chunks.length"
      class="expandable-gallery__images flex flex-col gap-2"
    >
      <div
        v-for="(chonk, indexChonk) in chunks"
        :key="`expandable-gallery-${title}-chonk-${index}`"
        :class="cn('flex flex-col md:flex-row  md:h-96 h-svh w-full gap-2 ')"
      >
        <div
          v-for="(image, index) in chonk"
          :key="`expandable-gallery-${title}-${indexChonk}-${index}`"
          :class="computedClassChonk(chonk)"
        >
          <img
            class="relative h-full w-full md:w-auto object-cover rounded-none pointer-events-none"
            :src="image.src"
            :alt="image.alt"
          />

          <img
            class="absolute h-full w-full md:w-auto object-cover rounded-none"
            :src="image.srcAlternative"
            :alt="image.alt"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";
import { cn } from "~/lib/utils";
import { chunkArray, isMobile } from "~/lib/helpers";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.ExpandableGallerySlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
const primary = computed(() => props.slice.primary);
const title = computed(() => primary.value?.title);
const description = computed(() => primary.value?.description);
const images = computed(() => {
  return (
    primary.value?.images?.map((element) => ({
      src: element.image.url,
      alt: element.image.alt,
      srcAlternative: element.hoverimage.url,
    })) ?? []
  );
});

const chunks = computed(() => chunkArray(images.value, 7));

const computedClassChonk = (chonk: any[]) =>
  chonk.length < 4
    ? "relative flex h-full flex-1 cursor-pointer overflow-hidden aspect-square rounded-xl transition-all duration-500 ease-in-out hover:rounded-none md:hover:flex-[3] hover:flex-none hover:justify-center md:hover:h-full hover:h-auto hover:w-[100%]"
    : "relative flex h-full flex-1 cursor-pointer overflow-hidden aspect-square rounded-xl transition-all duration-500 ease-in-out hover:rounded-none md:hover:flex-[2] hover:flex-none hover:justify-center md:hover:h-full hover:h-auto hover:w-[100%]";
</script>

<style lang="scss">
.expandable-gallery {
  margin-bottom: var(--spacing-l) !important;

  &:not(:has(.expandable-gallery__block)) {
    margin: 0;
    padding: 0;

    .expandable-gallery__title {
      margin: 0;
      padding: 0;
    }
  }

  &__title {
    margin-bottom: var(--spacing-m);
    * {
      @include ft-s(large);
      @extend .gloock-regular;
    }
  }

  &__images {
    margin-top: var(--spacing-l);

    div div {
      img:last-child {
        position: absolute;
        top: 0;
        left: 50%;
        width: auto;
        height: 100%;
        transform: translateX(-50%);
        opacity: 0;
        transition: opacity ease-in-out 0.72s;
      }

      &:hover {
        img:last-child {
          opacity: 1;
        }
      }
    }
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);
    margin-top: var(--spacing-m);

    &:not(:last-child) {
      margin-bottom: var(--spacing-s);
    }

    *,
    p * {
      @include ft-s(20);
      line-height: 24px;

      @media screen and (max-width: 480px) {
        @include ft-s(16);
      }
    }
  }

  a:not([href^="tel:"]) {
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

  a:is([href^="tel:"]) {
    font-weight: bold;
    text-decoration: underline;
  }
}

@container app (min-width: 700px) {
  .expandable-gallery {
    & > div {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
}
</style>
