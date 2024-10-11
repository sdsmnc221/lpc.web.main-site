<template>
  <section
    ref="section"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="adoptions-group bg-white"
  >
    <div ref="scrollContainer" class="adoptions-group__container">
      <div class="adoptions-group__items" v-if="itemsData?.length">
        <div ref="textContent" class="adoptions-group__text-content">
          <prismic-rich-text
            ref="groupTitle"
            class="adoptions-group__title cl-black gloock-regular"
            :field="title"
          />

          <prismic-rich-text
            v-if="description"
            ref="groupDescription"
            class="adoptions-group__description cl-black albert-sans-regular"
            :field="description"
          />
        </div>

        <cat-item
          v-for="(cat, index) in itemsData"
          :key="`adoptions-group-cat-${cat.id}`"
          v-bind="cat.data"
          :contact-info="contactInfo"
          :adoption-requirements="adoptionRequirements"
          :avatar-placeholder="avatarPlaceholder"
          :id="cat.id"
          :index="index"
          @update:open-item="
            ({ opened }) =>
              onOpenItem({
                opened,
                catItem: {
                  ...cat.data,
                  id: cat.id,
                  contactInfo,
                  adoptionRequirements,
                  avatarPlaceholder,
                },
              })
          "
        ></cat-item>
      </div>
    </div>

    <Teleport to="body">
      <cat-sheet
        :open="defaultOpen"
        :cat-item="currentCatItem"
        @update:open-sheet="({ opened }) => onOpenSheet({ opened })"
      ></cat-sheet>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";
import type { CatInfo } from "~/interfaces/Cat";

import CatItem from "@/components/CatItem/index.vue";
import CatSheet from "@/components/CatSheet/index.vue";

const { client } = usePrismic();

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { isPC } from "@/lib/helpers";

const router = useRouter();

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

const currentCatItem = ref<CatInfo | null>(null);

const defaultOpen = ref(false);

const commonOpen = (opened: boolean, catItem = null) => {
  defaultOpen.value = opened;
  if (opened) {
    if (catItem) {
      currentCatItem.value = catItem;

      router.push({
        name: router.currentRoute.value.name,
        query: { id: catItem.id },
      });
    }
  } else {
    router.push({
      name: router.currentRoute.value.name,
    });

    currentCatItem.value = null;
  }
};

const onOpenItem = (details) => {
  const { opened, catItem } = details;

  commonOpen(opened, catItem);
};

const onOpenSheet = (details) => {
  const { opened } = details;

  commonOpen(opened);
};

watch(
  () => router.currentRoute.value,
  (newRoute, oldRoute) => {
    if (!newRoute.query.id) {
      defaultOpen.value = false;
    } else {
      setTimeout(() => {
        defaultOpen.value = currentCatItem.value?.id === newRoute.query.id;
      }, 320);
    }
  },
  { immediate: true, deep: true }
);

/** GSAP */
gsap.registerPlugin(ScrollTrigger);

const emits = defineEmits(["gsap-init-done"]);

const scrollContainer = ref(null);
const section = ref(null);

const textContent = ref(null);
const groupTitle = ref(null);
const groupDescription = ref(null);
const catItems = ref([]);

const goParallax = (containerWidth, windowWidth) => {
  gsap.to(textContent.value, {
    x: windowWidth * 0.05,
    ease: "circ.out",
    scrollTrigger: {
      trigger: section.value,
      start: "top top",
      end: `+=${containerWidth}`,
      scrub: true,
    },
  });

  if (groupTitle.value?.$el) {
    gsap.to(groupTitle.value.$el, {
      x: windowWidth * 0.2,
      ease: "circ.in",
      scrollTrigger: {
        trigger: section.value,
        start: "top top",
        end: `+=${containerWidth}`,
        scrub: true,
      },
    });
  }

  if (groupDescription.value?.$el) {
    gsap.to(groupDescription.value.$el, {
      x: windowWidth * 0.05,
      ease: "circ.out",
      scrollTrigger: {
        trigger: section.value,
        start: "top top",
        end: `+=${containerWidth}`,
        scrub: true,
      },
    });
  }

  catItems.value.forEach((item, itemIndex) => {
    const childrenNodes = [
      ...(item as HTMLElement).querySelectorAll(
        "button > *:not(.cat-item__explore)"
      ),
    ];

    childrenNodes.forEach((child, index) => {
      gsap.to(child, {
        y: 32 * (index + 1), // Staggered parallax effect
        x: 32 * (0.02 * (index + 1) * (itemIndex + 1)), // Staggered parallax effect
        ease: "sine.out",
        scrollTrigger: {
          trigger: section.value,
          start: "top top",
          end: `+=${containerWidth}`,
          scrub: true,
        },
      });
    });
  });
};

const initHorizontalScroll = () => {
  const container = scrollContainer.value;

  if (container) {
    catItems.value = [...container.querySelectorAll(".cat-item")];

    const containerWidth = (container as HTMLElement).scrollWidth;
    const windowWidth = window.innerWidth;

    const usingSmoothScroll =
      // !matchMedia("(hover: none)").matches

      // Main horizontal scroll animation
      gsap.to(container, {
        x: -(containerWidth - windowWidth),
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: section.value,
          start: "top top",
          end: `+=${containerWidth}`,
          scrub: true,
          pin: true,
          pinnedContainer: section.value,
          // pinType: "fixed", //usingSmoothScroll ? "transform" : "fixed",
          // pinReparent: true,
          ...(isPC() ? { pinType: "transform" } : {}),

          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

    // Parallax effect
    goParallax(containerWidth, windowWidth);

    emits("gsap-init-done");
  }
};

const cleanupScrollTrigger = () => {
  ScrollTrigger.getAll().forEach((st) => st.kill());
};

onMounted(() => {
  nextTick(() => {
    initHorizontalScroll();
  });
});

onUnmounted(() => {
  cleanupScrollTrigger();
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
