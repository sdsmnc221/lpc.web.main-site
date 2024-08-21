<template>
  <nav class="navigation-menu bg-black" v-if="links">
    <a
      v-for="(link, index) in links"
      :key="`navigation-menu-link-${index}`"
      :href="`${link.linkitem.type === 'homepage' ? '/' : '/' + link.linkitem.uid}`"
      class="albert-sans-light size-16"
      >{{ link.linklabel }}</a
    >
  </nav>
</template>

<script setup lang="ts">
type LinkItem = {
  id: string;
  type: string;
  tags: string[];
  lang: string;
  slug: string;
  first_publication_date: string;
  last_publication_date: string;
  link_type: string;
  isBroken: boolean;
  uid?: string;
};

type Link = {
  linkitem: LinkItem;
  linklabel: string;
};

type Props = {
  links: Link[] | undefined;
};

const props = defineProps<Props>();
</script>

<style lang="scss">
.navigation-menu {
  padding: var(--spacing-m);
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

@container nuxt (min-width: 768px) {
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
