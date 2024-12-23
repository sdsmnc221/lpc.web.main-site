<template>
  <Popover v-if="displaytype === 'PopoverBanner'" class="popover-banner">
    <PopoverTrigger>
      <Badge class="popover-banner__cta">{{ ctalabel }} </Badge>
    </PopoverTrigger>
    <PopoverContent class="popover-banner__content">
      <prismic-image
        v-if="banner && banner?.url"
        class="popover-banner__image"
        :field="banner"
      />
      <prismic-rich-text
        class="popover-banner__text size-16 albert-sans-light"
        :field="text"
      />
    </PopoverContent>
  </Popover>

  <Sheet v-else-if="displaytype === 'PopoverSheet'" class="popover-sheet">
    <SheetTrigger
      ><Badge class="popover-banner__cta">{{ ctalabel }} </Badge></SheetTrigger
    >
    <SheetContent class="popover-sheet__content md:w-1/3 sm:max-w-1/2">
      <SheetHeader>
        <SheetTitle class="popover-sheet__title text-3xl">{{
          ctalabel
        }}</SheetTitle>

        <prismic-rich-text
          class="popover-sheet__text albert-sans-regular w-fit leading-6"
          :field="text"
        />
      </SheetHeader>
    </SheetContent>
  </Sheet>

  <div v-else></div>
</template>

<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

type Prop = {
  banner?: any; // TODO: type Image
  ctalabel: string;
  text: any;
  displaytype: string;
};

const props = defineProps<Prop>();
</script>

<style lang="scss">
.popover {
  &-banner,
  &-sheet {
    z-index: 1000;
  }
}
.popover-banner {
  &__cta {
    font-weight: 400 !important;
  }

  &__image {
    border-radius: 8px;
    display: inline-block;
    margin-bottom: var(--spacing-s);
  }

  &__content {
    max-height: 72vh;
    overflow-y: scroll;
  }

  &__text {
    width: 100%;

    & > *:not(:first-child) {
      margin-top: var(--spacing-s);
    }

    a,
    em {
      text-decoration: underline;
      display: inline-block;
      background-color: var(--black);
      color: var(--white);
      padding: var(--spacing-s);
      text-align: center;
      border-radius: 8px;
    }

    em {
      margin: var(--spacing-s) 0;
      text-decoration: none;
    }
  }
}

.popover-sheet {
  &__content,
  &__text {
    overflow-y: scroll;
  }

  &__title {
    text-align: left;
  }

  &__text {
    text-align: left;

    h4 {
      @include ft-s(24);
      margin-bottom: var(--spacing-s);
      margin-top: var(--spacing-m);
      font-weight: bold;
    }

    h5,
    h6 {
      @include ft-s(20);
      margin-bottom: var(--spacing-s);
      margin-top: var(--spacing-s);
      font-weight: bold;
    }

    h6 {
      @include ft-s(16);
    }

    a {
      text-decoration: underline;
    }

    p:has(em):has(strong) {
      margin-top: var(--spacing-l);
      margin-bottom: var(--spacing-s);
      text-align: right;

      * {
        @extend .gloock-regular;
      }

      em {
        display: block;
      }
    }
  }
}

@media screen and (max-width: 699px) {
  /* Mobile styles */
  .popover-sheet {
    margin-right: var(--spacing-m);
  }
}
</style>
