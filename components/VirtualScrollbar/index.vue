<template>
  <div
    ref="scrollbarContainer"
    class="virtual-scrollbar"
    :class="{ 'virtual-scrollbar--visible': isVisible }"
    @mousedown="onTrackClick"
  >
    <div
      ref="scrollbarThumb"
      class="virtual-scrollbar__thumb"
      :style="thumbStyle"
      @mousedown="onThumbMouseDown"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

interface Props {
  target: HTMLElement | null;
  direction?: "horizontal" | "vertical";
  visible?: boolean;
  autoHide?: boolean;
  hideDelay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  direction: "horizontal",
  visible: true,
  autoHide: true,
  hideDelay: 1000,
});

const scrollbarContainer = ref<HTMLElement | null>(null);
const scrollbarThumb = ref<HTMLElement | null>(null);

const isDragging = ref(false);
const dragStartPos = ref(0);
const dragStartScroll = ref(0);
const isVisible = ref(props.visible);
const hideTimeout = ref<NodeJS.Timeout | null>(null);

// États du scroll
const scrollPosition = ref(0);
const scrollSize = ref(0);
const clientSize = ref(0);

// Calculer les dimensions et position du thumb
const thumbStyle = computed(() => {
  const scrollRatio =
    scrollSize.value > 0 ? clientSize.value / scrollSize.value : 1;
  const thumbSize = Math.max(scrollRatio * 100, 10); // Minimum 10% de taille

  const maxScrollPosition = scrollSize.value - clientSize.value;
  const thumbPosition =
    maxScrollPosition > 0
      ? (scrollPosition.value / maxScrollPosition) * (100 - thumbSize)
      : 0;

  if (props.direction === "horizontal") {
    return {
      width: `${thumbSize}%`,
      transform: `translateX(${thumbPosition}%)`,
    };
  } else {
    return {
      height: `${thumbSize}%`,
      transform: `translateY(${thumbPosition}%)`,
    };
  }
});

// Calculer si la scrollbar doit être affichée
const shouldShowScrollbar = computed(() => {
  return scrollSize.value > clientSize.value;
});

// Mettre à jour les dimensions
const updateDimensions = () => {
  if (!props.target) return;

  if (props.direction === "horizontal") {
    scrollPosition.value = props.target.scrollLeft;
    scrollSize.value = props.target.scrollWidth;
    clientSize.value = props.target.clientWidth;
  } else {
    scrollPosition.value = props.target.scrollTop;
    scrollSize.value = props.target.scrollHeight;
    clientSize.value = props.target.clientHeight;
  }
};

// Gestion du clic sur la track
const onTrackClick = (e: MouseEvent) => {
  if (!props.target || !scrollbarContainer.value) return;

  e.preventDefault();
  e.stopPropagation();

  const rect = scrollbarContainer.value.getBoundingClientRect();
  const clickPosition =
    props.direction === "horizontal"
      ? (e.clientX - rect.left) / rect.width
      : (e.clientY - rect.top) / rect.height;

  const maxScrollPosition =
    props.direction === "horizontal"
      ? scrollSize.value - clientSize.value
      : scrollSize.value - clientSize.value;

  const targetScroll = clickPosition * maxScrollPosition;

  if (props.direction === "horizontal") {
    props.target.scrollTo({ left: targetScroll, behavior: "smooth" });
  } else {
    props.target.scrollTo({ top: targetScroll, behavior: "smooth" });
  }
};

