<template>
  <Popover class="popover-banner">
    <PopoverTrigger>
      <Badge class="popover-banner__cta">{{ ctalabel }} </Badge>
    </PopoverTrigger>
    <PopoverContent class="popover-banner__content">
      <prismic-image class="popover-banner__image" :field="banner" />
      <prismic-rich-text
        class="popover-banner__text size-16 albert-sans-light"
        :field="text"
      />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

type Prop = {
  banner: any; // TODO: type Image
  ctalabel: string;
  text: any;
};

const props = defineProps<Prop>();
</script>

<style lang="scss">
.popover-banner {
  &__cta {
    font-weight: 400 !important;
    margin-right: var(--spacing-s);
  }

  &__image {
    border-radius: 8px;
  }

  &__text {
    width: 100%;

    & > * {
      margin-top: var(--spacing-s);
    }

    a {
      text-decoration: underline;
      display: inline-block;
      background-color: var(--black);
      color: var(--white);
      padding: var(--spacing-s);
      text-align: center;
      border-radius: 8px;
    }
  }
}
</style>
