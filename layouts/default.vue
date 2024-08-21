<template>
  <div>
    <navigation-menu :links="links"></navigation-menu>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import NavigationMenu from "@/components/NavigationMenu/index.vue";

const { client } = usePrismic();

const { data: navigation } = await useAsyncData("navigation", () =>
  client.getSingle("navigationmenu")
);

const links = computed(() => navigation.value?.data.navigationlink);
</script>
