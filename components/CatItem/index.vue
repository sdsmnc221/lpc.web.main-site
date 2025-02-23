<template>
  <div class="cat-item" ref="catItem">
    <Sheet>
      <SheetTrigger
        @click="onOpen(true)"
        :style="`--random-tint: ${tint.hsl};`"
      >
        <div class="cat-item-img-wrap">
          <prismic-image
            class="cat-item__photo cat-item-img"
            :field="catHasAvatar"
          />
        </div>

        <h4
          class="cat-item__name cat-item-title oh leading-[0.64]"
          :class="`${catname.length >= 10 ? 'text-8xl' : ''}`"
        >
          <span
            class="oh__inner"
            :class="`${index % 2 === 0 ? 'gloock-regular' : 'albert-sans-bold'}`"
            >{{ catname }}</span
          >
        </h4>

        <div class="cat-item__explore">
          <span>Découvrez</span>
          <span>mon histoire.</span>
        </div>

        <div class="cat-item__info albert-sans-light size-regular">
          <p v-if="catagenumber && catagetype">
            {{ catagenumber }} {{ catagetype }}
          </p>
          <p v-if="adoptionstatus">
            <span>
              {{
                adoptionstatus
                  .replace("Adoptable -", "")
                  .replace("Adopté - ", "")
              }}
            </span>
            <span class="albert-sans-light" v-if="catsexe">{{ catsexe }}</span>
          </p>
        </div>
      </SheetTrigger>
    </Sheet>
  </div>
</template>

<script setup lang="ts">
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import type { CatInfo } from "~/interfaces/Cat";
import { ContentItem } from "../CatSheetV2/ContentItem";

const props = defineProps<
  CatInfo & { defaultOpen: boolean; tint: { hsla: string; hsl: string } }
>();

const emits = defineEmits(["update:open-item"]);

const catItem = ref<HTMLDivElement | null>(null);
const contentItem = ref<ContentItem | null>(null);

const catHasAvatar = computed(() =>
  props.catphoto2.hasOwnProperty("url")
    ? props.catphoto2
    : props.catphoto.hasOwnProperty("url")
      ? props.catphoto
      : props.avatarPlaceholder
);

const onOpen = (opened: boolean) => {
  emits("update:open-item", { opened, contentItem: contentItem.value });
};

watch(
  () => catItem.value,
  (value) => {
    if (value !== null) {
      contentItem.value = new ContentItem(value);
    }
  }
);

watch(
  () => props.defaultOpen,
  (value) => {
    if (value) {
      onOpen(value);
    }
  }
);
</script>

<style lang="scss">
.cat-item {
  width: 40%;
  // margin: 0 var(--spacing-s);
  // margin-bottom: var(--spacing-m);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:nth-of-type(n) {
    transform: translateY(calc(var(--spacing-l) * -3));
  }
  &:nth-of-type(2n) {
    transform: translateY(calc(var(--spacing-l) * -1));
  }

  &-title {
    transition: all ease 1.2s;
    z-index: 10;

    &.--previewing {
      color: var(--random-tint);
      display: block;
      font-size: clamp(3rem, 24vw, 17rem);
      font-weight: 300;
      margin: 0;
      will-change: transform;
      mix-blend-mode: difference;
    }
  }

  .cat-item__explore {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translate(-24px, 24%);

    span {
      display: block;
      position: relative;
      transition: all ease-in-out 0.64s;
    }
  }

  &:hover {
    .cat-item__explore {
      background-color: var(--black);

      span {
        transform: translateY(48%) scale(1.2);
      }
    }
  }

  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-s);
  }

  &__photo {
    display: block;
    aspect-ratio: 1;
    object-fit: cover;
    background-color: var(--gray);
    border-radius: 32px;
    width: 100%;
  }

  &__name {
    text-align: left;
    text-transform: capitalize;
    position: relative;
    margin-top: var(--spacing-m);
    min-width: 64%;
    position: absolute;
    top: 14%;
    transform: translateY(-50%);
    left: 0;
  }

  &__explore {
    position: absolute;
    bottom: 0;
    left: 0;
    color: var(--white);
    background-color: var(--gray-dark);
    display: inline-block;
    padding: var(--spacing-m);
    padding-bottom: 12vh;
    transition: all ease-in-out 0.64s;

    * {
      @include ft-s(20);
      text-transform: uppercase;
    }
  }

  &__info {
    text-align: center;
    margin-top: calc(var(--spacing-s) * -1);
    padding: calc(var(--spacing-s) * 0.5);
    position: absolute;
    bottom: 20%;
    right: 0;
    display: flex;

    & > * {
      display: block;
      margin-left: var(--spacing-m);
      position: relative;
      background-color: transparent;

      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 20%;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--gray);
        opacity: 0.24;
        border-radius: 8px;
      }
    }

    & * {
      @include ft-s(medium);
    }
  }

  &__fiche {
    height: 52vh;
    position: relative;

    // &__avatar {
    //   top: -32%;
    //   left: 50%;
    //   transform: translateX(-50%);
    //   position: absolute;
    //   display: block;
    //   aspect-ratio: 1/1;
    //   object-fit: cover;
    //   width: 172px;
    //   background-color: var(--gray);
    //   border-radius: 50%;
    // }

    &__content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-s);
    }

    &__title,
    &__status {
      width: 100%;
      text-align: center;
    }

    &__row {
      margin-top: var(--spacing-m);
      display: flex;
      gap: var(--spacing-m);
      justify-content: center;
    }

    &__info {
      width: 48%;
      border: thin solid var(--gray);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: var(--spacing-s);
    }

    &__badges {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      gap: var(--spacing-s);
    }

    &__footnote {
      margin-top: var(--spacing-m);

      * {
        text-align: center;
      }

      & > *:last-child {
        margin-top: var(--spacing-s);
      }
    }

    &__footer {
      text-align: center;
      width: 100%;
      font-style: italic !important;
    }
  }
}
</style>

