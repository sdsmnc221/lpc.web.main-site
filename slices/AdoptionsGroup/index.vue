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
          class="adoptions-group__title mt-4"
          :field="title"
        />

        <safari-scroll-indicator
          v-if="isDoScrollDisabled"
        ></safari-scroll-indicator>

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
          ref="itemsDataDom"
          :key="`adoptions-group-cat-${cat.id}`"
          v-bind="cat.data"
          :contact-info="contactInfo"
          :adoption-requirements="adoptionRequirements"
          :avatar-placeholder="avatarPlaceholder"
          :id="cat.id"
          :index="index"
          :default-open="defaultOpen && currentCatItem?.index === index"
          :tint="randomTint"
          @update:open-item="
            ({ opened, contentItem }) =>
              onOpenItem({
                opened,
                catItem: formatCatItem({ cat, index }),
                contentItem,
                itemIndex: index,
                groupIndex,
              })
          "
        ></cat-item>
      </div>
    </div>

    <Teleport to="body">
      <cat-sheet
        ref="catSheet"
        :open="defaultOpen"
        :cat-item="currentCatItem"
        :tint="randomTint"
        :group-index="groupIndex"
        @update:open-sheet="({ opened }) => onOpenSheet({ opened })"
      ></cat-sheet>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";
import { type Content } from "@prismicio/client";
import type { CatInfo } from "~/interfaces/Cat";

import CatItem from "@/components/CatItem/index.vue";
import CatSheet from "@/components/CatSheetV2/index.vue";
import SafariScrollIndicator from "@/components/SafariScrollIndicator/index.vue";

const { client } = usePrismic();

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { isPC, isIOS, randomHSLA, isSafari, isMobile } from "@/lib/helpers";

const router = useRouter();
const route = useRoute();

const isMounted = ref(false);

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

const catContentItems = useTemplateRef("itemsDataDom");
const catSheet = ref(null);

const defaultOpen = ref(false);
const randomTint = ref(randomHSLA());

const isDoScrollDisabled = ref(false);

const groupIndex = computed(() => props.index);

