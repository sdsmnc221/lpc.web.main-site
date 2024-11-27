<template>
  <div class="cat-sheet" :class="{ '--hidden': !open }">
    <div
      v-if="catItem"
      class="cat-sheet__grid"
      :style="`--random-tint: ${tint};`"
    >
      <div class="cat-sheet__grid__div7">"></div>
      <div class="cat-sheet__grid__div8">"></div>

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
          :class="{ '--placeholder': !catHasAvatar }"
          :field="
            catHasAvatar
              ? catItem.catphoto2.hasOwnProperty('url')
                ? catItem.catphoto2
                : catItem.catphoto
              : catItem.avatarPlaceholder
          "
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
        <p class="cat-sheet__publication">
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
  tint: string;
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

  * {
    transition: all ease-in-out 0.64s;
  }

  z-index: 9;

  display: block;
  pointer-events: all;

  &.--hidden {
    display: none;
    pointer-events: none;
  }

  &__grid {
    --random-tint: var(--white);

    display: grid;
    grid-template-columns: 0.5fr 1.2fr 1fr 1.2fr;
    grid-template-rows: 1.6fr 1fr 1.6fr 0.72fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    width: 100vw;
    height: 100vh;

    background-color: var(--black);

    background-color: hsla(211.57894736842098, 8%, 58%, 1);
    background-image: radial-gradient(
        circle at 15% 85%,
        hsla(0, 0%, 0%, 1) 19%,
        transparent 84%
      ),
      radial-gradient(circle at 31% 1%, var(--random-tint), transparent 85%),
      radial-gradient(
        circle at 88% 87%,
        hsla(209.99999999999997, 6%, 38%, 1) 3.6400864520532363%,
        transparent 75.20902830975928%
      ),
      radial-gradient(
        circle at 30% 27%,
        hsla(209.99999999999997, 6%, 38%, 1) 14%,
        transparent 90%
      );
    background-blend-mode: normal, normal, normal, normal;

    &__div1 {
      grid-area: 1 / 1 / 4 / 3;
    }

    &__div2 {
      grid-area: 2 / 4 / 4 / 5;

      .cat-sheet__avatar {
        object-fit: contain !important;
      }
    }

    &__div3 {
      grid-area: 4 / 1 / 5 / 3;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      padding-left: var(--spacing-m);

      cursor: pointer;

      transform-origin: left center;

      &:hover {
        filter: blur(2.4px);
        transform: scale(1.2);
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
          padding-left: var(--spacing-m);
          padding-bottom: var(--spacing-m);
          padding-top: var(--spacing-m);
          position: relative;

          & > div {
            max-height: 20vh;
            overflow-y: scroll;
            text-align: right;
            font-size: calc(var(--base-ft-size) * 1.2);
            width: 100%;
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
            font-size: calc((var(--base-ft-size) * 6));
            line-height: calc((var(--base-ft-size) * 5));
          }
        }

        &__publication {
          align-self: flex-start;
          padding: 0 var(--spacing-m);
          margin-top: var(--spacing-s);
          color: var(--gray);
          background-color: var(--white);
          @include ft-s(medium);
          font-style: italic;
          text-align: left;
        }
      }
    }

    &__div6 {
      grid-area: 4 / 3 / 5 / 5;
      text-align: right;
      padding: 0 var(--spacing-m);

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

    &__div7 {
      grid-area: 1 / 1 / 5 / 2;
      // background-color: black;
    }

    &__div8 {
      grid-area: 1 / 2 / 5 / 2;
      // background-color: black;
    }

    & > div {
      position: relative;
      .cat-sheet__avatar {
        display: block;
        width: 100%;
        height: 100%;
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
          background-color: black;

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

          justify-content: center;
          padding: 0;

          .cat-sheet__trigger {
            position: relative;
            z-index: 2;
            @include ft-s(20);
          }
        }

        &__div4 {
          grid-area: 2 / 3 / 3 / 4;
          gap: var(--spacing-s);

          .cat-sheet__details {
            top: -6.4vh;

            &__info {
              @include ft-s(small);
              top: 28%;
            }

            &__status {
              margin-top: var(--spacing-s);
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
              margin-bottom: var(--spacing-s);
            }

            &__description {
              margin-top: var(--spacing-l);
              padding-right: var(--spacing-s);
              padding-bottom: 0;

              width: 56vw;

              & > div {
                text-align: right;
                overflow-y: visible;
                height: 164px;
                font-size: calc(var(--base-ft-size) * 0.72);
              }
            }
          }
        }

        &__div5 {
          grid-area: 1 / 2 / 2 / 4;
          align-items: flex-end;

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
              color: var(--black);
              width: auto;
              align-self: flex-end;
              @include ft-s(small);
            }
          }
        }

        &__div6 {
          grid-area: 3 / 3 / 4 / 4;
          padding: var(--spacing-s);
          align-content: flex-end;

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

@media screen and (max-height: 720px) {
  body {
    .cat-sheet {
      &__grid {
        &__div6 {
          height: 32vh;
        }
      }

      &__details {
        top: -6.4vh;
      }
    }
  }
}
</style>
