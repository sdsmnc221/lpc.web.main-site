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

const { data: navigation } = await useAsyncData("navigation", () =>
  client.getSingle("navigationmenu")
);
const links = computed(() => navigation.value?.data.navigationlink);

const { data: footer } = await useAsyncData("footer", () =>
  client.getSingle("footermenu")
);

const currentPage = ref({ data: {} });

const updateCount = ref(0);

const getPage = async () => {
  await useAsyncData("currentPage", async () => {
    const { name: currentPageName, path: currentPagePath } = route;

    let data;

    if (currentPageName) {
      data =
        currentPageName === "index"
          ? await client.getSingle("homepage")
          : currentPageName === "links"
            ? await client.getByUID("linkstreepage", currentPageName as string)
            : await client.getByUID(
                "navigationpage",
                currentPageName as string
              );
    } else {
      data = await client.getByUID(
        "navigationpage",
        (currentPagePath as string).replace("/", "")
      );
    }

    currentPage.value = data;
  });
};

const seo = ref({
  title: currentPage.value?.data?.meta_title
    ? currentPage.value.data.meta_title
    : defaultLayout.value?.data.meta_title,
  description: currentPage.value?.data?.meta_description
    ? currentPage.value.data.meta_description
    : defaultLayout.value?.data.meta_description,
  image: currentPage.value?.data?.meta_image?.url
    ? currentPage.value.data.meta_image.url
    : defaultLayout.value?.data.meta_image.url,
});

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

const playFade = () => {
  console.log(["links", "adoptions"].includes(route.path));
  if (updateCount.value === 0) {
    const children = [
      ...document.body.querySelectorAll(".app > *:not(.emoji-banner) > *"),
    ];

    children.forEach((section) => {
      gsap.from(section as any, {
        y: 240,
        opacity: 0,
        backgroundColor: "transparent",
        filter: "blur(16px)",
        delay: 0.2,
        scrollTrigger: {
          trigger: section as any,
          start: "top bottom",
        },
      });
    });

    updateCount.value += 1;
  }
};

onMounted(() => {
  getPage();
  playMagic();
  playFade();
});

onUpdated(() => {
  getPage();
  playFade();
  updateCount.value += 1;
});

watch(
  () => currentPage.value,
  () => {
    seo.value = {
      title: currentPage.value?.data?.meta_title
        ? currentPage.value.data.meta_title
        : defaultLayout.value?.data.meta_title,
      description: currentPage.value?.data?.meta_description
        ? currentPage.value.data.meta_description
        : defaultLayout.value?.data.meta_description,
      image: currentPage.value?.data?.meta_image?.url
        ? currentPage.value.data.meta_image.url
        : defaultLayout.value?.data.meta_image.url,
    };
  },
  { deep: true, immediate: true }
);

watch(
  () => seo.value,
  () => {
    useSeoMeta({
      title: seo.value.title,
      ogTitle: seo.value.title,
      description: seo.value.description,
      ogDescription: seo.value.description,
      ogImage: seo.value.image,
      twitterImage: seo.value.image,
    });
  },
  { immediate: true, deep: true }
);

watch(
  () => route.name,
  (newRoute, oldRoute) => {
    if (newRoute !== oldRoute) {
      updateCount.value = 0;
    }
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
      // @include ft-s(xlarge);
      font-size: calc((var(--base-ft-size) * 4));
    }

    h2,
    h3 {
      // @include ft-s(large);
      font-size: calc((var(--base-ft-size) * 3));
    }
  }
}

@container nuxt (max-width: 699px) {
  .app {
    padding: var(--spacing-m);

    h1 {
      // @include ft-s(large);
      font-size: calc((var(--base-ft-size) * 3));
    }

    h2,
    h3 {
      // @include ft-s(medium);
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
      // @include ft-s(xxlarge);
      font-size: calc((var(--base-ft-size) * 5));
    }

    h2,
    h3 {
      // @include ft-s(xlarge);
      font-size: calc((var(--base-ft-size) * 4));
    }
  }
}
</style>
