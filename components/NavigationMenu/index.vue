<template>
  <nav
    class="navigation-menu transition-all"
    ref="node"
    :class="{ '--thin': thin, 'bg-black': black }"
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
import { useWindowScroll } from "@vueuse/core";

type Props = {
  links: Link[] | undefined;
};

const props = defineProps<Props>();

const route = useRoute();

const thin = ref(false);

const black = ref(true);

const node = ref(null);

const { y } = useWindowScroll();

onMounted(() => {
  nextTick(() => {
    if (window.scrollY <= window.innerHeight / 8) {
      node.value?.classList?.add("--at-top");
    } else {
      node.value?.classList?.remove("--at-top");
    }

    window.addEventListener("scroll", (e) => {
      if (window.scrollY <= window.innerHeight / 8) {
        node.value?.classList?.add("--at-top");
      } else {
        node.value?.classList?.remove("--at-top");
      }
    });
  });
});

watch(
  () => y.value,
  (oldY, newY) => {
    nextTick(() => {
      if (newY && oldY) {
        thin.value = oldY < newY && newY > 240;

        black.value = newY < 240 || (oldY < newY && newY > 240);
      } else {
        return;
      }
    });
  },
  { immediate: true, flush: "sync" }
);
</script>

<style lang="scss">
@media screen and (min-width: 1000px) {
  #__nuxt:has(.navigation-menu.--thin) {
    main {
      transition: margin-top ease-in-out 0.64s;
    }
  }
}

.navigation-menu {
  padding: 0 var(--spacing-m);
  padding-top: var(--spacing-s);
  padding-bottom: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100vw;

  position: fixed;
  top: 0;
  z-index: 10;

  transition: all 0.64s ease-in-out;

  &.--at-top {
    position: fixed;
    z-index: 10;
  }

  &:not(.--at-top) {
    top: -20vh;
  }

  &.--thin {
    top: 0;
    padding-top: var(--spacing-s);
    padding-bottom: 0;
    align-items: center;
    justify-content: center;
    z-index: 3;
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
    &:not(.--at-top) {
      top: -20vh;
      z-index: -1;
    }
  }
}

@container nuxt (min-width: 700px) {
  .navigation-menu {
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;

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
