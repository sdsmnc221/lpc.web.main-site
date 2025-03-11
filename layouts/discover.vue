<template>
  <div>
    <main class="discover" :class="`--${route.name as string}`">
      <slot />
    </main>

    <footer-menu v-if="footer && footer.data" v-bind="footer.data">
      <template v-if="popoverBanners?.length" #popover-banner>
        <popover-banner
          v-for="banner in popoverBanners"
          :key="`footer-banner-${banner.id}`"
          v-bind="banner.data"
        ></popover-banner>
      </template>
    </footer-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, nextTick } from "vue";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSmoothScroll from "~/composables/useSmoothScroll";

import usePageData from "~/composables/usePageData";

import FooterMenu from "@/components/FooterMenu/index.vue";
import PopoverBanner from "@/components/PopoverBanner/index.vue";

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();

const { client } = usePrismic();

const { data: defaultLayout } = await useAsyncData("defaultLayout", () =>
  client.getByUID("pagelayout", "default-layout")
);

const { data: popoverBanners } = await useAsyncData(
  "popoverBanner",
  async () => {
    const { data: defaultLayout } = await client.getByUID(
      "pagelayout",
      "default-layout"
    );
    const { popoverbanners } = defaultLayout;

    if (popoverbanners && popoverbanners.length) {
      const bannersData = await Promise.all(
        popoverbanners.map(
          async ({ banner }) => await client.getByID(banner.id)
        )
      );

      return bannersData;
    }

    return null;
  }
);

const { data: navigation } = await useAsyncData("navigation", () =>
  client.getSingle("navigationmenu")
);
const links = computed(() => navigation.value?.data.navigationlink);

const { data: footer } = await useAsyncData("footer", () =>
  client.getSingle("footermenu")
);

// Usage in your page or layout component:

const { currentPage, loading, error, fetchPageData } = usePageData(
  "Chez Les Petits Clochards"
);

useSmoothScroll();

const playFade = () => {
  const children = [
    ...document.body.querySelectorAll(".adoptions > * > *:not(.title) > *"),
  ];

  children.forEach((section, index) => {
    gsap.from(section as any, {
      y: 320,
      opacity: 0,
      backgroundColor: "transparent",
      rotateX: 72 * Math.random() * (index % 2 === 0 ? 1 : -1),
      rotateZ: Math.random() * 32 * (index % 2 === 0 ? -1 : 1),
      filter: "blur(1rem)",
      delay: 0.2,
      scrollTrigger: {
        trigger: section as any,
        start: "top bottom+=120px",
      },
    });
  });
};

fetchPageData();

onMounted(() => {
  nextTick(() => {
    playFade();
  });
});

onUpdated(() => {
  nextTick(() => {
    playFade();
  });
});
</script>

<style lang="scss">
.discover:not(:has(.quatuor)) {
  h1 {
    margin: auto !important;
  }

  img {
    filter: none !important;
    border-radius: 0;
  }
}
</style>
