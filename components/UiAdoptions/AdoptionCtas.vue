<template>
  <div class="md:basis-1/2 basis-full flex flex-col justify-center md:ml-10">
    <img :alt="cats" class="md:p-0 p-2 mt-4" :src="banner" />

    <div class="flex flex-col aligns-center items-center mb-4 mt-10">
      <h2
        class="font-bold text-center inline-block mb-4 text-base leading-tight"
      >
        Pour Les Rencontrer, <br />
        et Écrire avec Eux Leur Histoire :
      </h2>

      <div class="text-xs mt-2">
        <a
          href="https://lespetitsclochards.fillout.com/pre-adoption"
          target="_blank"
        >
          <Badge>Formulaire d'adoption</Badge>
        </a>
      </div>

      <div class="text-xs mt-2" v-if="foster">
        <a
          href="https://lespetitsclochards.fillout.com/chatmille-accueil"
          target="_blank"
        >
          <Badge>Formulaire d'accueil</Badge>
        </a>
      </div>

      <div class="text-xs mt-2">
        <a href="tel:+33642804318" target="_blank">
          <Badge>06 42 80 43 18 (Mme Bonniot)</Badge>
        </a>
      </div>

      <div class="text-xs mt-2">
        <a href="mailto:lespetitsclochards91@gmail.com" target="_blank">
          <Badge>lespetitsclochards91@gmail.com</Badge>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  cats: string;
  banner: string;
  foster?: boolean;
};

defineProps<Props>();
</script>
