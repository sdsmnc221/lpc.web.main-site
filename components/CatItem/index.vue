<template>
  <div class="cat-item">
    <Sheet :open="defaultOpen" @update:open="onOpen">
      <SheetTrigger>
        <prismic-image
          class="cat-item__photo"
          :field="catHasAvatar ? catphoto : avatarPlaceholder"
        />

        <h4 class="cat-item__name">
          <span class="albert-sans-bold">{{ catname }}</span>
        </h4>

        <div class="cat-item__explore">
          <span>+ Fiche</span>
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

      <SheetContent side="bottom">
        <SheetHeader class="cat-item__fiche">
          <SheetTitle>
            <prismic-image
              class="cat-item__fiche__avatar"
              :class="{ '--placeholder': !catHasAvatar }"
              :field="catHasAvatar ? catphoto : avatarPlaceholder"
            />
          </SheetTitle>
          <SheetDescription>
            <div class="cat-item__fiche__content">
              <h4 class="cat-item__fiche__title">
                <span class="albert-sans-bold size-medium">{{ catname }}</span>
              </h4>

              <p class="cat-item__fiche__status albert-sans-regular size-20">
                <span v-if="adoptionstatus">{{ adoptionstatus }} </span>
                <span v-if="catsexe"> {{ catsexe }}</span>
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
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <p class="cat-item__fiche__footer albert-sans-light size-regular">
            Fiche publiée le {{ createddate }}
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  id: string;
  createddate: string;
  catphoto: Image;
  catname: string;
  catsexe?: string;
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

const router = useRouter();

const props = defineProps<CatInfo>();

const catHasAvatar = computed(() => props.catphoto.hasOwnProperty("url"));

const hasInfo = computed(
  () =>
    props.catbirth || props.zipcode || (props.catagenumber && props.catagetype)
);

const defaultOpen = ref(false);
const onOpen = (opened: boolean) => {
  if (opened) {
    router.push({
      name: router.currentRoute.value.name,
      query: { id: props.id },
    });
    defaultOpen.value = true;
  } else {
    router.push({
      name: router.currentRoute.value.name,
    });
  }
};

watch(
  () => router.currentRoute.value,
  (newRoute, oldRoute) => {
    if (!newRoute.query.id) {
      defaultOpen.value = false;
    } else {
      setTimeout(() => {
        defaultOpen.value = props.id === newRoute.query.id;
      }, 320);
    }
  },
  { immediate: true, deep: true }
);
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
    transform: translateY(var(--spacing-l));
  }
  &:nth-of-type(2n) {
    transform: translateY(calc(var(--spacing-l) * -1));
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
    aspect-ratio: 1/1;
    object-fit: cover;
    background-color: var(--gray);
    border-radius: 32px;
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

    span {
      @include ft-s(xxlarge);
      line-height: calc((var(--base-ft-size) * 4));
    }
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
    transition: all ease-in-out 0.64s;

    &:hover {
      background-color: var(--black);
    }

    * {
      @include ft-s(20);
      text-transform: uppercase;
    }
  }

  &__info {
    text-align: left;
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

      &:nth-of-type(n) {
        transform: translateY(var(--spacing-m));
      }

      &:nth-of-type(2n) {
        transform: translateY(0);
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
</style>

<style lang="scss">
@container app (min-width: 700px) {
  .cat-item {
    width: 32% !important;
    // max-width: 220px;

    &__name {
      min-width: 32%;
    }
  }
}

@container app (max-width: 699px) {
  .adoptions-group {
    .cat-item {
      width: 72vw;

      &__name {
        span {
          @include ft-s(xlarge);
        }
      }

      &__info {
        * {
          @include ft-s(20);
        }

        flex-direction: column;
        gap: var(--spacing-m);
        bottom: 16%;

        &:nth-of-type(n) {
          transform: translateY(0);
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
        top: 50% !important;
        left: -2px !important;
        transform: translateY(-50%) !important;
        width: 32% !important;
        height: 100% !important;
        border-radius: 0 32px 32px 0 !important;

        &.--placeholder {
          object-fit: contain !important;
        }
      }
    }
  }
}

@media screen and (max-height: 720px) {
  .cat-item {
    &__fiche {
      height: 66vh !important;

      &__avatar {
        top: -24% !important;
      }
    }
  }
}
</style>
