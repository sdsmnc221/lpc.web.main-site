<template>
  <div class="links w-dvw h-dvh bg-white">
    <div class="flex flex-row">
      <!-- Left side image grid -->
      <photo-grid-five :photo-grids="photoGrids"></photo-grid-five>

      <!-- Right side content -->
      <right-column-links
        :logo="logo"
        :page-title="pageTitle"
        :page-description="pageDescription"
        :links="links"
      ></right-column-links>
    </div>
  </div>
</template>

<script setup>
import PhotoGridFive from "~/components/UiLinks/PhotoGridFive.vue";
import RightColumnLinks from "~/components/UiLinks/RightColumnLinks.vue";

import useLinkstreeLayout from "../../composables/linkstreeLayout";

const { logo, photoGrids, pageTitle, pageDescription, links } =
  await useLinkstreeLayout();

definePageMeta({
  layout: "linkstree",
});
</script>

<style lang="scss">
@import "~/styles/linkstree";
</style>
