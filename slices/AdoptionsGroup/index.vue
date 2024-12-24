<template>
  <section
    ref="section"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="adoptions-group hide-scrollbar bg-white"
  >
    <div ref="scrollContainer" class="adoptions-group__container">
      <div ref="textContent" class="adoptions-group__text-content">
        <prismic-rich-text
          ref="groupTitle"
          class="adoptions-group__title"
          :field="title"
        />

        <div
          class="adoptions-group__description"
          ref="groupDescription"
          v-if="description"
        >
          <prismic-rich-text
            v-for="(text, index) in description"
            :key="`description-${slice.id}-${index}`"
            :data-index="index"
            :field="text.paragraph"
          />

          <img v-if="image" :src="image.url" />
        </div>
      </div>

      <div class="adoptions-group__items" v-if="itemsData?.length">
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

const image = computed(() => primary.value?.image);
console.log(primary.value);

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
  return cat?.data
    ? {
        ...cat.data,
        index,
        id: cat.id,
        contactInfo: contactInfo.value,
        adoptionRequirements: adoptionRequirements.value,
        avatarPlaceholder: avatarPlaceholder.value,
      }
    : {};
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
    setTimeout(() => {
      if (defaultOpen.value) {
        window.lenis?.stop();
      } else {
        window.lenis?.start();
      }
    }, 480);
  },
  { immediate: true }
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

          if (theCatIndex !== -1) {
            const theCat = formatCatItem({
              cat: itemsData.value[theCatIndex],
              index: theCatIndex,
            });

            currentCatItem.value = theCat;

            defaultOpen.value = true;
          }
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

const split = (el, mode = "lines") => {
  nextTick(async () => {
    const Splitting = await import("splitting");

    Splitting.default({
      /* target: String selector, Element, Array of Elements, or NodeList */
      target: [...el.querySelectorAll(":scope > *")],
      /* by: String of the plugin name */
      by: mode,
      /* key: Optional String to prefix the CSS variables */
      key: null,
    });
  });
};

const playScroll = (TL, containerWidth, windowWidth) => {
  if (groupTitle.value?.$el) {
    split(groupTitle.value.$el, "words");

    setTimeout(() => {
      const titleTL = gsap.timeline({});

      const words = [...groupTitle.value.$el.querySelectorAll(".word")];

      words.forEach((word, index) => {
        titleTL.fromTo(
          word,
          {
            y: index * -24,
            x: index * (windowWidth / 4) * (index % 2 === 0) ? 1 : -1,
            filter: "blur(4px)",
            opacity: 0,
            color: "var(--gray)",
            willChange: "transform, filter, opacity, color",
          },
          {
            y: 0,
            x: 0,
            filter: "blur(0)",
            opacity: 1,
            color: "var(--black)",
            ease: "power4.inOut",
            delay: 0.1 + index * 0.2,
            scrollTrigger: {
              containerAnimation: TL,
              trigger: groupTitle.value.$el,
              start: "top top",
              end: `top+=${(index + 3) * 64}px top`,
              scrub: true,
            },
          }
        );
      });

      TL.add(titleTL, 0);
    }, 2400);
  }

  if (groupDescription.value) {
    split(groupDescription.value);
    setTimeout(() => {
      const spans = [...groupDescription.value.querySelectorAll(".word")];

      // Create a separate timeline for spans animation
      const spansTL = gsap.timeline({});
      // Add span animations to the spans timeline
      spans.forEach((span, index) => {
        spansTL.fromTo(
          span,
          {
            y: index * 8,
            // x: index * (windowWidth / 4) * (index % 2 === 0) ? 1 : -1,
            opacity: 0,
            willChange: "transform, filter, opacity",
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            stagger: 0.16 * index,
            duration: 2,
            scrollTrigger: {
              containerAnimation: TL,
              trigger: groupDescription.value.parentNode,
              start: "top top",
            },
            ease: "power4",
          }
        );
      });

      // Link the spans timeline to the main timeline's pause point
      TL.add(spansTL, 0);
    }, 2400);
  }

  TL.to(
    scrollContainer.value,
    {
      x: -(containerWidth - windowWidth),
      ease: "sine.inOut",
    },
    "pausePoint+=72%"
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
        y: 240 * (0.2 * (itemIndex + 1)),
        x: -32 * (0.2 * (itemIndex + 1)),
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

    // Main horizontal scroll animation

    const TL = gsap.timeline({
      scrollTrigger: {
        trigger: section.value,
        start: "top top",
        end: `+=${containerWidth + windowWidth + windowWidth / 4}`,
        scrub: 0.72,
        pin: true,
        pinnedContainer: section.value,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        ...(isPC() ? { pinType: "transform" } : {}),
        // pinType: "transform", //debug
        // markers: true, // debug
        onUpdate: (self) => {
          // Ensure we're not exceeding the bounds of the animation
          if (self.progress < 0) self.progress = 0;
          if (self.progress > 1) self.progress = 1;
        },
      },
    });

    TL.to(
      scrollContainer.value,
      {
        x: -24,
        ease: "sine.inOut",
      },
      0
    );

    TL.add("pausePoint");

    playScroll(TL, containerWidth, windowWidth);

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
  height: 100vh;
  overflow: hidden;
  overflow-x: scroll;
  display: flex;
  padding: var(--spacing-m);

  &__title {
    margin-bottom: var(--spacing-m);

    .word {
      @extend .gloock-regular;
    }
  }

  &__container {
    height: 100%;
    display: flex;
  }

  &__items {
    display: flex;
    height: 100%;
    margin-top: var(--spacing-l);

    & > * {
      margin-right: 6vw;
      margin-left: 6vw;
    }
  }

  &__title {
    text-transform: lowercase;
  }

  &__text-content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    [data-index="0"] {
      --index: 0;
    }
    [data-index="1"] {
      --index: 1;
    }
    [data-index="2"] {
      --index: 2;
    }
    [data-index="3"] {
      --index: 3;
    }
    [data-index="4"] {
      --index: 4;
    }

    .word {
      color: var(--black);
    }
  }

  &__description {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    gap: 4.8vw;

    flex: 1;

    width: 100%;

    & > *:not(:first-child) {
      margin-top: var(--spacing-s);
    }

    img {
      display: inline-block;
      position: absolute;
      bottom: 8vh;
      left: 4vw;
      transform: scale(0.98);
      border-radius: 0;
      z-index: -1;
    }

    p {
      margin-top: var(--spacing-m);
    }

    strong,
    em {
      * {
        font-weight: bold;
      }
    }

    h4 {
      margin-bottom: 2.4vh;

      * {
        font-weight: bold;
        @include ft-s(medium);
        line-height: 2rem;
      }
    }
  }

  li {
    list-style-type: none;
    margin-top: 8px;

    .word {
      position: relative;

      &::after {
        display: block;
        content: "";
        width: 100%;
        height: 2px;
        background: var(--gray);
      }
    }
  }
}

