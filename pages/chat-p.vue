<template>
  <component
    v-for="(slice, index) in slices"
    :is="getComponent(slice.component)"
    :key="`page-slices-${index}`"
    :slice="slice"
  ></component>
</template>

<script setup lang="ts">
import HeroPhotoBackground from "@/slices/HeroPhotoBackground/index.vue";
import HeroBannerWithText from "@/slices/HeroBannerWithText/index.vue";
import MultiTextBlock from "@/slices/MultiTextBlock/index.vue";
import ExpandableGallery from "@/slices/ExpandableGallery/index.vue";
import PopOutText from "@/slices/PopOutText/index.vue";

import { toPascalCase } from "@/lib/helpers";

const emits = defineEmits(["animation-init-done"]);

const { client } = usePrismic();

const { data: page } = await useAsyncData("contact", () =>
  client.getByUID("navigationpage", "chat-p")
);

const slices = computed(() => {
  return page.value?.data?.slices.map((s) => ({
    ...s,
    component: toPascalCase(s.slice_type),
  }));
});

const getComponent = (compName: string) => {
  switch (compName) {
    case "HeroPhotoBackground":
      return HeroPhotoBackground;
    case "HeroBannerWithText":
      return HeroBannerWithText;
    case "MultiTextBlock":
      return MultiTextBlock;
    case "ExpandableGallery":
      return ExpandableGallery;
    case "PopOutText":
      return PopOutText;
    default:
      return;
  }
};

onMounted(() => {
  console.log(
    page.value?.data?.slices.map((s) => ({
      ...s,
      component: toPascalCase(s.slice_type),
    }))
  );
  nextTick(() => emits("animation-init-done"));
});
</script>

<style lang="scss">
.app.--chat-p {
  .hero-banner-with-text {
    &__buttons-group {
      .ui-button {
        align-self: start;
      }
    }
  }
  .multi-text-block {
    & > div:not(:first-of-type) {
      margin-top: var(--spacing-m);
    }
  }
}

@container app (min-width: 1000px) {
  .app.--chat-p {
    .hero-banner-with-text {
      &.--emphasis {
        .hero-banner-with-text__heading * {
          font-size: calc((var(--base-ft-size) * 8)) !important;
        }
      }
    }

    .multi-text-block {
      &__block {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
}
</style>
