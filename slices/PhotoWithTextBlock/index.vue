<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="photo-with-text-block"
  >
    <prismic-image
      class="photo-with-text-block__photo --square"
      :field="photo"
    />

    <h3 class="photo-with-text-block__title aherlbert-sans-bold">
      {{ title }}
    </h3>

    <prismic-rich-text
      class="photo-with-text-block__description albert-sans-regular text-base leading-tight"
      :field="description"
      :link-resolver="prismicLinkAdapter"
    />
  </section>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";
import { computed } from "vue";
import linkAdapter from "~/prismic/linkAdapter";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.PhotoWithTextBlockSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const primary = computed(() => props.slice.primary);

const photo = computed(() => primary.value?.photo);
const title = computed(() => primary.value?.title);
const description = computed(() => primary.value?.description);

const prismicLinkAdapter = (doc) => {
  console.log(doc);
  const linkData = {
    linkitem: {
      type: doc.type,
      uid: doc.uid,
      link_type: doc.link_type || "Document",
    },
    linkhref: doc.url || null,
  };

  const result = linkAdapter(linkData);

  // Gérer les objets de route
  if (typeof result === "object" && result.name) {
    const router = useRouter();
    return router.resolve(result).href;
  }

  return result;
};
</script>

<style lang="scss">
.photo-with-text-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-s);

  margin: 0 auto;
  text-align: left;

  &__photo {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    min-width: var(--w);
    min-height: var(--h);
    object-fit: cover;
  }
  .photo-with-text-block__description {
    & > p {
      margin-top: 13px;
    }
  }

  h3 {
    @include ft-s(medium);
  }

  a:not(:has(strong)) {
    position: relative;
    font-weight: bold;

    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--gray-dark);
    }
  }

  a:not([href^="tel:"]):has(strong) {
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

  a:is([href^="tel:"]):not(:has(strong)) {
    font-weight: bold;
    text-decoration: underline;
  }
}

@container app (min-width: 700px) {
  .photo-with-text-block {
    align-items: flex-start;
    flex: 1;

    &__photo {
      &.--square {
        --w: 210px !important;
        --h: 210px !important;
      }
    }
  }
}

@container app (min-width: 1000px) {
  .photo-with-text-block {
    flex: 1;

    &__photo {
      &.--square {
        --w: 310px !important;
        --h: 310px !important;
      }
    }
  }
}
</style>