// Gestion du drag du thumb
const onThumbMouseDown = (e: MouseEvent) => {
  if (!props.target) return;

  e.preventDefault();
  e.stopPropagation();

  isDragging.value = true;
  dragStartPos.value = props.direction === "horizontal" ? e.clientX : e.clientY;
  dragStartScroll.value =
    props.direction === "horizontal"
      ? props.target.scrollLeft
      : props.target.scrollTop;

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
  document.body.style.userSelect = "none";
};

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !props.target || !scrollbarContainer.value) return;

  const currentPos = props.direction === "horizontal" ? e.clientX : e.clientY;
  const deltaPos = currentPos - dragStartPos.value;

  const containerSize =
    props.direction === "horizontal"
      ? scrollbarContainer.value.offsetWidth
      : scrollbarContainer.value.offsetHeight;

  const scrollRatio = (scrollSize.value - clientSize.value) / containerSize;
  const deltaScroll = deltaPos * scrollRatio;

  const newScrollPosition = Math.max(
    0,
    Math.min(
      scrollSize.value - clientSize.value,
      dragStartScroll.value + deltaScroll
    )
  );

  if (props.direction === "horizontal") {
    props.target.scrollLeft = newScrollPosition;
  } else {
    props.target.scrollTop = newScrollPosition;
  }
};

const onMouseUp = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
  document.body.style.userSelect = "";
};

// Gestion de l'auto-hide
const showScrollbar = () => {
  isVisible.value = true;
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value);
  }
};

const hideScrollbar = () => {
  if (props.autoHide && !isDragging.value) {
    hideTimeout.value = setTimeout(() => {
      isVisible.value = false;
    }, props.hideDelay);
  }
};

// Event listeners
const onTargetScroll = () => {
  updateDimensions();
  if (props.autoHide) {
    showScrollbar();
    hideScrollbar();
  }
};

const onTargetMouseEnter = () => {
  if (props.autoHide) {
    showScrollbar();
  }
};

const onTargetMouseLeave = () => {
  if (props.autoHide) {
    hideScrollbar();
  }
};

// Watchers
watch(
  () => props.target,
  (newTarget, oldTarget) => {
    if (oldTarget) {
      oldTarget.removeEventListener("scroll", onTargetScroll);
      oldTarget.removeEventListener("mouseenter", onTargetMouseEnter);
      oldTarget.removeEventListener("mouseleave", onTargetMouseLeave);
    }

    if (newTarget) {
      newTarget.addEventListener("scroll", onTargetScroll);
      newTarget.addEventListener("mouseenter", onTargetMouseEnter);
      newTarget.addEventListener("mouseleave", onTargetMouseLeave);
      updateDimensions();
    }
  },
  { immediate: true }
);

watch(
  () => shouldShowScrollbar.value,
  (show) => {
    if (!show) {
      isVisible.value = false;
    } else if (props.visible) {
      isVisible.value = true;
    }
  }
);

onMounted(() => {
  updateDimensions();

  // ResizeObserver pour détecter les changements de taille
  if (props.target && window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(props.target);

    onUnmounted(() => {
      resizeObserver.disconnect();
    });
  }
});

onUnmounted(() => {
  if (props.target) {
    props.target.removeEventListener("scroll", onTargetScroll);
    props.target.removeEventListener("mouseenter", onTargetMouseEnter);
    props.target.removeEventListener("mouseleave", onTargetMouseLeave);
  }

  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);

  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value);
  }
});
</script>

<style lang="scss" scoped>
.virtual-scrollbar {
  position: absolute;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  opacity: 0;
  transition: opacity 0.2s ease;
  cursor: pointer;
  z-index: 100;

  &--visible {
    opacity: 1;
  }

  // Scrollbar horizontale
  &:not(.vertical) {
    bottom: 4px;
    left: 4px;
    right: 4px;
    height: 8px;
  }

  // Scrollbar verticale
  &.vertical {
    top: 4px;
    right: 4px;
    bottom: 4px;
    width: 8px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  &__thumb {
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 6px;
    cursor: grab;
    transition: background 0.2s ease;

    // Thumb horizontal
    .virtual-scrollbar:not(.vertical) & {
      height: 100%;
      min-width: 20px;
    }

    // Thumb vertical
    .virtual-scrollbar.vertical & {
      width: 100%;
      min-height: 20px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.6);
    }

    &:active {
      cursor: grabbing;
      background: rgba(0, 0, 0, 0.8);
    }
  }
}

// States
.virtual-scrollbar {
  &.dragging {
    .virtual-scrollbar__thumb {
      background: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>
