<template>
  <div>
    <main class="app" :class="`--${route.name as string}`">
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
import { computed, watch } from "vue";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FooterMenu from "@/components/FooterMenu/index.vue";
import PopoverBanner from "@/components/PopoverBanner/index.vue";

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

import "lenis/dist/lenis.css";

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

@container nuxt (min-width: 701px) {
  .app {
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
  .app {
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
  .app {
    padding: var(--spacing-l) 12vw;
    padding-top: 0;
  }
}

@container nuxt (min-width: 1200px) {
  .app {
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
