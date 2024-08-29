<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="map-with-text-block"
  >
    <div class="map-with-text-block__text-content">
      <prismic-rich-text
        class="map-with-text-block__heading gloock-regular"
        :field="title"
      />

      <prismic-rich-text
        class="hero-banner-with-text__description albert-sans-regular"
        :field="descriptionParagraph"
      />
    </div>

    <div class="map-with-text-block__map-content" v-if="geoPoint">
      <LMap
        style="height: 480px"
        :zoom="zoom"
        :center="[geoPoint.latitude, geoPoint.longitude]"
        :use-global-leaflet="false"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          layer-type="base"
          name="OpenStreetMap"
        />
        <LMarker :lat-lng="[geoPoint.latitude, geoPoint.longitude]" draggable />
      </LMap>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";
import { computed, ref } from "vue";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.MapWithTextBlockSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const primary = computed(() => props.slice.primary);

const title = computed(() => primary.value?.title);
const descriptionParagraph = computed(() => primary.value?.description);
const geoPoint = computed(() => primary.value?.geopoint);

const zoom = ref(24);
</script>

<style lang="scss">
@import "@/styles/imports";

.map-with-text-block {
  display: flex;
  gap: var(--spacing-l);
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  &__text-content {
    display: flex;
    gap: var(--spacing-m);
    flex-direction: column;
    justify-content: flex-start;
  }

  &__map-content {
    flex: 1;
    width: 100%;
    min-height: 480px;

    & > * {
      border-radius: 32px;
    }
  }

  &__heading {
    * {
      line-height: 1.2em;
    }

    h1,
    h2,
    h3 {
      @extend .size-large;
    }
  }

  &__description {
    * {
      line-height: 1.5em;
      @extend .size-16;
    }
  }
}

@container app (min-width: 700px) {
  .map-with-text-block {
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row;
    gap: var(--spacing-m);

    &__text-content {
      flex: 1;
    }

    &__map-content {
      width: 48%;
    }
  }
}

@container app (min-width: 1000px) {
  .map-with-text-block {
    gap: var(--spacing-l);
  }
}
</style>
