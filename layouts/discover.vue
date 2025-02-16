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

const currentPage = ref({ data: {} });

const getPage = async () => {
  await useAsyncData("currentPage", async () => {
    const { path: currentPagePath } = route;

    const data = await client.getByUID(
      "navigationpage",
      (currentPagePath as string).replaceAll("/", "").replace("adoptions", "")
    );

    currentPage.value = data;
  });
};

const seo = computed(() => ({
  title:
    currentPage.value?.data?.meta_title ?? defaultLayout.value?.data.meta_title,
  description:
    currentPage.value?.data?.meta_description ??
    defaultLayout.value?.data.meta_description,
}));

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

onMounted(() => {
  getPage();
  nextTick(() => {
    playFade();
  });
});

onUpdated(() => {
  getPage();
  nextTick(() => {
    playFade();
  });
});

watch(
  [() => seo.value, () => currentPage.value],
  ([newSeo, newPageContent]) => {
    useSeoMeta({
      title: newSeo.title,
      ogTitle: newSeo.title,
      description: newSeo.description,
      ogDescription: newSeo.description,
    });
  },
  { immediate: true }
);
</script>

<style lang="scss">
.discover {
  h1 {
    margin: auto !important;
  }

  img {
    filter: none !important;
    border-radius: 0;
  }
}
</style>
