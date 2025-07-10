<template>
  <hero-banner-with-text
    ref="topRef"
    v-for="(hero, index) in heroBanners"
    :key="`hero-banner-with-text-adoptions-page-${index}`"
    :slice="hero"
  ></hero-banner-with-text>

  <Suspense>
    <hero-photo-background :slice="adoptionsHeadline"></hero-photo-background>
  </Suspense>

  <Suspense>
    <adoptions-grid :slice="adoptionsGrid"></adoptions-grid>
  </Suspense>

  <multi-text-block ref="faqRef" :slice="faq" class="faq"></multi-text-block>

  <pop-out-text :slice="popOutText"></pop-out-text>

  <ui-dock>
    <popover-banner
      v-if="adoptionHowTo"
      v-bind="adoptionHowTo.data"
    ></popover-banner>
    <Badge @click="quickAccess('top')">Haut de page</Badge>
  </ui-dock>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import HeroBannerWithText from "@/slices/HeroBannerWithText/index.vue";
import HeroPhotoBackground from "@/slices/HeroPhotoBackground/index.vue";

import AdoptionsGrid from "@/slices/AdoptionsGrid/index.vue";
import MultiTextBlock from "@/slices/MultiTextBlock/index.vue";
import PopOutText from "@/slices/PopOutText/index.vue";
import UiDock from "~/components/UiDock/UiDock.vue";
import Badge from "~/components/ui/badge/Badge.vue";
import PopoverBanner from "@/components/PopoverBanner/index.vue";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const { client } = usePrismic();

const { data: adoptions } = await useAsyncData("adoptions", () =>
  client.getByUID("navigationpage", "adoptions")
);

const { data: adoptionHowTo } = await useAsyncData("adoptionsHowTo", () =>
  client.getByUID("popoverbanner", "modalites-adoption")
);

const heroBanners = computed(
  () =>
    adoptions.value?.data?.slices.filter(
      (s) => s?.slice_type == "hero_banner_with_text"
    ) ?? []
);

const adoptionsHeadline = computed(() =>
  adoptions.value?.data?.slices.find(
    (s) => s?.slice_type === "hero_photo_background"
  )
);

const faq = computed(() =>
  adoptions.value?.data?.slices.find(
    (s) => s?.slice_type === "multi_text_block"
  )
);

const adoptionsGroup = computed(() =>
  adoptions.value?.data?.slices.filter(
    (s) => s?.slice_type == "adoptions_group"
  )
);

const adoptionsGrid = computed(() =>
  adoptionsGroup.value?.find((s) => s.variation === "adoptionsGrid")
);

const popOutText = computed(() =>
  adoptions.value?.data?.slices.find((s) => s?.slice_type === "pop_out_text")
);

const emits = defineEmits(["animation-init-done"]);
const gsapPartialInitDone = ref(0);
const onGsapInitDone = () => {
  gsapPartialInitDone.value += 1;

  if (gsapPartialInitDone.value === adoptionsGroup.value?.length) {
    emits("animation-init-done");
  }
};

const topRef = ref(null);
const faqRef = ref(null);
const quickAccess = (section: string) => {
  let node, y;

  nextTick(() => {
    if (window && document) {
      switch (section) {
        case "top":
          y = 0;
          gsap.to(window, { duration: 1.6, scrollTo: y });
          break;
        case "faq":
          gsap.to(window, {
            duration: 2.4,
            scrollTo: {
              y: ".faq",
              offsetY: 64,
            },
          });
          break;
        default:
          break;
      }
    }
  });
};

onMounted(() => {
  // playFade();
});
</script>

<style lang="scss">
body:has(.app.--adoptions) {
  scrollbar-gutter: stable; // Keeps space for scrollbar
}

.app.--adoptions {
  padding-right: 0;
  padding-left: 0;

  & > *:not(.adoptions-group) {
    padding-right: 8vw;
    padding-left: 8vw;
  }

  .multi-text-block {
    & > div:not(:first-of-type) {
      margin-top: var(--spacing-m);
    }
  }
}

@container app (min-width: 700px) {
  .app.--adoptions {
    .hero-banner-with-text {
      &__sub-text * {
        text-align: center;
      }
    }
  }
}

@container app (min-width: 1000px) {
  .app.--adoptions {
    .multi-text-block {
      &__block {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
}
</style>
