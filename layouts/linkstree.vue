<template>
  <div>
    <main class="app relative" :class="`--${route.name as string}`">
      <slot />
      <navigation-menu
        :links="links"
        class-name="bg-gray-300 border-r border-t md:border-t-0 md:border-r-0 md:border-b border-gray-400"
      ></navigation-menu>
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
import { computed, watch } from "vue";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FooterMenu from "@/components/FooterMenu/index.vue";
import PopoverBanner from "@/components/PopoverBanner/index.vue";
import NavigationMenu from "@/components/NavigationMenu/index.vue";

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();

const { client } = usePrismic();

const { data: navigation } = await useAsyncData("navigation", () =>
  client.getSingle("navigationmenu")
);
const links = computed(() => navigation.value?.data.navigationlink);

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

const { data: footer } = await useAsyncData("footer", () =>
  client.getSingle("footermenu")
);

const currentPage = ref({ data: {} });

const getPage = async () => {
  await useAsyncData("currentPage", async () => {
    const { name: currentPageName, path: currentPagePath } = route;

    let data;

    data = await client.getByUID("linkstreepage", currentPageName as string);

    currentPage.value = data;
  });
};

const seo = computed(() => ({
  title:
    currentPage.value?.data?.meta_title ?? defaultLayout.value?.data.meta_title,
  description:
    currentPage.value?.data?.meta_description ??
    defaultLayout.value?.data.meta_description,
  image:
    currentPage.value?.data?.meta_image?.url ??
    defaultLayout.value?.data?.meta_image?.url,
}));

const playMagic = () => {
  const lenis = new Lenis({
    // wrapper: document.body.querySelector("#__nuxt") as HTMLElement,
  });

  window.lenis = lenis;

  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  requestAnimationFrame(raf);
};

onMounted(() => {
  getPage();
  playMagic();
});

onUpdated(() => {
  getPage();
});

watch(
  () => seo.value,
  (newSeo) => {
    useSeoMeta({
      title: newSeo.title,
      ogTitle: newSeo.title,
      description: newSeo.description,
      ogDescription: newSeo.description,
      ogImage: newSeo.image,
      twitterImage: newSeo.image,
    });
  },
  { immediate: true }
);
</script>

<style lang="scss">
@import "../styles/index.scss";

#__nuxt:has(.links) {
  .navigation-menu {
    position: absolute !important;
    padding-bottom: 0;
    padding-top: 0 !important;
    width: 40% !important;
    right: 0 !important;
    top: 0 !important;
    left: 0 !important;
    flex-direction: column;
    height: 100dvh;
    gap: 32px;
    background-color: rgba(0, 0, 0, 0.48);
    border: none;
    justify-content: center;
    align-items: center;
    z-index: 1;

    transition: none !important;

    * {
      color: var(--gray);
      margin: 0;
      padding: 0;
    }

    a {
      text-transform: uppercase;
      text-align: center !important;
      color: white;
      transition: all ease-in-out 0.64s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.48);
      }
    }

    .router-link-active {
      background-color: rgba(0, 0, 0, 0.48);
      font-weight: 500;
    }
  }

  @media screen and (max-width: 699px) {
    .navigation-menu {
      left: 0 !important;
      right: auto !important;
      width: 40% !important;
      bottom: 0 !important;
      top: 0 !important;
      flex-direction: column;

      a {
        text-align: left;
        width: 100%;
      }
    }
  }
}

@container nuxt (min-width: 701px) {
  .app:has(.links) {
    padding: var(--spacing-l);
    padding-top: 0;

    h1 {
      font-size: calc((var(--base-ft-size) * 4));
    }

    h2,
    h3 {
      font-size: calc((var(--base-ft-size) * 3));
    }
  }
}

@container nuxt (max-width: 699px) {
  .app:has(.links) {
    padding: var(--spacing-m);

    h1 {
      font-size: calc((var(--base-ft-size) * 3));
    }

    h2,
    h3 {
      font-size: calc((var(--base-ft-size) * 2));
    }
  }
}

@container nuxt (min-width: 1000px) {
  .app:has(.links) {
    padding: var(--spacing-l) 12vw;
    padding-top: 0;
  }
}

@container nuxt (min-width: 1200px) {
  .app:has(.links) {
    padding: var(--spacing-l) 8vw;
    padding-top: 0;

    h1 {
      font-size: calc((var(--base-ft-size) * 5));
    }

    h2,
    h3 {
      font-size: calc((var(--base-ft-size) * 4));
    }
  }
}
</style>
