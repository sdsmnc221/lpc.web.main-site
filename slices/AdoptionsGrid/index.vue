<template>
  <section
    ref="section"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="adoptions-group bg-white"
  >
    <!-- Filters Section -->
    <div class="filters-container mb-6 flex gap-4 justify-center items-center">
      <!-- Age Filter -->
      <div class="filter-dropdown">
        <select
          v-model="selectedAge"
          class="filter-select"
          @change="applyFilters"
        >
          <option value="">Filtrer par âge</option>
          <option value="chaton">Chaton (0-1 an)</option>
          <option value="jeune">Ado (1-2 ans)</option>
          <option value="adulte">Adulte (2-7 ans)</option>
          <option value="senior">Senior (7+ ans)</option>
        </select>
      </div>

      <!-- Gender Filter -->
      <div class="filter-dropdown">
        <select
          v-model="selectedGender"
          class="filter-select"
          @change="applyFilters"
        >
          <option value="">Filtrer par sexe</option>
          <option value="♂️">Mâle</option>
          <option value="♀️">Femelle</option>
        </select>
      </div>

      <!-- Clear Filters Button -->
      <button
        v-if="selectedAge || selectedGender"
        @click="clearFilters"
        class="clear-filters-btn"
      >
        Effacer les filtres
      </button>
    </div>

    <!-- Results Count -->
    <div
      v-if="filteredItemsData?.length !== itemsData?.length"
      class="results-count mb-4 text-center"
    >
      {{ filteredItemsData?.length || 0 }} chat(s) trouvé(s) sur
      {{ itemsData?.length || 0 }}
    </div>

    <!-- Cats Grid -->
    <div
      class="adoptions-group__items flex-wrap justify-center items-start w-screen mb-[10vh]"
      v-if="filteredItemsData?.length"
    >
      <cat-item
        v-for="(cat, index) in filteredItemsData"
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

    <!-- No Results Message -->
    <div
      v-else-if="itemsData?.length && !filteredItemsData?.length"
      class="no-results text-center py-12"
    >
      <p class="text-lg mb-4">
        Aucun chat ne correspond à vos critères de recherche.
      </p>
      <button @click="clearFilters" class="clear-filters-btn">
        Voir tous les chats
      </button>
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

const { client } = usePrismic();

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { isPC, isIOS, randomHSLA, isSafari, isMobile } from "@/lib/helpers";

const router = useRouter();
const route = useRoute();

const isMounted = ref(false);

// Filter reactive variables
const selectedAge = ref("");
const selectedGender = ref("");

// The array passed to `getSliceComponentProps` is purely optional.
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

// Helper function to calculate cat age from birth date or age fields
const calculateAge = (
  birthDate: string,
  birthYear?: string,
  ageNumber?: number,
  ageType?: string
) => {
  // If we have a direct age number, use it
  if (ageNumber && ageType) {
    // Convert age to years based on type
    if (ageType.toLowerCase().includes("an")) {
      return ageNumber;
    } else if (ageType.toLowerCase().includes("mois")) {
      return ageNumber / 12;
    }
  }

  // Otherwise calculate from birth date
  if (!birthDate && !birthYear) return null;

  const currentYear = new Date().getFullYear();
  let age;

  if (birthDate) {
    // Handle MM/DD/YYYY format
    const birth = new Date(birthDate);
    const today = new Date();
    age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
  } else if (birthYear) {
    age = currentYear - parseInt(birthYear);
  }

  return age;
};

// Helper function to categorize age - updated ranges
const getAgeCategory = (age: number) => {
  if (age < 1) return "chaton";
  if (age >= 1 && age < 2) return "jeune"; // Ado (1-2 ans)
  if (age >= 2 && age < 7) return "adulte"; // Adulte (2-7 ans)
  if (age >= 7) return "senior";
  return null;
};

// Computed property for filtered data
const filteredItemsData = computed(() => {
  if (!itemsData.value) return [];

  let filtered = [...itemsData.value];

  // Filter by age
  if (selectedAge.value) {
    filtered = filtered.filter((cat) => {
      const age = calculateAge(
        cat.data.catbirth,
        cat.data.catbirthyear,
        cat.data.catagenumber,
        cat.data.catagetype
      );
      if (age === null) return false;
      const category = getAgeCategory(age);
      return category === selectedAge.value;
    });
  }

  // Filter by gender
  if (selectedGender.value) {
    filtered = filtered.filter((cat) => {
      return cat.data.catsexe === selectedGender.value;
    });
  }

  return filtered;
});

