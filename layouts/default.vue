<template>
  <div class="superapp">
    <div>
      <accordion-navigation :links="links"></accordion-navigation>

      <navigation-menu :links="links" ref="navigationMenu"></navigation-menu>

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
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import useSmoothScroll from "@/composables/useSmoothScroll";

import AccordionNavigation from "@/components/AccordionNavigation/index.vue";
import NavigationMenu from "@/components/NavigationMenu/index.vue";
import FooterMenu from "@/components/FooterMenu/index.vue";
import PopoverBanner from "@/components/PopoverBanner/index.vue";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { isSafari, isMobile } from "@/lib/helpers";

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();

const emits = defineEmits(["animation-init-done"]);

const navigationMenu = ref<InstanceType<typeof NavigationMenu> | null>(null);
const navigationMenuHeight = ref(0);

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
    const { name: currentPageName } = route;

    const data =
      currentPageName === "index"
        ? await client.getSingle("homepage")
        : await client.getByUID("navigationpage", currentPageName as string);

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

useSmoothScroll();

const playFade = () => {
  if (updateCount.value === 0) {
    const children = [
      ...document.body.querySelectorAll(
        ".app > *:not(.emoji-banner) > *:not(.adoptions-group__container)"
      ),
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

    const adoptionsGroups = [
      ...document.body.querySelectorAll(".adoptions-group__container"),
    ];

    if (!isMobile() && !isSafari()) {
      adoptionsGroups.forEach((group) => {
        gsap.set(group, {
          opacity: 0,
        });
      });
    }

    updateCount.value += 1;

    if (route.path !== "/adoptions") {
      emits("animation-init-done");
    }
  }
};

onMounted(() => {
  playFade();

  nextTick(() => {
    // [...document.querySelectorAll(".adoptions-group")].forEach((group) =>
    //   group.addEventListener("scroll", ScrollTrigger.update)
    // );

    if (navigationMenu.value) {
      navigationMenuHeight.value = navigationMenu.value.$el.offsetHeight;
      const superapp = document.querySelector(
        ".superapp:has(.navigation-menu.--at-top):not(:has(.--chat-p))"
      ) as HTMLElement;
      if (superapp) {
        superapp.style.paddingTop = `${navigationMenuHeight.value}px`;
      }
    }
  });
});

onUpdated(() => {
  getPage();
  playFade();
  updateCount.value += 1;
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

watch(
  () => route.name,
  (newRoute, oldRoute) => {
    if (newRoute !== oldRoute) {
      playFade();
    }
  }
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

    h2 {
      font-size: calc((var(--base-ft-size) * 3));
    }

    h3 {
      font-size: calc((var(--base-ft-size) * 2));
    }
  }
}

@container nuxt (max-width: 699px) {
  .superapp:has(.navigation-menu.--at-top):not(:has(.--chat-p)) {
    padding-top: 10vh;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--black);
      width: 100%;
      height: 24vh;
      z-index: 0;
    }
  }

  .app {
    padding: var(--spacing-m);

    h1 {
      font-size: calc((var(--base-ft-size) * 3));
    }

    h2 {
      font-size: calc((var(--base-ft-size) * 2));
    }

    h3 {
      font-size: calc((var(--base-ft-size) * 1.2));
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

    h2 {
      font-size: calc((var(--base-ft-size) * 4));
    }

    h3 {
      font-size: calc((var(--base-ft-size) * 2));
    }
  }
}
</style>
