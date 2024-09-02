<template>
  <div>
    <accordion-navigation :links="links"></accordion-navigation>

    <navigation-menu :links="links"></navigation-menu>

    <main class="app" :class="`--${route.name as string}`">
      <slot />
    </main>

    <footer-menu v-if="footer && footer.data" v-bind="footer.data">
      <template v-if="popoverBanner" #popover-banner>
        <popover-banner v-bind="popoverBanner"></popover-banner>
      </template>
    </footer-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import AccordionNavigation from "@/components/AccordionNavigation/index.vue";
import NavigationMenu from "@/components/NavigationMenu/index.vue";
import FooterMenu from "@/components/FooterMenu/index.vue";
import PopoverBanner from "@/components/PopoverBanner/index.vue";

const route = useRoute();

const { client } = usePrismic();

const { data: popoverBanner } = await useAsyncData(
  "popoverBanner",
  async () => {
    const { data: defaultLayout } = await client.getByUID(
      "pagelayout",
      "default-layout"
    );
    const { popoverbanner } = defaultLayout;

    if (popoverbanner && popoverbanner.id) {
      const { data: pbData } = await client.getByID(popoverbanner.id);

      return pbData;
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
</script>
