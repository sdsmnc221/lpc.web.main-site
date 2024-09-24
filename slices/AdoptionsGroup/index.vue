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

    <prismic-rich-text
      v-if="description"
      class="adoptions-group__description cl-black albert-sans-regular"
      :field="description"
    />

    <div
      class="adoptions-group__items"
      :class="{ '--special': isSpecialAdoptionsGroup }"
      v-if="itemsData?.length"
    >
      <cat-item
        v-for="cat in itemsData"
        :key="`adoptions-group-cat-${cat.id}`"
        v-bind="cat.data"
        :contact-info="contactInfo"
        :adoption-requirements="adoptionRequirements"
        :avatar-placeholder="avatarPlaceholder"
        :id="cat.id"
      ></cat-item>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";

import CatItem from "@/components/CatItem/index.vue";

const { client } = usePrismic();

const runtimeConfig = useRuntimeConfig();

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

const isSpecialAdoptionsGroup = computed(() =>
  props.slice.id.includes(runtimeConfig.public.SPECIAL_ADOPTIONS_GROUP)
);

const title = computed(() => primary.value?.title);

const contactInfo = computed(() => primary.value?.contactinfo);
const adoptionRequirements = computed(
  () => primary.value?.adoptionrequirements
);
const description = computed(() => primary.value?.description);

const { data: itemsData } = await useAsyncData(props.slice.id, async () => {
  const itemsId = primary.value?.catsgroup?.map((item) => item.catitem.id);

  const items = await client.getAllByIDs(itemsId);

  return items;
});

const { data: catAvatarPlaceholder } = await useAsyncData(
  "catAvatarPlaceholder",
  async () => client.getByID(primary.value.catavatarplaceholder.id)
);

const avatarPlaceholder = computed(
  () => catAvatarPlaceholder.value?.data?.image ?? null
);
</script>

<style lang="scss">
.adoptions-group {
  padding: var(--spacing-m);

  &__title {
    margin-bottom: var(--spacing-m);
  }

  &__description {
    width: 100%;

    & > * {
      margin-top: var(--spacing-m);
    }
  }

  &__items {
    margin-top: var(--spacing-l);
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    &.--special {
      .cat-item {
        margin: 0 calc((100% - 22% * 4) / 4);
        margin-top: var(--spacing-m);
      }
    }
  }
}

@container app (min-width: 700px) {
  .adoptions-group {
    &__items {
      &.--special {
        .cat-item {
          margin: 0 calc((100% - 20% * 4) / 4);
          margin-top: var(--spacing-l);
        }
      }
    }
  }
}

@container app (min-width: 1000px) {
  .adoptions-group {
    padding: 0 12vw;
    margin-top: calc(var(--spacing-l) * 2);
    margin-bottom: var(--spacing-l);
  }
}
</style>
