<template>
  <div class="md:basis-1/2 basis-full md:mr-10">
    <h2 class="text-left text-base mt-4">
      <span class="font-bold">{{ name }}</span>
    </h2>
    <p class="text-xs">{{ ageSexDob }}</p>
    <div class="h-px bg-slate-400 mb-4"></div>
    <p class="text-xs min-h-24 flex flex-col items-start justify-center">
      <span class="inline-block" v-if="isSterilised && isMale"
        >- Castré, identifié.</span
      >
      <span class="inline-block" v-if="isSterilised && !isMale"
        >- Stérélisée, identifiée.</span
      >
      <!-- Description -->
      <slot></slot>
    </p>
    <div class="h-px bg-slate-400 mt-4 mb-2"></div>
    <p class="text-xs">
      <span class="font-bold">{{ highlightTrait }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
type Cat = {
  name: string;
  ageSexDob: string;
  isMale?: boolean;
  isSterilised?: boolean;
  highlightTrait: string;
};

defineProps<Cat>();
</script>
