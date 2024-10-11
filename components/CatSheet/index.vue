<template>
  <div class="cat-sheet" :class="{ '--hidden': !open }">
    <div v-if="catItem" class="cat-sheet__grid">
      <div class="cat-sheet__grid__div1">
        <prismic-image
          class="cat-sheet__avatar"
          :class="{ '--placeholder': !catHasAvatar }"
          :field="catHasAvatar ? catItem.catphoto : catItem.avatarPlaceholder"
        />
      </div>

      <div class="cat-sheet__grid__div2">
        <prismic-image
          class="cat-sheet__avatar"
          :class="{ '--placeholder': catHasAvatar }"
          :field="catHasAvatar ? catItem.catphoto : catItem.avatarPlaceholder"
        />
      </div>

      <div class="cat-sheet__grid__div3" @click="closeSheet">
        <div class="cat-sheet__trigger">- Fiche</div>
      </div>

      <div class="cat-sheet__grid__div4 cat-sheet__details">
        <p class="cat-sheet__details__status albert-sans-regular size-20">
          <span v-if="catItem.adoptionstatus"
            >{{ catItem.adoptionstatus }}
          </span>
          <span v-if="catItem.catsexe"> {{ catItem.catsexe }}</span>
        </p>

        <div class="cat-sheet__details__description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
          aliquam voluptatem enim, quaerat vitae, obcaecati error quasi sequi
          quis aspernatur earum. Distinctio aliquid voluptates molestiae
          sapiente deserunt atque ipsam quas.
        </div>

        <div class="cat-sheet__details__info" v-if="hasInfo">
          <p v-if="catItem.catagenumber && catItem.catagetype">
            Âge : {{ catItem.catagenumber }} {{ catItem.catagetype }}
          </p>
          <p v-if="catItem.catbirth">Né.e le : {{ catItem.catbirth }}</p>
          <p v-if="catItem.zipcode">Zone : {{ catItem.zipcode }}</p>
        </div>

        <div class="cat-sheet__details__badges">
          <Badge>{{ catItem.catidentification }}</Badge>
          <Badge>
            Vaccination : {{ catItem.catvaccination ? "✅" : "❌" }}
          </Badge>
          <Badge>
            Stérilisation : {{ catItem.catsterilization ? "✅" : "❌" }}
          </Badge>
        </div>
      </div>

      <div class="cat-sheet__grid__div5">
        <h2 class="cat-sheet__title">
          <span class="albert-sans-bold size-medium">{{
            catItem.catname
          }}</span>
        </h2>
        <p class="cat-sheet__publication albert-sans-light size-regular">
          Fiche publiée le {{ catItem.createddate }}
        </p>
      </div>

      <div class="cat-sheet__grid__div6 cat-sheet__footnote">
        <Separator label="Contact" />
        <prismic-rich-text :field="catItem.contactInfo" />

        <div class="cat-sheet__details__footnote">
          <Separator label="Contrat d'adoption" />
          <prismic-rich-text :field="catItem.adoptionRequirements" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import type { CatInfo } from "~/interfaces/Cat";

type CatSheetInfo = {
  open: boolean;
  catItem: CatInfo | null;
};

const props = defineProps<CatSheetInfo>();

const emits = defineEmits(["update:open-sheet"]);

const catHasAvatar = computed(() =>
  props.catItem?.catphoto?.hasOwnProperty("url")
);

const hasInfo = computed(
  () =>
    props.catItem?.catbirth ||
    props.catItem?.zipcode ||
    (props.catItem?.catagenumber && props.catItem?.catagetype)
);

const closeSheet = () => {
  emits("update:open-sheet", { opened: false });
};
</script>

<style lang="scss" scoped>
.cat-sheet {
  // width: 100vw;
  // height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;

  z-index: 9;

  display: block;
  pointer-events: all;

  &.--hidden {
    display: none;
    pointer-events: none;
  }

  &__grid {
    display: grid;
    grid-template-columns: 0.5fr 1.2fr 1fr 1.2fr;
    grid-template-rows: 1.6fr 1fr 1.6fr 0.72fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    width: 100vw;
    height: 100vh;

    background-color: var(--black);

    &__div1 {
      grid-area: 1 / 2 / 2 / 3;
    }

    &__div2 {
      grid-area: 3 / 4 / 4 / 5;
    }

    &__div3 {
      grid-area: 1 / 1 / 2 / 2;
      background-color: var(--gray-dark);

      transition: all ease-in-out 0.64s;

      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;

      &:hover {
        background-color: var(--black);
      }

      .cat-sheet__trigger {
        color: var(--white);
        display: inline-block;

        * {
          @include ft-s(20);
          text-transform: uppercase;
        }
      }
    }

    &__div4 {
      grid-area: 2 / 3 / 4 / 4;
      background-color: chartreuse;

      display: flex;
      flex-direction: column;
      gap: var(--spacing-m);

      .cat-sheet__details {
        &__status {
          width: 100%;
          text-align: center;
        }

        &__description {
          flex: 2;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
        }

        &__badges {
          flex: 1;
          display: flex;
          flex-direction: column;

          justify-content: flex-end;
          align-items: flex-end;
          align-self: flex-end;
        }
      }
    }

    &__div5 {
      grid-area: 1 / 4 / 2 / 5;
      background-color: aqua;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &__div6 {
      grid-area: 4 / 2 / 5 / 5;
      background-color: magenta;
    }

    & > div {
      position: relative;
      .cat-sheet__avatar {
        display: block;
        width: 100%;
        height: auto;
        position: absolute;

        object-fit: cover;

        border-radius: 0;

        &.--placeholder {
          object-fit: contain !important;
        }
      }
    }
  }
}

@media screen and (max-width: 699px) {
  .cat-sheet {
    &__grid {
      //mob
    }
  }
}
</style>
