<template>
  <button class="ui-button" :class="`--${variant}`">
    <span v-if="label">{{ label }}</span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type Props = {
  label?: string;
  variant?: "dark" | "light";
};
const props = withDefaults(defineProps<Props>(), {
  variant: "light",
});
</script>

<style lang="scss">
.ui-button {
  display: inline-block;
  padding: 12px 24px;

  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 32px;

  container-name: ui-button;
  container-type: normal;

  @include ft-s(16);

  &.--light {
    background-color: var(--white);
    color: var(--black);
  }

  &.--dark {
    background-color: var(--black);
    color: var(--white);
  }
}

@container app (width >= 1200px) {
  /* Change the flex direction of the .child element. */
  .ui-button {
    @include ft-s(medium);
  }
}

@container ui-button (width <= 200px) {
  /* Change the flex direction of the .child element. */
  button.ui-button {
    @include ft-s(16);
  }
}
</style>
