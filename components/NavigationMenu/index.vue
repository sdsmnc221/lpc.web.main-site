<template>
  <nav
    class="navigation-menu bg-black"
    :class="{ '--thin': thin }"
    v-if="links"
  >
    <a
      v-for="(link, index) in links"
      :key="`navigation-menu-link-${index}`"
      :href="`${link.linkitem.type === 'homepage' ? '/' : '/' + link.linkitem.uid}`"
      class="albert-sans-light size-16"
      :class="{
        '--current':
          route.name === 'index'
            ? link.linkitem.type === 'homepage'
            : link.linkitem.uid === route.name,
      }"
      >{{ link.linklabel }}</a
    >
  </nav>
</template>

<script setup lang="ts">
import { type Link } from "~/interfaces/Navigation";
import { ref } from "vue";

type Props = {
  links: Link[] | undefined;
};

const props = defineProps<Props>();

const route = useRoute();

const thin = ref(false);

onMounted(() => {
  nextTick(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY < window.innerHeight) {
        thin.value = false;
      } else {
        thin.value = true;
      }
    });
  });
});
</script>

<style lang="scss">
.navigation-menu {
  padding: var(--spacing-m);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  position: sticky;
  top: 0;
  z-index: 1;

  &.--thin {
    padding-top: var(--spacing-s);
    padding-bottom: 0;
    align-items: center;
    justify-content: center;
  }

  a {
    display: block;
    color: var(--white);
    text-decoration: none;
    width: 50%;
    cursor: pointer;
    margin-bottom: var(--spacing-s);

    &:nth-child(n) {
      text-align: left;
    }

    &:nth-child(2n) {
      text-align: right;
    }

    &.--current {
      font-weight: 600;
    }
  }
}

@container nuxt (max-width: 700px) {
  .navigation-menu {
    z-index: 0;
  }
}

@container nuxt (min-width: 700px) {
  .navigation-menu {
    flex-wrap: nowrap;

    a {
      width: 25%;
      text-align: center !important;

      &:first-child {
        text-align: left !important;
      }

      &:last-child {
        text-align: right !important;
      }
    }
  }
}
</style>
