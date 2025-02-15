<template>
  <div ref="node" class="accordion-navigation" :class="{ '--hidden': hidden }">
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger class="accordion-navigation__current-pages">{{
          currentPage.linklabel
        }}</AccordionTrigger>
        <AccordionContent class="accordion-navigation__pages">
          <NuxtLink
            v-for="(link, index) in links"
            :key="`navigation-menu-link-${index}`"
            :to="`${link.linkitem.type === 'homepage' ? '/' : '/' + link.linkitem.uid}`"
            class="link albert-sans-light size-16"
            >{{ link.linklabel }}</NuxtLink
          >
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { computed, ref } from "vue";
import { type Link } from "~/interfaces/Navigation";
import { useWindowScroll } from "@vueuse/core";

type Props = {
  links: Link[] | undefined;
};

const props = defineProps<Props>();

const route = useRoute();

const { y } = useWindowScroll();

const currentPage = computed(() => {
  const { name: page } = route;
  return (
    props.links?.find((link) =>
      page === "index"
        ? link.linkitem?.type === "homepage"
        : link.linkitem?.uid === page
    ) ?? {
      linklabel: "Accueil",
      linkhref: "/",
    }
  );
});

const node = ref(null);
const hidden = ref(true);

watch(
  () => y.value,
  (oldY, newY) => {
    hidden.value = oldY > newY || newY < window.innerHeight;
  }
);
</script>

<style lang="scss">
.accordion-navigation {
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 99;
  display: block;
  transition: all ease-in-out 0.64s;

  background-color: var(--black);

  * {
    color: var(--white);
  }

  &.--hidden {
    opacity: 0;
    pointer-events: none;
    top: -20vh;
  }

  & > div {
    button {
      margin-left: var(--spacing-s);
      justify-content: flex-start;
      gap: 8px;
      text-decoration: none;

      font-size: 24px;
      font-family: "Albert Sans", sans-serif;
      font-optical-sizing: auto;
      font-weight: 300;
      font-style: normal;

      &.hover\:underline:hover {
        text-decoration: none;
      }
    }
  }

  &__pages {
    padding: var(--spacing-s);
    padding-top: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

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
    }
  }
}

@container nuxt (min-width: 700px) {
  .accordion-navigation {
    display: none;
    visibility: hidden;
  }
}
</style>
