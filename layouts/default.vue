<template>
  <div>
    <navigation-menu :links="links"></navigation-menu>
    <slot />
    <footer-menu
      v-if="footer && footer.data"
      v-bind="footer.data"
    ></footer-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import NavigationMenu from "@/components/NavigationMenu/index.vue";
import FooterMenu from "@/components/FooterMenu/index.vue";

const { client } = usePrismic();

const { data: navigation } = await useAsyncData("navigation", () =>
  client.getSingle("navigationmenu")
);
const links = computed(() => navigation.value?.data.navigationlink);

const { data: footer } = await useAsyncData("footer", () =>
  client.getSingle("footermenu")
);

onMounted(() => console.log(footer.value));
</script>
