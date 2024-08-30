<template>
  <div class="cat-item">
    <Drawer>
      <DrawerTrigger>
        <prismic-image
          class="cat-item__photo"
          :field="catHasAvatar ? catphoto : avatarPlaceholder"
        />

        <h4 class="cat-item__name">
          <span class="albert-sans-bold">{{ catname }}</span>
        </h4>

        <div class="cat-item__info albert-sans-light size-regular">
          <p v-if="catagenumber && catagetype">
            {{ catagenumber }} {{ catagetype }}
          </p>
          <p v-if="adoptionstatus">
            {{
              adoptionstatus.replace("Adoptable -", "").replace("Adopté - ", "")
            }}
          </p>
        </div>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader class="cat-item__fiche">
          <DrawerTitle>
            <prismic-image
              class="cat-item__fiche__avatar"
              :field="catHasAvatar ? catphoto : avatarPlaceholder"
            />
          </DrawerTitle>
          <DrawerDescription>
            <div class="cat-item__fiche__content">
              <h4 class="cat-item__fiche__title">
                <span class="albert-sans-bold size-medium">{{ catname }}</span>
              </h4>

              <p class="cat-item__fiche__status albert-sans-regular size-20">
                {{ adoptionstatus }}
              </p>

              <div class="cat-item__fiche__row">
                <div class="cat-item__fiche__info" v-if="hasInfo">
                  <p v-if="catagenumber && catagetype">
                    Âge : {{ catagenumber }} {{ catagetype }}
                  </p>
                  <p v-if="catbirth">Né.e le : {{ catbirth }}</p>
                  <p v-if="zipcode">Zone : {{ zipcode }}</p>
                </div>

                <div class="cat-item__fiche__badges">
                  <Badge>{{ catidentification }}</Badge>
                  <Badge>
                    Vaccination : {{ catvaccination ? "✅" : "❌" }}
                  </Badge>
                  <Badge>
                    Stérilisation : {{ catsterilization ? "✅" : "❌" }}
                  </Badge>
                </div>
              </div>

              <div class="cat-item__fiche__footnote">
                <Separator label="Contact" />
                <prismic-rich-text :field="contactInfo" />
              </div>

              <div class="cat-item__fiche__footnote">
                <Separator label="Contrat d'adoption" />
                <prismic-rich-text :field="adoptionRequirements" />
              </div>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <p class="cat-item__fiche__footer albert-sans-light size-regular">
            Fiche publiée le {{ createddate }}
          </p>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
// import ItemDrawer from "@/components/ItemDrawer/index.vue";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type Image = {
  dimensions: {
    width: number;
    height: number;
  };
  alt: null | string;
  copyright: null | string;
  url: string;
  id: string;
  edit: any;
};

type CatInfo = {
  createddate: string;
  catphoto: Image;
  catname: string;
  catbirth: string;
  catagenumber?: number;
  catagetype?: string;
  catdescription?: any;
  catidentification?: string;
  catvaccination?: boolean;
  catsterilization?: boolean;
  zipcode?: null | number;
  relatedcat?: any | null;
  adoptionstatus?: string;
  contactInfo?: any;
  adoptionRequirements?: any;
  avatarPlaceholder?: Image;
};

const props = defineProps<CatInfo>();

const catHasAvatar = computed(() => props.catphoto.hasOwnProperty("url"));

const hasInfo = computed(
  () =>
    props.catbirth || props.zipcode || (props.catagenumber && props.catagetype)
);

onMounted(() => console.log(props));
</script>

<style lang="scss" scoped>
@import "@/styles/imports";

.cat-item {
  width: 50%;
  margin-bottom: var(--spacing-m);
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-s);
  }

  &__photo {
    display: block;
    aspect-ratio: 1/1;
    object-fit: cover;
    width: 150px;
    background-color: var(--gray);
    border-radius: 32px;
  }

  &__name {
    text-align: center;
    text-transform: uppercase;
    position: relative;
    border: thin solid var(--gray);
    max-width: 120px;
    min-width: 64%;

    span {
      @extend .size-16;
    }
  }

  &__info {
    text-align: center;
    margin-top: calc(var(--spacing-s) * -1);
    padding: calc(var(--spacing-s) * 0.5);
    position: relative;

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

  &__fiche {
    height: 52vh;
    position: relative;

    &__avatar {
      top: -32%;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
      display: block;
      aspect-ratio: 1/1;
      object-fit: cover;
      width: 172px;
      background-color: var(--gray);
      border-radius: 50%;
    }

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

@container app (min-width: 700px) {
  .cat-item {
    width: 32%;

    &__name {
      min-width: 32%;
    }
  }
}

@container app (min-width: 1000px) {
  .cat-item {
    width: 25%;
  }
}

@media screen and (min-width: 700px) {
  .cat-item {
    &__fiche {
      height: 64vh;

      &__avatar {
        top: -32%;
        width: 320px;
        z-index: 10;
      }

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
      &__avatar {
        top: 50%;
        left: 10%;
        transform: translate(0, -50%);
      }
    }
  }
}

@media screen and (min-width: 1000px) {
  .cat-item {
    &__fiche {
      &__avatar {
        top: 50%;
        left: 10%;
        transform: translate(-10%, -50%);
      }
    }
  }
}
</style>
