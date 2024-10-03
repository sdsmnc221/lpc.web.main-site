<template>
  <hero-banner-with-text
    v-for="(hero, index) in heroBanners"
    :key="`hero-banner-with-text-adoptions-page-${index}`"
    :slice="hero"
  ></hero-banner-with-text>

  <multi-text-block
    class="introduction-timeline"
    :slice="introductions[0]"
  ></multi-text-block>

  <hero-photo-background :slice="missionvisions[0]"></hero-photo-background>
  <multi-text-block
    class="introduction-vision"
    :slice="introductions[1]"
  ></multi-text-block>

  <div class="indicators-group">
    <indicator-with-text
      v-for="indicator in indicators"
      :key="`about-page-${indicator.id}`"
      :slice="indicator"
    ></indicator-with-text>
  </div>

  <hero-photo-background :slice="missionvisions[1]"></hero-photo-background>

  <div class="pills-group">
    <headline-pill
      v-for="pill in pills"
      :key="`about-page-${pill.id}`"
      :slice="pill"
    ></headline-pill>
  </div>

  <div class="photos-group">
    <photo-with-text-block
      v-for="photo in photos"
      :key="`about-page-${photo.id}`"
      :slice="photo"
    ></photo-with-text-block>
  </div>

  <pop-out-text :slice="popOutText"></pop-out-text>
</template>

<script setup lang="ts">
import HeroBannerWithText from "@/slices/HeroBannerWithText/index.vue";
import MultiTextBlock from "@/slices/MultiTextBlock/index.vue";
import IndicatorWithText from "@/slices/IndicatorWithText/index.vue";
import PhotoWithTextBlock from "@/slices/PhotoWithTextBlock/index.vue";
import HeadlinePill from "@/slices/HeadlinePill/index.vue";
import PopOutText from "@/slices/PopOutText/index.vue";
import HeroPhotoBackground from "@/slices/HeroPhotoBackground/index.vue";

const { client } = usePrismic();

const { data: about } = await useAsyncData("about", () =>
  client.getByUID("navigationpage", "about")
);

const heroBanners = computed(
  () =>
    about.value?.data?.slices.filter(
      (s) => s?.slice_type == "hero_banner_with_text"
    ) ?? []
);

const introductions = computed(() =>
  about.value?.data?.slices.filter((s) => s?.slice_type === "multi_text_block")
);

const missionvisions = computed(() =>
  about.value?.data?.slices.filter(
    (s) => s?.slice_type === "hero_photo_background"
  )
);

const indicators = computed(
  () =>
    about.value?.data?.slices.filter(
      (s) => s?.slice_type == "indicator_with_text"
    ) ?? []
);

const photos = computed(
  () =>
    about.value?.data?.slices.filter(
      (s) => s?.slice_type == "photo_with_text_block"
    ) ?? []
);

const pills = computed(
  () =>
    about.value?.data?.slices.filter((s) => s?.slice_type == "headline_pill") ??
    []
);

const popOutText = computed(() =>
  about.value?.data?.slices.find((s) => s?.slice_type === "pop_out_text")
);
</script>

<style lang="scss">
.app.--about {
  .indicators-group,
  .photos-group,
  .pills-group {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--spacing-m);
    margin-bottom: var(--spacing-m);
  }

  .introduction- {
    &vision {
      text-align: center;
      margin-top: 12vh;
      margin-bottom: 0 !important;
      padding-left: 12vw;
      padding-right: 12vw;

      strong {
        font-weight: 800;
        @include ft-s(large);
      }
    }
  }

  .multi-text-block {
    margin-top: 6vh;
    margin-bottom: 12vh;
    & > div:not(:first-child) {
      margin-top: var(--spacing-m) !important;
    }
    &__title * {
      @extend .gloock-regular;
      @include ft-s(large);
    }
    &__block {
      width: 100%;
      * {
        @extend .albert-sans-regular;
        @include ft-s(medium);
        line-height: 1.2em;
        // text-decoration: underline;
        // text-underline-offset: 4px;
        // text-decoration-thickness: from-font;
      }

      strong,
      a {
        font-weight: 600;
      }
      a {
        background-color: var(--white);
        color: var(--black);
        padding: 0;
        text-decoration: underline;
        margin: 0;
      }
    }
  }
}

@container app (min-width: 700px) {
  .app.--about {
    .photos-group,
    .pills-group {
      gap: var(--spacing-s);
      margin-bottom: var(--spacing-s);
    }

    .photos-group {
      flex-wrap: wrap;
      flex-direction: row;

      & > * {
        flex: auto;
        width: calc((100% - var(--spacing-s) * 2) / 2);
        gap: 0;

        img {
          width: 100%;
          height: 100%;
          aspect-ratio: 1/1;
        }
      }
    }

    .hero-banner-with-text {
      &__sub-text * {
        text-align: center;
      }
    }

    .multi-text-block {
      & > div {
        flex-direction: column;

        div a {
          margin: 0;
          padding: 0;
        }
      }
    }
  }
}

@container app (max-width:699px) {
  .app.--about {
    .introduction-timeline {
      h2 {
        @include ft-s(medium);
      }
      h4,
      ul,
      li,
      strong,
      a {
        @include ft-s(20);
      }
    }
    .introduction-vision h2 {
      @include ft-s(medium);
    }
  }
}

@container app (min-width: 1000px) {
  .app.--about {
    .photos-group,
    .pills-group {
      gap: var(--spacing-s);
      margin-bottom: var(--spacing-s);
    }

    .indicators-group {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;

      & > * {
        width: 30%;
      }
    }

    // .hero-banner-with-text {
    //   &.--emphasis {
    //     .hero-banner-with-text__heading * {
    //       text-align: center;
    //       font-size: calc((var(--base-ft-size) * 8)) !important;
    //     }
    //   }
    // }

    .multi-text-block {
      &__block {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
}
</style>
