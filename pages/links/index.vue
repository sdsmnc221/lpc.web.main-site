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

const emits = defineEmits(["animation-init-done"]);

const { logo, photoGrids, pageTitle, pageDescription, links, meta } =
  await useLinkstreeLayout();

definePageMeta({
  layout: "linkstree",
});

watch(
  () => meta.value,
  (newMetaDetails) => {
    useSeoMeta({
      title: newMetaDetails.title,
      ogTitle: newMetaDetails.title,
      description: newMetaDetails.description,
      ogDescription: newMetaDetails.description,
      ogImage: newMetaDetails.image,
      twitterImage: newMetaDetails.image,
    });
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  nextTick(() => emits("animation-init-done"));
});
</script>

<style lang="scss">
@import "~/styles/linkstree";

#__nuxt:has(.links) {
  .navigation-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
  }
}
</style>
