<template>
  <h1 class="text-lg md:mt-4 md:w-1/2 md:text-left text-center m-auto">
    <img :src="banner" :alt="title" class="w-[720px] md:w-[640px] rounded-xl" />
    <span class="font-semibold text-2xl"> {{ title }} :</span>
    <br />
    <span class="font-normal"> {{ subtitle }}</span>
    <span class="font-bold">
      <TextHighlight
        :delay="320"
        text-end-color="hsl(var(--accent))"
        class="rounded-lg bg-gradient-to-r from-yellow-500 to-slate-500"
        >{{ highlight }}</TextHighlight
      ></span
    >
  </h1>
</template>

<script setup lang="ts">
import TextHighlight from "../TextHighlight.vue";

type Props = {
  banner: string;
  title: string;
  subtitle: string;
  highlight: string;
};

defineProps<Props>();
</script>
