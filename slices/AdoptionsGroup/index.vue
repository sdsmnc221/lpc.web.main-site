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
                catItem: formatCatItem({ cat, index }),
              })
          "
        ></cat-item>
      </div>
    </div>

    <Teleport to="body">
      <cat-sheet
        :open="defaultOpen"
        :cat-item="currentCatItem"
        :tint="randomTint"
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

import { isPC, randomHSLA } from "@/lib/helpers";

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
const randomTint = ref(randomHSLA());

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

const formatCatItem = ({ cat, index }) => {
  return {
    ...cat.data,
    index,
    id: cat.id,
    contactInfo: contactInfo.value,
    adoptionRequirements: adoptionRequirements.value,
    avatarPlaceholder: avatarPlaceholder.value,
  };
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
  () => defaultOpen.value,
  () => {
    if (defaultOpen.value) {
      window.lenis?.stop();
    } else {
      window.lenis?.start();
    }
  }
);

watch(
  () => router.currentRoute.value,
  (newRoute, oldRoute) => {
    randomTint.value = randomHSLA();

    if (!newRoute.query.id) {
      defaultOpen.value = false;
    } else {
      setTimeout(() => {
        if (itemsData.value) {
          const theCatIndex = itemsData.value?.findIndex(
            (cat) => cat.id === newRoute.query.id
          );

          const theCat = formatCatItem({
            cat: itemsData.value[theCatIndex],
            index: theCatIndex,
          });

          currentCatItem.value = theCat;

          defaultOpen.value = true;
        } else {
          router.push({
            name: router.currentRoute.value.name,
          });

          currentCatItem.value = null;
        }
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

const split = (el) => {
  nextTick(async () => {
    const Splitting = await import("splitting");
    console.log(Splitting);
    Splitting.default({
      /* target: String selector, Element, Array of Elements, or NodeList */
      target: el,
      /* by: String of the plugin name */
      by: "lines",
      /* key: Optional String to prefix the CSS variables */
      key: null,
    });
  });
};

const goParallax = (TL, containerWidth, windowWidth) => {
  gsap.to(textContent.value, {
    x: windowWidth * -0.032,
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
      x: windowWidth * 0.1,
      ease: "circ.in",
      scrollTrigger: {
        trigger: section.value,
        start: "top top",
        end: `+=${containerWidth * 3.2}`,
        scrub: true,
      },
    });
  }

  if (groupDescription.value?.$el) {
    gsap.to(groupDescription.value.$el, {
      x: windowWidth * 0.1,
      ease: "circ.in",
      scrollTrigger: {
        trigger: section.value,
        start: "top top",
        end: `+=${containerWidth * 2}`,
        scrub: true,
      },
    });

    split(groupDescription.value.$el);
    // groupDescription.value.$el.innerHTML = "";

    setTimeout(() => {
      const spans = [...groupDescription.value.$el.querySelectorAll(".word")];

      console.log(spans);

      // Create a separate timeline for spans animation
      const spansTL = gsap.timeline({});

      // Add span animations to the spans timeline
      spans.forEach((span, index) => {
        spansTL.to(span, {
          backgroundColor: "red",
          color: "black",
          scrollTrigger: {
            trigger: scrollContainer.value,
            containerAnimation: TL,
            start: `top+=${index * 20} top`,
            end: `top+=${(index + 2) * 20}px top`,
            scrub: true,
          },
          ease: "circ.out",
        });
      });

      // Link the spans timeline to the main timeline's pause point
      TL.add(spansTL, "pausePoint+=2%");
    }, 2400);
  }

  // Continue horizontal scroll after pause
  TL.to(
    scrollContainer.value,
    {
      x: -(containerWidth - windowWidth),
      ease: "sine.inOut",
      onStart: () => {
        console.log("Started horizontal scroll");
      },
    },
    "pausePoint+=120%"
  );

  catItems.value.forEach((item, itemIndex) => {
    const childrenNodes = [
      ...(item as HTMLElement).querySelectorAll(
        "button > *:not(.cat-item__explore)"
      ),
    ];

    const childTL = gsap.timeline({});

    childrenNodes.forEach((child, index) => {
      childTL.to(child, {
        y: 240 * (0.2 * (itemIndex + 1)), // Staggered parallax effect
        x: -32 * (0.2 * (itemIndex + 1)), // Staggered parallax effect
        ease: "sine.out",
        scrollTrigger: {
          trigger: child,
          start: `top top`,
          end: `top+=${containerWidth * (itemIndex + 1) * 0.72}px top`,
          scrub: 0.2,
          containerAnimation: TL,
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

    // const usingSmoothScroll = // !matchMedia("(hover: none)").matches

    const TL = gsap.timeline({
      scrollTrigger: {
        trigger: section.value,
        start: "top top",
        end: `+=${containerWidth + windowWidth}`,
        scrub: true,
        pin: true,
        pinnedContainer: section.value,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        ...(isPC() ? { pinType: "transform" } : {}),
        onUpdate: (self) => {
          // Ensure we're not exceeding the bounds of the animation
          if (self.progress < 0) self.progress = 0;
          if (self.progress > 1) self.progress = 1;
        },
      },
    });

    // Main horizontal scroll animation
    // Scroll to -10
    TL.to(container, {
      // x: -(containerWidth - windowWidth),
      x: -10,
    });

    TL.add("pausePoint");

    // Parallax effect
    goParallax(TL, containerWidth, windowWidth);

    emits("gsap-init-done");
  }
};

const cleanupScrollTrigger = () => {
  // ScrollTrigger.getAll().forEach((st) => st.kill());
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
      margin-top: var(--spacing-s);
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
  .app {
    .adoptions-group {
      margin-top: calc(var(--spacing-l) * 2);
      margin-bottom: var(--spacing-l);

      &__title {
        position: absolute;
        top: 0;
        padding-right: 4.8vw;

        h3 {
          font-size: calc((var(--base-ft-size) * 6));
        }
      }

      &__description {
        position: absolute;
        bottom: 10vh;

        * {
          @include ft-s(20);
          color: var(--gray);
        }

        em {
          font-weight: bold;
          display: inline-block;
          @include ft-s(large);
          margin-bottom: var(--spacing-m);
          padding-right: 4.8vw;
        }
      }
    }
  }
}
</style>
