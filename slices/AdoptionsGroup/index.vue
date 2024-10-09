<template>
  <section
    ref="section"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="adoptions-group bg-white"
  >
    <div ref="scrollContainer" class="adoptions-group__container">
      <div
        class="adoptions-group__items"
        :class="{ '--special': isSpecialAdoptionsGroup }"
        v-if="itemsData?.length"
      >
        <div class="adoptions-group__text-content">
          <prismic-rich-text
            class="adoptions-group__title cl-black gloock-regular"
            :field="title"
          />

          <prismic-rich-text
            v-if="description"
            class="adoptions-group__description cl-black albert-sans-regular"
            :field="description"
          />
        </div>

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
    </div>
  </section>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";

import CatItem from "@/components/CatItem/index.vue";

const { client } = usePrismic();

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);

const scrollContainer = ref(null);
const section = ref(null);

const initHorizontalScroll = () => {
  const container = scrollContainer.value;
  if (container) {
    const containerWidth = (container as HTMLElement).scrollWidth;
    const windowWidth = window.innerWidth;
    const GAP = window.innerWidth / 8;

    gsap.to(container, {
      x: -(containerWidth - windowWidth),
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: section.value,
        start: "top top",
        end: `+=${containerWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }
};

onMounted(() => {
  nextTick(() => {
    initHorizontalScroll();
  });
});
</script>

<style lang="scss">
.adoptions-group {
  padding: var(--spacing-m);

  &__title {
    margin-bottom: var(--spacing-m);
  }

  &__description {
    width: 100%;

    & > *:not(:first-child) {
      margin-top: var(--spacing-m);
    }
  }

  &__items {
    margin-top: var(--spacing-l);
  }
}

.adoptions-group {
  height: 100vh;
  overflow: hidden;
  overflow-x: scroll;
  display: flex;

  &__container {
    height: 100%;
  }

  &__items {
    display: flex;
    height: 100%;

    & > * {
      margin-right: 6vw;
      margin-left: 6vw;
    }
  }

  &__text-content {
    width: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

@container app (max-width: 699px) {
  .adoptions-group {
    &__container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    &__text-content {
      width: auto;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      & > * {
        width: 100vw;
        padding: 8vw;

        &:first-child {
          * {
            @include ft-s(large);
          }
        }
      }
    }

    &__items {
      & > * {
        margin-right: 6vh;
        margin-left: 6vh;
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
