<template>
  <nav
    class="navigation-menu"
    ref="node"
    :class="{ '--thin': thin, '--sticky': sticky, 'bg-black': black }"
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

const sticky = ref(false);

const black = ref(true);

const node = ref(null);

const { y } = useWindowScroll();

onMounted(() => {
  nextTick(() => {
    if (window.innerWidth < 699 && node.value) {
      if (window.scrollY < window.innerHeight / 8) {
        node.value.style.zIndex = 0;
      } else {
        node.value.style.zIndex = -1;
      }
    }

    window.addEventListener("scroll", (e) => {
      if (window.innerWidth < 699 && node.value) {
        if (window.scrollY < window.innerHeight / 8) {
          node.value.style.zIndex = 0;
        } else {
          node.value.style.zIndex = -1;
        }
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
        sticky.value = oldY < newY && newY > 240;
        black.value = newY < 240 || (oldY < newY && newY > 240);
      } else {
        if (document && document.querySelector) {
          document.querySelector("main.app")?.classList.add("--gap");
        }
      }
    });
  },
  { immediate: true, flush: "sync" }
);
</script>

<style lang="scss">
@media screen and (min-width: 1000px) {
  #__nuxt:has(.navigation-menu.--thin.--sticky) {
    main {
      margin-top: calc(var(--spacing-l) * 2);

      &.--gap {
        margin-top: 0;
      }
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

  position: sticky;
  top: 0;
  z-index: 1;

  transition: all 0.64s ease-in-out;

  &.--sticky {
    position: fixed;
    width: 100vw;
  }

  &.--thin {
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
    z-index: -1;
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
