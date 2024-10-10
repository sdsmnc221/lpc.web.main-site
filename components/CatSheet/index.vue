<template>
  <div class="cat-sheet" :class="{ '--hidden': !internalOpen }">
    <div class="cat-sheet__trigger" @click="closeSheet">Close</div>
    <div class="cat-sheet__gallery">
      <prismic-image
        class="cat-item__fiche__avatar"
        :class="{ '--placeholder': !catHasAvatar }"
        :field="catHasAvatar ? catphoto : avatarPlaceholder"
      />
    </div>
    <div class="cat-sheet__details">
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
            <Badge> Vaccination : {{ catvaccination ? "✅" : "❌" }} </Badge>
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
    </div>

    <div class="cat-sheet__footer">
      <p class="cat-item__fiche__footer albert-sans-light size-regular">
        Fiche publiée le {{ createddate }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import type { CatInfo } from "~/interfaces/Cat";

interface CatSheetInfo extends CatInfo {
  open: boolean;
}

const props = defineProps<CatSheetInfo>();

const emits = defineEmits(["update:open"]);

const internalOpen = ref<boolean>(props.open);

const catHasAvatar = computed(() => props.catphoto?.hasOwnProperty("url"));

const hasInfo = computed(
  () =>
    props.catbirth || props.zipcode || (props.catagenumber && props.catagetype)
);

const closeSheet = () => {
  internalOpen.value = false;
};

watch(
  () => props.open,
  (newOpen) => {
    internalOpen.value = newOpen;
  }
);

watch(
  () => internalOpen.value,
  (newOpen) => {
    emits("update:open", newOpen);
  }
);
</script>

<style lang="scss" scoped>
.cat-sheet {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;

  z-index: 9;

  background-color: red;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  &.--hidden {
    display: none;
  }
}
</style>
