<template>
  <div class="cat-item">
    <Sheet>
      <SheetTrigger @click="onOpen(true)">
        <prismic-image
          class="cat-item__photo"
          :field="catHasAvatar ? catphoto : avatarPlaceholder"
        />

        <h4 class="cat-item__name">
          <span
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

const props = defineProps<CatInfo>();

const emits = defineEmits(["update:open-item"]);

const catHasAvatar = computed(() => props.catphoto.hasOwnProperty("url"));

const onOpen = (opened: boolean) => {
  emits("update:open-item", { opened });
};
</script>

<style lang="scss" scoped>
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
  .cat-item__explore {
    display: flex;
    flex-direction: column;
    align-items: center;

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
    text-transform: uppercase;
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
    padding: 0 var(--spacing-m);
    padding-bottom: 12vh;
    transform: translateX(calc(var(--spacing-m) * -1));
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

      &:nth-of-type(n) {
        transform: translateY(var(--spacing-l)) translateX(var(--spacing-l));
      }

      &:nth-of-type(2n) {
        transform: translateY(0) !important;
      }

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
      }

      &__info {
        * {
          font-size: 18px;
        }

        flex-direction: column;
        gap: var(--spacing-m);
        bottom: 16%;

        p {
          &:nth-of-type(n) {
            transform: translateY(0);
          }
          &:nth-of-type(2n) {
            transform: translateY(var(--spacing-m));
          }
        }
      }
    }
  }
}

@container app (min-width: 1000px) {
  .cat-item {
    width: 25vw !important;
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
  .cat-item {
    &__info {
      & > * {
        &:nth-of-type(n) {
          transform: translateY(var(--spacing-l))
            translateX(calc(var(--spacing-l) * 2)) !important;
        }
      }
    }
    &__fiche {
      // &__avatar {
      //   top: 50% !important;
      //   left: -2px !important;
      //   transform: translateY(-50%) !important;
      //   width: 32% !important;
      //   height: 100% !important;
      //   border-radius: 0 32px 32px 0 !important;

      //   &.--placeholder {
      //     object-fit: contain !important;
      //   }
      // }
    }

    &__name {
      span {
        font-size: calc((var(--base-ft-size) * 5));
        line-height: calc((var(--base-ft-size) * 4));
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
