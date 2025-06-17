<template>
  <button class="ui-button" :class="`--${variant}`" @click="travel">
    <span v-if="label">{{ label }}</span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type Props = {
  label?: string;
  variant?: "dark" | "light";
  link?: {
    url?: string;
    uid?: string;
    target?: string;
  };
};
const props = withDefaults(defineProps<Props>(), {
  variant: "light",
});

const travel = () => {
  if (props.link && (props.link.url || props.link.uid)) {
    window.open(props.link.url || props.link.uid, props.link.target ?? "_self");
  }
};
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