const commonOpen = (opened: boolean, catItem = null) => {
  defaultOpen.value = opened;
  if (opened) {
    if (catItem) {
      currentCatItem.value = catItem;

      router.push({
        name: router.currentRoute.value.name,
        query: { uid: catItem.uid },
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
        uid: cat.uid,
        contactInfo: contactInfo.value,
        adoptionRequirements: adoptionRequirements.value,
        avatarPlaceholder: avatarPlaceholder.value,
      }
    : {};
};

const onOpenItem = (details) => {
  const { opened, catItem, contentItem, itemIndex, groupIndex } = details;

  commonOpen(opened, catItem);

  if (opened) {
    setTimeout(() => {
      catSheet.value.onOpenSheet(contentItem, itemIndex, groupIndex);
    }, 32);
  }
};

const onOpenSheet = (details) => {
  const { opened } = details;

  commonOpen(opened);
};

watch(
  () => defaultOpen.value,
  () => {
    if (isMounted.value && window?.lenis) {
      setTimeout(() => {
        if (defaultOpen.value) {
          window.lenis?.stop();
        } else {
          window.lenis?.start();
        }
      }, 480);
    }
  },
  { immediate: true }
);

watch(
  () => router.currentRoute.value,
  (newRoute, oldRoute) => {
    randomTint.value = randomHSLA();

    if (!newRoute.query.id && !newRoute.query.uid) {
      defaultOpen.value = false;
    } else {
      setTimeout(() => {
        if (itemsData.value) {
          const theCatIndex = itemsData.value?.findIndex(
            (cat) =>
              cat.id === newRoute.query.id || cat.uid === newRoute.query.uid
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

watch(
  () => currentCatItem.value,
  () => {
    if (currentCatItem.value) {
      useHead({
        titleTemplate: `%s - Adopter ${currentCatItem.value.catname}`,
      });
    } else {
      useHead({
        titleTemplate: `%s`,
      });
    }
  },
  { immediate: true, deep: true }
);

/** GSAP */

gsap.registerPlugin(ScrollTrigger);

const emits = defineEmits(["animation-init-done"]);

const scrollContainer = ref(null);
const section = ref(null);

const textContent = ref(null);
const groupTitle = ref(null);
const groupDescription = ref(null);
const catItems = ref([]);

// Variable pour gérer l'état des ScrollTriggers
let scrollTriggers = [];

// Fonction split supprimée car plus utilisée

const playScroll = (TL, containerWidth, windowWidth) => {
  // Animations du titre et de la description supprimées

  // S'assurer que le container est visible dès le début
  gsap.set(scrollContainer.value, { opacity: 1 });

  // Animation horizontale principale
  const mainST = ScrollTrigger.create({
    trigger: section.value,
    start: "top top",
    end: `+=${containerWidth + windowWidth + windowWidth / 4}`,
    scrub: 1, // Augmenté pour plus de fluidité
    pin: true,
    pinnedContainer: section.value,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    ...(isPC() || isSafari() ? { pinType: "transform" } : {}),
    onUpdate: (self) => {
      const progress = self.progress;
      const maxTranslate = -(containerWidth - windowWidth);

      // Animation plus fluide avec interpolation
      gsap.to(scrollContainer.value, {
        x: gsap.utils.interpolate(-24, maxTranslate, progress),
        duration: 0.1,
        overwrite: true,
      });
    },
  });

  scrollTriggers.push(mainST);

  // Animations des éléments des chats
  catItems.value.forEach((item, itemIndex) => {
    const childrenNodes = [
      ...(item as HTMLElement).querySelectorAll(
        "button > *:not(.cat-item__explore)"
      ),
    ];

    childrenNodes.forEach((child, index) => {
      const st = ScrollTrigger.create({
        trigger: child,
        start: `top top`,
        end: `top+=${containerWidth * (itemIndex + 1) * 0.72}px top`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          gsap.to(child, {
            y: gsap.utils.interpolate(
              0,
              240 * (0.2 * (itemIndex + 1)),
              progress
            ),
            x: gsap.utils.interpolate(
              0,
              -32 * (0.2 * (itemIndex + 1)),
              progress
            ),
            duration: 0.1,
            overwrite: true,
          });
        },
      });

      scrollTriggers.push(st);
    });
  });
};

const initHorizontalScroll = () => {
  const container = scrollContainer.value;

  if (container) {
    catItems.value = [...container.querySelectorAll(".cat-item")];

    const containerWidth = (container as HTMLElement).scrollWidth;
    const windowWidth = window.innerWidth;

    // Configuration ScrollTrigger pour une meilleure performance
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true,
    });

    playScroll(null, containerWidth, windowWidth);

    emits("animation-init-done");
  }
};

const cleanupScrollTrigger = () => {
  // Nettoie spécifiquement nos ScrollTriggers
  scrollTriggers.forEach((st) => st.kill());
  scrollTriggers = [];

  // Nettoie tous les autres si nécessaire
  ScrollTrigger.getAll().forEach((st) => st.kill());
  ScrollTrigger.clearMatchMedia();
};

// Fonction pour rafraîchir les ScrollTriggers lors du resize
const handleResize = () => {
  ScrollTrigger.refresh();
};

onMounted(() => {
  if (route.name === "adoptions") {
    nextTick(() => {
      setTimeout(() => {
        if (!isMobile() && !isSafari()) {
          initHorizontalScroll();

          // Ajoute un listener pour le resize
          window.addEventListener("resize", handleResize);
        } else {
          isDoScrollDisabled.value = true;

          if (section.value) {
            section.value.style.overflowX = "scroll";
          }

          emits("animation-init-done");
        }

        isMounted.value = true;
      }, 100); // Réduit de 480 à 100
    });
  }
});

onUnmounted(() => {
  // Nettoie les event listeners
  window.removeEventListener("resize", handleResize);

  // Nettoie les ScrollTriggers
  cleanupScrollTrigger();
  isMounted.value = false;
});
</script>

<style lang="scss">
.adoptions-group {
  height: 100vh;
  overflow: hidden;
  overflow-x: scroll;
  display: flex;
  padding: var(--spacing-m);

  // Amélioration du smooth scrolling
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &__title {
    margin-bottom: var(--spacing-m);

    .word {
      @extend .gloock-regular;
    }
  }

  &__container {
    height: 100%;
    display: flex;
    opacity: 1; // S'assurer que le container est visible
    // Optimisation pour les animations
    will-change: transform;
    transform: translateZ(0);
    position: relative;
  }

  &__items {
    display: flex;
    height: 100%;
    margin-top: var(--spacing-l);

    & > * {
      margin-right: 6vw;
      margin-left: 6vw;
      // Optimisation pour les animations
      will-change: transform;
      transform: translateZ(0);
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
      transform: scale(0.98) translateZ(0); // Ajout de translateZ(0)
      border-radius: 0;
      z-index: -1;
      // Optimisation pour les images
      will-change: transform;
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

      font-weight: bold;
      @include ft-s(medium);
      line-height: 2rem;

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

  a {
    * {
      text-decoration: underline;
    }
  }
}

// Styles pour améliorer les performances sur desktop
@media (pointer: fine) {
  .adoptions-group {
    // Améliore la gestion de la souris
    &::-webkit-scrollbar {
      display: none;
    }

    scrollbar-width: none;
    -ms-overflow-style: none;
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
        bottom: 4.8vh;
        transform: scale(0.64) translateZ(0) !important;
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
      overflow-x: hidden;

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
          padding-bottom: 10vh;
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
        transform: scale(1) translateX(-8%) translateZ(0);
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
        transform: scale(1) translateZ(0);
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
