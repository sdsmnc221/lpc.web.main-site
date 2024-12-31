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

const route = useRoute();

const { logo, photoGrids, pageTitle, pageDescription, links } =
  await useLinkstreeLayout(route.params.id);

definePageMeta({
  layout: "linkstree",
});
</script>

<style lang="scss">
.app:has(.links) {
  padding: 0;

  .links {
    padding: 0;

    p {
      font-size: 0.72rem;
      margin-bottom: var(--spacing-s);
    }

    h1 {
      font-size: 1.4rem;
      transform: translateY(8px);
    }

    nav a {
      @extend .gloock-regular;
      letter-spacing: 1px;
      font-size: 0.64rem;
      text-transform: uppercase;
    }

    img {
      border-radius: 0;
    }

    .logo {
      transform: translateY(5px);
      pointer-events: none;
    }
  }
}

@media screen and (min-width: 768px) {
  .app:has(.links) {
    .links {
      p {
        @include ft-s(16);
      }

      h1 {
        @include ft-s(xlarge);
        transform: translateY(0);
      }

      nav a {
        @include ft-s(16);
      }
    }
  }
}
</style>
