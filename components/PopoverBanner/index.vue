<template>
  <aside>
    <div class="popover-banner" v-if="displaytype === 'PopoverBanner'">
      <Popover @update:open="(evt) => onUpdateOpen(evt)">
        <PopoverTrigger>
          <Badge class="popover-banner__cta">{{ ctalabel }} </Badge>
        </PopoverTrigger>
        <PopoverContent class="popover-banner__content overflow-y-scroll">
          <div>
            <prismic-image
              v-if="banner && banner?.url"
              class="popover-banner__image"
              :field="banner"
            />
            <prismic-rich-text
              class="popover-banner__text size-16 albert-sans-light"
              :field="text"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>

    <div v-else-if="displaytype === 'PopoverSheet'" class="popover-sheet">
      <Sheet @update:open="(evt) => onUpdateOpen(evt)">
        <SheetTrigger
          ><Badge class="popover-banner__cta"
            >{{ ctalabel }}
          </Badge></SheetTrigger
        >
        <SheetContent
          class="popover-sheet__content md:w-1/3 sm:max-w-1/2 overflow-y-scroll"
        >
          <SheetHeader>
            <SheetTitle class="popover-sheet__title text-3xl">{{
              ctalabel
            }}</SheetTitle>
          </SheetHeader>

          <prismic-rich-text
            class="popover-sheet__text albert-sans-regular w-fit leading-6"
            :field="text"
          />
        </SheetContent>
      </Sheet>
    </div>

    <div v-else></div>
  </aside>
</template>

<script setup lang="ts">
import Lenis from "lenis";
import "lenis/dist/lenis.css";
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
import useSmoothScroll from "@/composables/useSmoothScroll";

type Prop = {
  banner?: any; // TODO: type Image
  ctalabel: string;
  text: any;
  displaytype: string;
};

const props = defineProps<Prop>();

const onUpdateOpen = (openState) => {
  if (openState) {
    window.lenis?.destroy();
    window.lenis = null;
  } else {
    console.log(window.lenis);
  }
};

const onScroll = (e) => {
  console.log(e);
};
</script>

<style lang="scss">
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
  .popover {
    &-banner,
    &-sheet {
      &__content {
        z-index: 1000;
      }
    }
  }
  /* Mobile styles */
  .popover-sheet {
    &__content {
      width: 84vw;
      padding-right: var(--spacing-l);
    }
  }
}
</style>
