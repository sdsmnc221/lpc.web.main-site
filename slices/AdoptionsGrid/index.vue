<template>
  <section
    ref="section"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="adoptions-group bg-white"
  >
    <div
      class="adoptions-group__items flex-wrap justify-center items-start w-screen mb-[10vh]"
      v-if="itemsData?.length"
    >
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

const { data: itemsData } = await useAsyncData("catsList", async () => {
  const allCats = await client.getAllByType("catfiche", {
    limit: 100,
  });

  console.log(allCats);

  return allCats.filter(
    (cat) =>
      cat.data.adoptionstatus !== "Adopté.e" &&
      cat.data.adoptionstatus !== "Sans suite"
  );
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
        width: 148vw;
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
        width: 148vw;
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
      & > *:not(:first-child) {
        margin-right: 6vh;
        margin-left: 6vh;
      }
    }
  }
}
</style>