<style lang="scss">
@container app (min-width: 700px) {
  .cat-item {
    width: 32%;
    // max-width: 220px;

    &__name {
      min-width: 32%;
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1200px) {
  .adoptions-group {
    .cat-item {
      &__info {
        & > p {
          &:nth-of-type(n) {
            transform: translateY(calc(var(--spacing-l) * 1.6))
              translateX(calc(var(--spacing-l) * 0.2)) !important;
          }
          &:nth-of-type(2n) {
            transform: translateY(calc(var(--spacing-l) * 0.8))
              translateX(calc(var(--spacing-l) * -0.8));
          }
        }
      }
    }
  }
}

@media screen and (max-width: 699px) {
  .adoptions-group {
    .cat-item {
      &__info {
        & > p {
          &:nth-of-type(n) {
            transform: translateY(calc(var(--spacing-l) * 1.6))
              translateX(calc(var(--spacing-l) * 0.2)) !important;
          }
          &:nth-of-type(2n) {
            transform: translateY(calc(var(--spacing-l) * 0.8))
              translateX(calc(var(--spacing-l) * -0.8));
          }
        }
      }
    }
  }
}

@media screen and (max-width: 699px),
  screen and (min-width: 768px) and (max-width: 1200px) {
  .adoptions-group {
    .cat-item {
      width: 72vw;

      &__name {
        span {
          font-size: calc((var(--base-ft-size) * 4));
          line-height: calc((var(--base-ft-size) * 3));
        }
      }

      &__explore {
        width: 44vw;

        * {
          font-size: 16px;
        }
      }

      &__info {
        * {
          font-size: 16px;
        }

        flex-direction: column;
        gap: var(--spacing-m);
        bottom: 16%;
      }
    }
  }
}

@container app (min-width: 1000px) {
  .adoptions-group {
    .cat-item {
      width: 25vw !important;

      &__explore {
        width: 50%;
      }
    }
  }
}

@media screen and (min-width: 700px) {
  .cat-item {
    width: 25%;

    &__fiche {
      height: 64vh;

      // &__avatar {
      //   top: -32%;
      //   width: 320px;
      //   z-index: 10;
      // }

      &__content {
        gap: var(--spacing-m);
      }

      &__row {
        padding: 0 24vw;
        margin-top: var(--spacing-l);
      }

      &__info {
        width: 36%;
        gap: var(--spacing-m);
      }

      &__badges {
        gap: var(--spacing-m);
      }

      &__photo {
        width: 150px;
      }

      &__footnote {
        text-align: center;
        width: 100%;

        margin-top: var(--spacing-l);

        & > *:last-child {
          margin-top: var(--spacing-m);
        }
      }
    }
  }
}

@media screen and (min-width: 700px) and (orientation: landscape) {
  .cat-item {
    &__fiche {
      padding-left: 10vw;
      // &__avatar {
      //   top: 50%;
      //   left: 10%;
      //   transform: translate(0, -50%);
      // }
    }
  }
}

@media screen and (min-width: 1000px) {
  .adoptions-group {
    .cat-item {
      &__info {
        & > p {
          &:nth-of-type(n) {
            transform: translateY(calc(var(--spacing-l) * 0.4))
              translateX(calc(var(--spacing-l) * 2.4));
          }
          &:nth-of-type(2n) {
            transform: translateY(calc(var(--spacing-l) * 1.6))
              translateX(calc(var(--spacing-l) * 0.2));
          }
        }
      }

      &__name {
        span {
          font-size: calc((var(--base-ft-size) * 5));
          line-height: calc((var(--base-ft-size) * 4));
        }
      }
    }
  }
}

@media screen and (max-height: 720px) {
  .cat-item {
    &__fiche {
      height: 66vh !important;

      // &__avatar {
      //   top: -24% !important;
      // }
    }
  }
}
</style>
