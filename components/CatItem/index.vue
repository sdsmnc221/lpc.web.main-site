<template>
  <div class="cat-item">
    <prismic-image class="cat-item__photo" :field="catphoto" />

    <h4 class="cat-item__name">
      <span class="albert-sans-bold">{{ catname }}</span>
    </h4>

    <div class="cat-item__info albert-sans-light size-regular">
      <p>{{ catage }} an(s)</p>
      <p>
        {{ adoptionstatus.replace("Adoptable -", "").replace("Adopté - ", "") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
type CatInfo = {
  createddate: string;
  catphoto: {
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
  catname: string;
  catage: number;
  catbirth: string;
  catdescription: any;
  catidentification: string;
  catvaccination: boolean;
  catsterilization: boolean;
  zipcode: null | number;
  relatedcat: any | null;
  adoptionstatus: string;
};

const props = defineProps<CatInfo>();
</script>

<style lang="scss">
@import "@/styles/imports";

.cat-item {
  width: 50%;
  display: flex;
  gap: var(--spacing-s);
  margin-bottom: var(--spacing-m);
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
}
</style>
