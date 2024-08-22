<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="adoptions-group bg-white"
  >
    <prismic-rich-text
      class="adoptions-group__title cl-black gloock-regular"
      :field="title"
    />

    <div class="adoptions-group__items" v-if="itemsData?.length">
      <cat-item
        v-for="cat in itemsData"
        :key="`adoptions-group-cat-${cat.id}`"
        v-bind="cat.data"
        :contact-info="contactInfo"
        :adoption-requirements="adoptionRequirements"
      ></cat-item>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";

import CatItem from "@/components/CatItem/index.vue";

const { client } = usePrismic();

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.AdoptionsGroupSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const primary = computed(() => props.slice.primary);
const title = computed(() => primary.value?.title);
const contactInfo = computed(() => primary.value?.contactinfo);
const adoptionRequirements = computed(
  () => primary.value?.adoptionrequirements
);

const { data: itemsData } = await useAsyncData(props.slice.id, async () => {
  const itemsId = primary.value?.catsgroup?.map((item) => item.catitem.id);

  const items = await client.getAllByIDs(itemsId);

  return items;
});
</script>

<style lang="scss">
@import "@/styles/imports";

.adoptions-group {
  padding: var(--spacing-m);

  &__title {
    margin-bottom: var(--spacing-m);
    * {
      font-size: calc((var(--base-ft-size) * 3));
    }
  }

  &__items {
    margin-top: var(--spacing-l);
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}

@container app (min-width: 768px) {
  .adoptions-group {
    padding: var(--spacing-l);
  }
}
</style>
