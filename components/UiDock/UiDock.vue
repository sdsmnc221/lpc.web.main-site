<template>
  <div class="ui-dock__container" :style="`top: ${windowScrollY}px;`">
    <div
      ref="dockRef"
      class="ui-dock"
      :class="
        cn(
          'supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max rounded-2xl border border-gray-500 p-2 backdrop-blur-md transition-all gap-4',
          $props.class,
          dockClass
        )
      "
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { cn } from "~/lib/utils";
import { isSafari, isMobile } from "~/lib/helpers";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  magnification: {
    type: Number,
    default: 60,
  },
  distance: {
    type: Number,
    default: 140,
  },
  direction: {
    type: String,
    default: "middle",
  },
});

const dockRef = ref<HTMLElement | null>(null);
const mouseX = ref(Infinity);

const dockClass = computed(() => ({
  "items-start": props.direction === "top",
  "items-center": props.direction === "middle",
  "items-end": props.direction === "bottom",
}));

const scrollHeight = ref<number>(0);
const innerHeight = ref<number>(0);
const windowScrollY = ref<number>(0);

onMounted(() => {
  nextTick(() => {
    scrollHeight.value = document.body.scrollHeight;
    innerHeight.value = window.innerHeight;

    window.addEventListener("scroll", (e) => {
      if (isSafari()) {
        setInterval(() => {
          windowScrollY.value = window.scrollY;
        }, 4800);
      }
    });
  });
});

function onMouseMove(e: MouseEvent) {
  requestAnimationFrame(() => {
    mouseX.value = e.pageX;
  });
}

function onMouseLeave() {
  mouseX.value = Infinity;
}

provide("mouseX", mouseX);
provide("magnification", props.magnification);
provide("distance", props.distance);
</script>

<style lang="scss">
.ui-dock__container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100svh;

  transition: top 0.64s ease-in-out;
  pointer-events: none;
}

.ui-dock {
  position: absolute;

  pointer-events: all;
  bottom: var(--spacing-l);
  right: var(--spacing-l);
  padding: 0 var(--spacing-m) !important;

  & > div {
    cursor: pointer;
  }
}

@media screen and (max-width: 699px) {
  .ui-dock {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
