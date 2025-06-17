<template>
  <!-- Left side image grid -->
  <div v-if="!photoGridsUni?.enable" class="w-2/5 h-screen grid grid-cols-3 grid-rows-3 gap-0">
    <div class="row-span-2">
      <img
        class="object-cover object-left inline-block w-full h-full"
        alt=""
        :src="photoGrids[0]"
      />
    </div>
    <div class="col-start-1 row-start-3">
      <img
        class="object-cover object-center inline-block w-full h-full"
        alt=""
        :src="photoGrids[1]"
      />
    </div>
    <div class="col-span-2 col-start-2 row-start-1">
      <img
        class="object-cover object-right-top inline-block w-full h-full"
        alt=""
        :src="photoGrids[2]"
      />
    </div>
    <div class="row-span-2 col-start-2 row-start-2">
      <img
        class="object-cover object-center inline-block w-full h-full"
        alt=""
        :src="photoGrids[3]"
      />
    </div>
    <div class="row-span-2 col-start-3 row-start-2">
      <img
        class="object-cover inline-block w-full h-full"
        alt=""
        :src="photoGrids[4]"
      />
    </div>
  </div>
  <div v-else :class="`photo-grids-uni w-2/5 h-svh md:h-screen flex justify-center items-end gap-0 bg-[${photoGridsUni.hex}]`" :style="{ backgroundColor: photoGridsUni.hex }">
    <img
      class="object-contain object-center inline-block md:h-1/2 md:w-auto h-auto w-full"
      alt=""
      :src="photoGridsUni.img"
      
  </div>
</template>

<script lang="ts" setup>
type Props = {
  photoGrids: string[];
  photoGridsUni?: {
    enable: boolean;
    img: string;
    hex: string;
  };
};

defineProps<Props>();
</script>
