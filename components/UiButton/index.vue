<template>
  <button class="ui-button size-16">{{ label }}</button>
</template>

<script setup lang="ts">
type Props = {
  label: string;
};
const props = defineProps<Props>();
</script>

<style lang="scss">
.ui-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: var(--white);
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 32px;
}
</style>
