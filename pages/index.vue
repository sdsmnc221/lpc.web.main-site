<template>
  <hero-banner-with-text
    v-for="(hero, index) in heroBanners"
    :key="`hero-banner-with-text-homepage-${index}`"
    :slice="hero"
  ></hero-banner-with-text>

  <section class="home-headlines">
    <photo-with-text-block
      v-for="(block, index) in homeHeadlines"
      :key="`home-headline-homepage-${index}`"
      :slice="block"
    ></photo-with-text-block>
  </section>

  <pop-out-text :slice="popOutText"></pop-out-text>
</template>

<script setup lang="ts">
import HeroBannerWithText from "@/slices/HeroBannerWithText/index.vue";
import PhotoWithTextBlock from "@/slices/PhotoWithTextBlock/index.vue";
import PopOutText from "@/slices/PopOutText/index.vue";

const { client } = usePrismic();

const { data: home } = await useAsyncData("home", () =>
  client.getSingle("homepage")
);

const heroBanners = computed(
  () =>
    home.value?.data?.slices.filter(
      (s) => s.slice_type === "hero_banner_with_text"
    ) ?? []
);

const homeHeadlines = computed(
  () =>
    home.value?.data?.slices.filter(
      (s) => s.slice_type === "photo_with_text_block"
    ) ?? []
);

const popOutText = computed(() =>
  home.value?.data?.slices.find((s) => s.slice_type === "pop_out_text")
);
</script>

<style lang="scss">
@import "../styles/index.scss";

.app.--index {
  .multi-text-block {
    & > div:not(:first-of-type) {
      margin-top: var(--spacing-m);
    }
  }

  .home-headlines {
    display: flex;
    padding: var(--spacing-m);
    gap: var(--spacing-l);
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-top: var(--spacing-l);
  }
}

@container app (min-width: 768px) {
  .app.--index {
    .home-headlines {
      flex-direction: row;
      align-items: flex-start;
      margin-top: var(--spacing-m);
      padding: var(--spacing-l);
    }
  }
}

@container app (min-width: 1200px) {
  .app.--index {
    .home-headlines {
      flex-direction: row;
      margin-top: var(--spacing-m);
      padding: 10vh 12vw;
    }

    .multi-text-block {
      padding: var(--spacing-l) 12vw;

      &__block {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
}
</style>
