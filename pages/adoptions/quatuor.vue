<template>
  <div class="fixed bg">
    <AuroraBackground
      class="aurora-background bg-fuchsia-950"
    ></AuroraBackground>
  </div>
  <div class="adoptions quatuor min-w-[100vw] min-h-[100vh] font">
    <div class="h-[100dvh]">
      <section class="quatuor__cover relative flex flex-col items-center">
        <figure class="w-[50vh] h-[50vh]">
          <img
            src="/quatuor/quatuor-cover.png"
            alt="Adoptez Notre Quatuor !"
            class="w-full h-full aspect-square object-cover relative rotate-[-24deg] top-[-10vh] left-[-10vw]"
          />
        </figure>
        <figure
          class="w-[50vh] h-[50vh] absolute top-[32%] left-[24%] rotate-[24deg] scale-[0.9] mix-blend-hard-light"
        >
          <img
            src="/quatuor/quatuor-h1.png"
            alt=""
            class="w-full h-full object-contain"
          />
        </figure>
        <figure
          class="music-player w-[100vw] flex justify-around items-center rotate-[24deg] mix-blend-hard-light"
        >
          <img alt="" src="/quatuor/cta-left.png" class="scale-x-[-1] invert" />
          <img alt="" src="/quatuor/cta-play.png" />
          <img alt="" src="/quatuor/cta-right.png" />
        </figure>
      </section>

      <section class="quatuor__title">
        <h1 class="w-[72vw] text-fuchsia-300 font-bold font-serif text-xl">
          Nouvelle mélodie unique chez Les Petits Clochards, ce 2025...!
        </h1>
        <p
          class="px-[10vw] pt-1 pb-4 w-full text-fuchsia-400 font-normal text-xs"
        >
          Quatre chattes, quatre histoires, quatre notes distinctes mais
          harmonieuses. Pour cette Journée internationale des femmes, découvrez
          notre quatuor féminin : Praline, Melba, Tagada et Cacaille.
        </p>
      </section>
    </div>

    <div class="h-[100dvh]">
      <h2 class="text-fuchsia-300 px-[10vw] font-bold text-base">
        Nos Quatre Mélodies de Féminité
      </h2>

      <section>
        <CardContainer>
          <CardBody
            class="flex flex-col justify-start items-start bg-fuchsia-100 w-full p-4 gap-2 rounded-2xl"
          >
            <CardItem class="w-full h-[40%]">
              <img
                alt=""
                src="/quatuor/praline.jpg"
                class="w-full h-full object-cover object-top rounded-xl"
              />
            </CardItem>
            <CardItem>
              <h3 class="font-bold text-xl">Praline - L'Allegro Curieux</h3>
            </CardItem>
            <CardItem>
              <p class="text-sm">
                <TextHighlight
                  :delay="640"
                  class="rounded-lg bg-gradient-to-r from-fuchsia-200 to-rose-500"
                >
                  Incarne la curiosité et l'audace :</TextHighlight
                >
                notre détective féline observe, enquête et participe à la vie du
                foyer, mais toujours selon ses propres règles. Elle ne peut
                résister à une enquête : un bruit mystérieux ? Elle sera la
                première sur les lieux !
              </p>
            </CardItem>
          </CardBody>
        </CardContainer>
      </section>

      <section class="quatuor__cards">
        <figure class="flex w-[100vw] p-4 flex-wrap gap-[20px] justify-around">
          <img
            alt="Découvrez notre Pralinounette"
            src="/quatuor/praline.jpg"
            class="w-[20%] h-[20%] rounded-xl object-cover"
          />
          <img
            alt="Découvrez notre Melbanette"
            src="/quatuor/melba.jpg"
            class="w-[20%] h-[20%] rounded-xl object-cover"
          />
          <img
            alt="Découvrez notre Tagadanun"
            src="/quatuor/tagada.jpg"
            class="w-[20%] h-[20%] rounded-xl object-cover"
          />
          <img
            alt="Découvrez notre Cacailloune"
            src="/quatuor/cacaille.jpg"
            class="w-[20%] h-[20%] rounded-xl object-cover"
          />
        </figure>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuroraBackground from "~/components/AuroraBackground.vue";
import CardContainer from "@/components/ThreeDeeCard/CardContainer.vue";
import CardBody from "@/components/ThreeDeeCard/CardBody.vue";
import CardItem from "@/components/ThreeDeeCard/CardItem.vue";

const emits = defineEmits(["animation-init-done"]);

onMounted(() => {
  nextTick(() => emits("animation-init-done"));
});

definePageMeta({
  layout: "discover",
});
</script>

<style lang="scss">
* {
  text-wrap: balance;
}

.bg {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: -1;
}

.aurora-background {
  div div {
    --aurora: repeating-linear-gradient(
      100deg,
      #3e0647 10%,
      #b191b5 15%,
      #c7a7cb 20%,
      #b191b5 25%,
      #9a7b9f 30%
    );
  }
}

.discover .quatuor {
  img {
    filter: grayscale(0);
  }

  h1 {
    margin: 10vh 10vw !important;
    margin-bottom: 0 !important;
  }
  .music-player {
    img {
      filter: invert(0.8) !important;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: -20vw;
      width: 200vw;
      height: 1px;
      background-color: #3e0647;
    }
  }
}
</style>
