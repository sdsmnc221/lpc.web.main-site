<template>
  <button class="ui-button">{{ label }}</button>
</template>

<script setup lang="ts">
type Props = {
  label: string;
};
const props = defineProps<Props>();
</script>

<style lang="scss">
@import "@/styles/imports";

.ui-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: var(--white);
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 32px;

  container-name: ui-button;
  container-type: normal;

  @extend .size-16;
}

@container app (width >= 1200px) {
  /* Change the flex direction of the .child element. */
  .ui-button {
    @extend .size-medium;
  }
}

@container ui-button (width <= 200px) {
  /* Change the flex direction of the .child element. */
  button.ui-button {
    @extend .size-16;
  }
}
</style>
