<template>
  <hero-banner-with-text
    ref="topRef"
    v-for="(hero, index) in heroBanners"
    :key="`hero-banner-with-text-adoptions-page-${index}`"
    :slice="hero"
  ></hero-banner-with-text>

  <hero-photo-background :slice="adoptionsHeadline"></hero-photo-background>

  <Suspense>
    <adoptions-group
      v-for="(group, index) in adoptionsGroup"
      :key="`${group.id}-${index}`"
      :slice="group"
      :index="index"
      @gsap-init-done="onGsapInitDone"
    ></adoptions-group>
  </Suspense>

  <multi-text-block ref="faqRef" :slice="faq"></multi-text-block>

  <pop-out-text :slice="popOutText"></pop-out-text>

  <ui-dock>
    <Badge @click="quickAccess('faq')">Modalités d'adoption</Badge>
    <Badge @click="quickAccess('top')">Haut de page</Badge>
  </ui-dock>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroBannerWithText from "@/slices/HeroBannerWithText/index.vue";
import HeroPhotoBackground from "@/slices/HeroPhotoBackground/index.vue";
import AdoptionsGroup from "@/slices/AdoptionsGroup/index.vue";
import MultiTextBlock from "@/slices/MultiTextBlock/index.vue";
import PopOutText from "@/slices/PopOutText/index.vue";
import UiDock from "~/components/UiDock/UiDock.vue";
import Badge from "~/components/ui/badge/Badge.vue";

gsap.registerPlugin(ScrollTrigger);

const { client } = usePrismic();

const { data: adoptions } = await useAsyncData("adoptions", () =>
  client.getByUID("navigationpage", "adoptions")
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

const popOutText = computed(() =>
  adoptions.value?.data?.slices.find((s) => s?.slice_type === "pop_out_text")
);

const emits = defineEmits(["gsap-init-done"]);
const gsapPartialInitDone = ref(0);
const onGsapInitDone = () => {
  gsapPartialInitDone.value += 1;

  if (gsapPartialInitDone.value === adoptionsGroup.value?.length) {
    emits("gsap-init-done");
  }
};

const topRef = ref(null);
const faqRef = ref(null);
const quickAccess = (section: string) => {
  let node, y;

  if (window && document) {
    switch (section) {
      case "top":
        node = topRef.value;
        y = 0;
        break;
      case "faq":
      default:
        node = faqRef.value;
        y = document.documentElement.getBoundingClientRect().height;
        break;
    }

    window.scroll({
      top: y,
      behavior: "smooth",
    });
  }
};

onMounted(() => {
  // playFade();
});

definePageMeta({
  layout: "default-temp",
});
</script>

<style lang="scss">
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