// Methods
const applyFilters = () => {
  // Update URL params to maintain filter state
  const query = { ...route.query };

  if (selectedAge.value) {
    query.age = selectedAge.value;
  } else {
    delete query.age;
  }

  if (selectedGender.value) {
    query.gender = selectedGender.value;
  } else {
    delete query.gender;
  }

  router.push({ query });
};

const clearFilters = () => {
  selectedAge.value = "";
  selectedGender.value = "";

  // Remove filter params from URL
  const query = { ...route.query };
  delete query.age;
  delete query.gender;

  router.push({ query });
};

// Initialize filters from URL params
const initializeFiltersFromURL = () => {
  if (route.query.age) {
    selectedAge.value = route.query.age as string;
  }
  if (route.query.gender) {
    selectedGender.value = route.query.gender as string;
  }
};

// Rest of your existing code...
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
        query: { ...route.query, uid: catItem.uid },
      });
    }
  } else {
    const query = { ...route.query };
    delete query.uid;
    router.push({
      name: router.currentRoute.value.name,
      query,
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

// Watchers and lifecycle hooks
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

    // Initialize filters from URL
    initializeFiltersFromURL();

    if (!newRoute.query.id && !newRoute.query.uid) {
      defaultOpen.value = false;
    } else {
      setTimeout(() => {
        if (filteredItemsData.value) {
          const theCatIndex = filteredItemsData.value?.findIndex(
            (cat) =>
              cat.id === newRoute.query.id || cat.uid === newRoute.query.uid
          );

          if (theCatIndex !== -1) {
            const theCat = formatCatItem({
              cat: filteredItemsData.value[theCatIndex],
              index: theCatIndex,
            });

            currentCatItem.value = theCat;
            defaultOpen.value = true;
          }
        } else {
          const query = { ...newRoute.query };
          delete query.uid;
          delete query.id;
          router.push({
            name: router.currentRoute.value.name,
            query,
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
    // Initialize filters from URL on mount
    initializeFiltersFromURL();

    nextTick(() => {
      setTimeout(() => {
        if (!isMobile() && !isSafari()) {
          // initHorizontalScroll(); // Uncomment when you have this function
          // window.addEventListener("resize", handleResize); // Uncomment when you have this function
        } else {
          isDoScrollDisabled.value = true;
          if (section.value) {
            section.value.style.overflowX = "scroll";
          }
          // emits("animation-init-done"); // Uncomment when you have this emit
        }
        isMounted.value = true;
      }, 100);
    });
  }
});

onUnmounted(() => {
  // window.removeEventListener("resize", handleResize); // Uncomment when you have this function
  // cleanupScrollTrigger(); // Uncomment when you have this function
  isMounted.value = false;
});
</script>

<style lang="scss">
// Filter styles
.filters-container {
  padding: 1rem 2rem;
  margin: 0 8vw;
  gap: 2vw;

  @media (max-width: 768px) {
    margin: 0 4vw;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
}

.filter-dropdown {
  position: relative;
}

.filter-select {
  appearance: none;
  background: transparent;
  border: thin solid var(--black);

  padding: 12px 40px 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 180px;

  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;

  &:hover {
    border-color: var(--black);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:focus {
    outline: none;
    border-color: var(--black);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  option {
    padding: 8px;
    background: var(--white);
    color: #374151;
  }
}

.clear-filters-btn {
  background: var(--black);
  color: var(--white);
  border: none;

  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(77, 77, 77, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
}

.results-count {
  color: #6b7280;

  margin: 0 8vw;
  padding-top: 2vh;

  @include ft-s(20);
}

.no-results {
  margin: 0 8vw;

  p {
    color: #6b7280;
    margin-bottom: 1rem;
  }
}

// Your existing styles remain the same...
.adoptions-group {
  overflow: hidden;
  overflow-x: scroll;
  display: flex;
  flex-direction: column; // Changed to column to accommodate filters

  // Rest of your existing styles...
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
    opacity: 1;
    will-change: transform;
    transform: translateZ(0);
    position: relative;
  }

  &__items {
    display: flex;
    height: 100%;
    margin-top: var(--spacing-l);

    & > * {
      will-change: transform;
      transform: translateZ(0);
    }
  }

  // Rest of your existing styles...
}

// Responsive adjustments for filters
@container app (max-width: 699px) {
  .filters-container {
    margin: 0 4vw;
    padding: 1rem;

    .filter-select {
      min-width: 100%;
      width: 100%;
    }
  }

  .results-count {
    margin: 0 4vw;
  }

  .no-results {
    margin: 0 4vw;
  }
}

@container app (min-width: 1000px) {
  .filters-container {
    margin: 0 6vw;
  }

  .results-count {
    margin: 0 6vw;
  }

  .no-results {
    margin: 0 6vw;
  }
}
</style>
