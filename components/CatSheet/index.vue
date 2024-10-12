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
        <p v-if="catItem.adoptionstatus" class="cat-sheet__details__status">
          <span
            v-for="(part, index) in catItem.adoptionstatus.split('-')"
            :key="`${catItem.id}-status-${index}`"
            :class="`${catItem.index % 2 === 0 ? 'gloock-regular' : 'albert-sans-bold'}`"
            >{{ part }}
          </span>
          <span v-if="catItem.catsexe"> {{ catItem.catsexe }}</span>
        </p>

        <div class="cat-sheet__details__info" v-if="hasInfo">
          <p v-if="catItem.catagenumber && catItem.catagetype">
            Âge : {{ catItem.catagenumber }} {{ catItem.catagetype }}
          </p>
          <p v-if="catItem.catbirth">Né.e le : {{ catItem.catbirth }}</p>
          <p v-if="catItem.zipcode">Zone : {{ catItem.zipcode }}</p>
        </div>

        <div
          v-if="catItem.catdescription"
          class="cat-sheet__details__description"
        >
          <prismic-rich-text :field="catItem.catdescription" />
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
          <span
            :class="`${catItem.index % 2 === 0 ? 'gloock-regular' : 'albert-sans-bold'}`"
            >{{ catItem.catname }}</span
          >
        </h2>
        <p class="cat-sheet__publication albert-sans-light size-regular">
          Fiche publiée le {{ catItem.createddate }}
        </p>
      </div>

      <div class="cat-sheet__grid__div6 cat-sheet__footnote">
        <div class="cat-sheet__footnote__section">
          <p class="cat-sheet__footnote__heading">Contact</p>
          <prismic-rich-text
            :field="catItem.contactInfo"
            class="cat-sheet__footnote__content"
          />
        </div>

        <div class="cat-sheet__footnote__section">
          <p class="cat-sheet__footnote__heading">Contrat d'adoption</p>
          <prismic-rich-text
            :field="catItem.adoptionRequirements"
            class="cat-sheet__footnote__content"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge } from "@/components/ui/badge";

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
      grid-area: 2 / 4 / 3 / 5;
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

        @include ft-s(24);
        text-transform: uppercase;
      }
    }

    &__div4 {
      grid-area: 2 / 3 / 4 / 4;

      display: flex;
      flex-direction: column;
      gap: var(--spacing-m);

      color: var(--white);

      .cat-sheet__details {
        &__status,
        &__info {
          width: 100%;
          text-align: right;
          padding: 0 var(--spacing-s);
          position: relative;

          span {
            @include ft-s(large);
            font-weight: bold;
            display: block;
            line-height: 2.4rem;

            &:nth-child(2) {
              font-weight: normal;
            }
          }
        }

        &__status {
          &::after {
            content: "";
            width: 100%;
            height: 1px;
            position: absolute;
            bottom: -24%;
            left: 0;
            background-color: black;
          }
        }

        &__info {
          position: absolute;
          width: unset;
          right: 0;
          top: 24%;
          padding: 0 var(--spacing-s);
          background-color: black;
          z-index: 1;
        }

        &__description {
          flex: 2;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          padding: var(--spacing-m);
          padding-bottom: var(--spacing-m);
          position: relative;

          & > * {
            text-align: left;
            padding: var(--spacing-s);
            @include ft-s(regular);
            width: 100%;

            &::after {
              content: "";
              width: 100%;
              height: 1px;
              position: absolute;
              bottom: 0;
              left: 0;
              background-color: black;
            }
          }
        }

        &__badges {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.72rem;
          padding: var(--spacing-m);

          justify-content: flex-end;
          align-items: flex-end;
          align-self: flex-end;
        }
      }
    }

    &__div5 {
      grid-area: 1 / 4 / 2 / 5;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .cat-sheet {
        &__title {
          width: 100%;
          color: var(--white);
          text-transform: uppercase;
          padding: 0 var(--spacing-m);
          text-align: left;
          position: relative;

          span {
            font-size: calc((var(--base-ft-size) * 5));
            line-height: calc((var(--base-ft-size) * 4));
          }
        }

        &__publication {
          width: 100%;
          padding: 0 var(--spacing-m);
          margin-top: var(--spacing-s);
          color: var(--gray);
          @include ft-s(small);
          font-style: italic;
          text-align: left;
        }
      }
    }

    &__div6 {
      grid-area: 4 / 2 / 5 / 5;
      .cat-sheet {
        &__footnote {
          &__section {
            color: var(--white);
            line-height: 1.2rem;
          }

          &__heading {
            font-weight: bold;
            margin-top: var(--spacing-s);
            text-decoration: underline;
          }
        }
      }
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
  body {
    .cat-sheet {
      z-index: 999;

      .cat-sheet__grid {
        display: grid;
        grid-template-columns: 0.5fr repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;

        &__div1 {
          grid-area: 1 / 1 / 3 / 3;

          .cat-sheet {
            &__avatar {
              height: 100%;
              width: auto;
            }
          }
        }

        &__div2 {
          grid-area: 3 / 3 / 4 / 4;

          img.cat-sheet__avatar {
            bottom: 0;
            height: 100%;
            width: 100%;
            object-fit: cover !important;
          }
        }

        &__div3 {
          grid-area: 3 / 1 / 4 / 3;
          .cat-sheet__trigger {
            position: relative;
            z-index: 2;
            @include ft-s(small);
            background-color: var(--gray-dark);
            padding: var(--spacing-s) var(--spacing-m);
          }
        }

        &__div4 {
          grid-area: 2 / 3 / 3 / 4;
          gap: var(--spacing-s);

          .cat-sheet__details {
            &__info {
              @include ft-s(small);
              top: 28%;
            }

            &__status {
              & > *:first-child {
                @include ft-s(medium);
              }

              & > *:not(:first-child) {
                line-height: 0.8rem;
                @include ft-s(small);
              }
            }

            &__badges {
              padding: var(--spacing-s);
              align-self: center;
              position: fixed;
              bottom: 32vh;
              left: 0;
            }

            &__description {
              padding: var(--spacing-s);
              margin-top: var(--spacing-l);

              padding-top: var(--spacing-l);

              width: 56vw;

              & > * {
                text-align: right;
                font-size: calc(var(--base-ft-size) * 0.72);
              }
            }
          }
        }

        &__div5 {
          grid-area: 1 / 2 / 2 / 4;

          .cat-sheet {
            &__title {
              padding-top: var(--spacing-m);
              text-align: right;

              span {
                font-size: calc((var(--base-ft-size) * 3));
                line-height: calc((var(--base-ft-size) * 3));
              }
            }

            &__publication {
              background-color: var(--white);
              color: var(--black);
              width: auto;
              margin-left: var(--spacing-s);
            }
          }
        }

        &__div6 {
          grid-area: 3 / 3 / 4 / 4;
          padding: var(--spacing-s);

          .cat-sheet {
            &__footnote {
              justify-content: flex-end;
              flex-direction: column;
              display: flex;

              &__section {
                @include ft-s(small);
                line-height: 0.98rem;
              }

              &__content {
                background-color: rgba(0, 0, 0, 0.64);
              }
            }
          }
        }
      }
    }
  }
}
</style>
