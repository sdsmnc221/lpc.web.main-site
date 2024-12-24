<template>
  <NuxtLayout name="default-temp">
    <div
      class="emoji-banner"
      :style="`--cell-size: ${cellSize}px; --gap:${GAP}px;`"
    >
      <div v-for="i in CELLS_COL_COUNT" :key="`emoji-banner__col__${i}`">
        <div v-for="j in CELLS_ROW_COUNT" :key="`emoji-banner__row__${i}-${j}`">
          {{ EMOJIS[j % 2] }}
        </div>
      </div>

      <div class="emoji-banner__text albert-sans-bold">{{ errorHeading }}</div>
    </div>
    <div class="error-content">
      <h2>{{ errorTitle }}</h2>
      <prismic-rich-text
        :field="errorBody"
        class="error-content__body"
      ></prismic-rich-text>

      <div class="error-content__links mt-4">
        <Badge class="px-5">
          <NuxtLink
            v-for="(link, index) in quickAccessLinks"
            :key="`navigation-menu-link-${link.link?.id}-${index}`"
            :to="`/${link.link?.uid}`"
            class="text-lg albert-sans-bold"
          >
            {{ link.label }}
          </NuxtLink>
        </Badge>
      </div>
    </div>
  </NuxtLayout>
  <page-loader :show="loading" full-censored></page-loader>
</template>

<script setup lang="ts">
import PageLoader from "@/components/PageLoader/index.vue";
import Badge from "~/components/ui/badge/Badge.vue";

import type { NuxtError } from "#app";

type ErrorCode = {
  errorcode: string;
  errordisplaymessage: string;
};
const props = defineProps({
  error: Object as () => NuxtError,
});

const EMOJIS = ["🙀", "⚠️"];
const CELLS_ROW_COUNT = 8;
const CELLS_COL_COUNT = 6;

const GAP = 32;

const cellSize: Ref<number> = ref(32);

const { client } = usePrismic();

const { data: errorPage } = await useAsyncData("errorPage", () =>
  client.getSingle("errorpage")
);

const errorsList: ComputedRef<ErrorCode[]> = computed(() => {
  return errorPage.value?.data?.errorslist;
});

const defaultError: ComputedRef<ErrorCode | null> = computed(() => {
  return errorsList.value?.find((e) => e.errorcode === "default") ?? null;
});

const errorHeading = computed(() => errorPage.value?.data?.errorheading);

const errorTitle = computed(() => {
  const currentError =
    errorsList.value.find((e) => e.errorcode == props.error?.statusCode) ??
    defaultError.value;
  return `${currentError?.errordisplaymessage} ${props.error?.statusCode ? `${props.error.statusCode}` : ""}.`;
});

const errorBody = computed(() => errorPage.value?.data?.errorcontent);

const quickAccessLinks = computed(
  () => errorPage.value?.data?.quickaccesslinks
);

const route = useRoute();

const loading = ref(true);

onMounted(() => {
  console.log(props.error);

  window.addEventListener("resize", () => {
    cellSize.value = window.innerWidth / CELLS_ROW_COUNT;
  });

  nextTick(() => {
    cellSize.value = window.innerWidth / CELLS_ROW_COUNT;
  });
});

onMounted(() => {
  if (!route.path.includes("adoptions")) {
    setTimeout(() => {
      loading.value = false;
    }, 1400);

    console.log(quickAccessLinks.value);
  }
});
</script>
<style lang="scss">
.app:has(.emoji-banner) {
  .emoji-banner {
    transform: translateX(-8vw);
  }
}

@container nuxt (max-width: 699px) {
  .app:has(.emoji-banner) {
    .emoji-banner {
      // transform: translateX(calc(var(--spacing-m) * -1));
    }
  }
}
</style>

<style lang="scss" scoped>
.emoji-banner {
  * {
    transition: all 0.64s ease-in-out;
  }

  padding: 0 !important;

  position: relative;
  width: 100vw;
  background-color: var(--black);
  // colum
  & > div {
    display: flex;
    width: 100%;
    overflow: hidden;

    // row (each cell)
    & > div {
      width: var(--cell-size);
      aspect-ratio: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: var(--cell-size);
    }
  }

  &__text {
    width: unset !important;
    position: absolute;
    top: calc(var(--cell-size) + var(--gap) * 4);
    left: var(--cell-size);
    z-index: 3;

    font-size: var(--cell-size);

    padding: var(--spacing-s) var(--spacing-m);
    color: var(--gray-dark);
    background-color: var(--black);
  }
}

.error-content {
  margin: var(--spacing-m) 0;

  &__body {
    padding-right: 32vw;

    * {
      @include ft-s(medium);
      @extend .albert-sans-regular;
    }

    & > * {
      margin-top: var(--spacing-m);
    }
  }
}

@container nuxt (max-width: 699px) {
  .app {
    .emoji-banner {
      &__text {
        top: calc(var(--cell-size) * 2 + var(--gap) / 2);
        left: var(--cell-size);
        padding: var(--spacing-m) var(--spacing-l);
      }
    }

    .error-content {
      &__body {
        padding-right: 0;
        margin: 0;

        * {
          @include ft-s(20);
          @extend .albert-sans-light;
        }
      }
    }
  }
}
</style>
