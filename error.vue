<template>
  <NuxtLayout name="default">
    <div
      class="emoji-banner"
      :style="`--cell-size: ${cellSize}px; --gap:${GAP}px;`"
    >
      <div v-for="i in CELLS_COL_COUNT" :key="`emoji-banner__col__${i}`">
        <div v-for="j in CELLS_ROW_COUNT" :key="`emoji-banner__row__${i}-${j}`">
          {{ EMOJIS[j % 2] }}
        </div>
      </div>

      <div class="emoji-banner__text albert-sans-bold">OOPS....</div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const EMOJIS = ["🙀", "⚠️"];
const CELLS_ROW_COUNT = 8;
const CELLS_COL_COUNT = 6;

const GAP = 32;

const cellSize = ref(32);

onMounted(() => {
  window.addEventListener("resize", () => {
    cellSize.value = window.innerWidth / CELLS_ROW_COUNT;
  });

  nextTick(() => {
    cellSize.value = window.innerWidth / CELLS_ROW_COUNT;
  });
});
</script>
<style lang="scss">
.app:has(.emoji-banner) {
  padding: 0 !important;
}
</style>

<style lang="scss" scoped>
.emoji-banner {
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

@container nuxt (max-width: 699px) {
  .app {
    .emoji-banner {
      &__text {
        top: calc(var(--cell-size) * 2 + var(--gap) / 2);
        left: var(--cell-size);
        padding: var(--spacing-m) var(--spacing-l);
      }
    }
  }
}
</style>
