<template>
  <nav
    class="navigation-menu bg-black"
    ref="node"
    :class="{ '--thin': thin }"
    v-if="links"
  >
    <NuxtLink
      v-for="(link, index) in links"
      :key="`navigation-menu-link-${link.linkitem?.id}-${index}`"
      :to="`${link.linkitem.type === 'homepage' ? '/' : '/' + link.linkitem.uid}`"
      class="albert-sans-light size-16"
      :class="{
        '--current':
          route.name === 'index'
            ? link.linkitem.type === 'homepage'
            : link.linkitem.uid === route.name,
      }"
    >
      {{ link.linklabel }}
    </NuxtLink>
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

const node = ref(null);

onMounted(() => {
  nextTick(() => {
    if (window.innerWidth < 699 && node.value) {
      if (window.scrollY < window.innerHeight / 8) {
        node.value.style.zIndex = 0;
      } else {
        node.value.style.zIndex = -1;
      }
    }

    window.addEventListener("scroll", () => {
      if (window.innerWidth < 699 && node.value) {
        if (window.scrollY < window.innerHeight / 8) {
          node.value.style.zIndex = 0;
        } else {
          node.value.style.zIndex = -1;
        }
      }

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
  padding: 0 var(--spacing-m);
  padding-top: var(--spacing-s);
  padding-bottom: 0;
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

@container nuxt (max-width: 699px) {
  .navigation-menu {
    z-index: -1;
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