@container app (max-width: 699px) {
  .adoptions-group {
    &__container {
      height: 100%;
    }

    &__title {
      transform: translateY(-10vh);
    }

    &__text-content {
      width: auto;
      display: flex;
      flex-direction: row;

      & > * {
        &:first-child {
          display: flex;
          flex-direction: column;
          width: 100vw;
          padding: 2vw;
          justify-content: center;
          text-align: center;

          * {
            @include ft-s(medium);
          }
        }
      }
    }

    &__description {
      & > *:not(img):not(.adoptions-group__items) {
        padding: 8vw;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 8vw;
        width: 100vw;
        min-height: 100vh;

        &:has(img) {
          padding-top: 12vh;
        }
      }

      img {
        height: auto !important;
        left: 0 !important;
        bottom: 7.2vh;
        transform: scale(1) !important;
      }

      strong {
        &:not(:has(em)) {
          margin-top: 0.4vh;
          margin-bottom: 0.4vh;
        }
      }

      [data-index="1"] {
        transform: translateY(7.2vh);
      }
    }

    &__title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &__items {
      margin-left: 24vw;

      & > *:not(:first-child) {
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
        padding: 4.8vw;
        padding-top: 1.2vw;

        h3 {
          font-size: calc((var(--base-ft-size) * 6.4));
        }
      }

      &__text-content {
        width: 100vw;
        max-height: 100vh;
        padding: 0 6vh;
        margin: 0;
      }

      &__description {
        padding-left: 2.4vw;
        padding-right: 2.4vw;
        padding-bottom: 16vh;

        [data-index] {
          width: 100vw;
          margin-bottom: calc(var(--spacing-l) * 2 * var(--index_, 2));
        }

        [data-index="1"],
        [data-index="3"],
        [data-index="5"] {
          --index_: calc((var(--index) +1) * 2.4 + var(--index));
        }
      }

      &__text-content {
        p * {
          @include ft-s(20);
        }
      }

      img {
        top: 0;
        left: 45.5vw;
      }
    }
  }
}

@media screen and (min-width: 768px) and (orientation: landscape) {
  .app {
    .adoptions-group {
      margin-top: calc(var(--spacing-l) * 2);
      margin-bottom: var(--spacing-l);

      &__title {
        position: absolute;
        top: 0;
        padding: 4.8vw;
        padding-top: 1.2vw;

        h3 {
          font-size: calc((var(--base-ft-size) * 4.8));
        }
      }

      &__text-content {
        width: 100vw;
        max-height: 100vh;
        padding: 0 7.2vh;
        margin: 0;
      }

      &__description {
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 8vh;

        & > * {
          width: 40vw !important;
        }

        [data-index] {
          width: 100vw;
          margin-bottom: calc(var(--spacing-l) * -0.32 * var(--index_, 2));
        }

        [data-index="1"],
        [data-index="3"],
        [data-index="5"] {
          --index_: calc((var(--index) +1) * 2 + var(--index));
        }
      }

      img {
        transform: scale(1) translateX(-8%);
      }

      &__text-content {
        p * {
          @include ft-s(16);
        }
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 999px) and (orientation: portrait) {
  .adoptions-group {
    &__container {
      height: 100%;
    }

    &__text-content {
      width: auto;
      display: flex;
      flex-direction: row;

      & > * {
        &:first-child {
          display: flex;
          flex-direction: column;
          width: 100vw;
          padding: 2vw;
          justify-content: center;
          text-align: center;

          * {
            @include ft-s(xlarge);
          }
        }
      }
    }

    &__description {
      & > *:not(img):not(.adoptions-group__items) {
        padding: 8vw;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 8vw;
        width: 100vw;
        min-height: 100vh;

        &:has(img) {
          padding-top: 12vh;
        }

        p {
          padding: 0 1.2vw;

          * {
            @include ft-s(20);
          }
        }
      }

      img {
        width: 100vw;
        height: auto;
        left: 0;
        top: 0;
        transform: scale(1);
      }

      strong {
        &:not(:has(em)) {
          margin-top: 0.4vh;
          margin-bottom: 0.4vh;
        }
      }

      [data-index="1"] {
        transform: translateY(7.2vh);
      }
    }

    &__title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &__items {
      margin-left: 24vw;

      & > *:not(:first-child) {
        margin-right: 6vh;
        margin-left: 6vh;
      }
    }
  }
}
</style>
