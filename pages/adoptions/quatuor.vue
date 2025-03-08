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
          <img
            alt=""
            src="/quatuor/cta-left.png"
            class="w-[48px] h-[48px] scale-x-[-1] invert"
          />
          <img alt="" src="/quatuor/cta-play.png" class="w-[48px] h-[48px]" />
          <img alt="" src="/quatuor/cta-right.png" class="w-[48px] h-[48px]" />
        </figure>
      </section>

      <section class="quatuor__title">
        <h1 class="w-[72vw] text-fuchsia-200 font-bold font-serif text-xl">
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

    <div class="pt-2">
      <h2 class="text-fuchsia-200 px-[10vw] font-bold text-base">
        Nos Quatre Mélodies de Féminité
      </h2>

      <section>
        <CardContainer>
          <CardBody
            class="flex flex-row flex-wrap justify-center items-center w-full max-h-[50vh] p-4 gap-2 rounded-2xl"
          >
            <CardItem
              :translate-z="0"
              :translate-y="0"
              :translate-x="0"
              class="w-[48%] h-full"
            >
              <TransitionGroup
                tag="div"
                class="flex flex-col gap-2 h-full"
                :css="false"
                @enter="animateText"
              >
                <div
                  :key="`name-${musicIndex}`"
                  class="shadow-xl font-bold text-left bg-fuchsia-200 pl-4 rounded-tr-3xl"
                >
                  <h3 class="text-xl">{{ musics[musicIndex].name }}</h3>
                  <p class="text-sm leading-[0.2rem] pb-3 font-serif">
                    {{ musics[musicIndex].subtitle }}
                  </p>
                </div>

                <p
                  :key="`description-${musicIndex}`"
                  class="shadow-xl h-full text-xs text-pink-100 bg-pink-900 p-2 flex flex-col gap-2 justify-end items-end rounded-bl-2xl rounded-tr-3xl"
                >
                  <span class="font-bold font-serif highlight-text">
                    {{ musics[musicIndex].highlight }} :
                  </span>
                  <span
                    class="text-[11px] inline-block pl-2 pb-2 leading-none description-text"
                  >
                    {{ musics[musicIndex].description }}
                  </span>
                </p>
              </TransitionGroup>
            </CardItem>
            <CardItem
              :translate-z="0"
              :translate-y="0"
              :translate-x="0"
              class="w-[40%] h-full flex flex-col gap-2"
            >
              <img
                alt=""
                :src="musics[musicIndex].img"
                class="shadow-xl w-full h-[80%] object-cover object-top rounded-none rounded-br-xl"
              />
              <p
                class="shadow-xl h-[19%] flex justify-center uppercase bg-pink-700 text-pink-200 items-center text-center text-xs rounded-2xl"
              >
                <a :href="musics[musicIndex].link" target="_blank"
                  >Voir sa fiche !</a
                >
              </p>
            </CardItem>
          </CardBody>
        </CardContainer>

        <figure
          class="music-player--small my-2 py-2 relative border-b-[10px] border-fuchsia-200 w-[80vw] m-auto mt-[-20px] flex justify-around items-center"
        >
          <img
            alt=""
            src="/quatuor/cta-left.png"
            class="w-[24px] h-[24px] scale-x-[-1]"
            @click="incrementIndex"
          />
          <img
            alt=""
            src="/quatuor/cta-play.png"
            class="w-[24px] h-[24px] invert"
          />
          <img
            alt=""
            src="/quatuor/cta-right.png"
            class="w-[24px] h-[24px]"
            @click="decrementIndex"
          />
        </figure>
      </section>

      <section class="quatuor__cards">
        <figure
          class="flex w-[80vw] m-auto py-4 flex-wrap gap-[20px] justify-center items-center"
        >
          <img
            v-for="(music, index) in musics"
            :key="`music-thumbnail-${music.name}`"
            :alt="`Découvrez notre ${music.name}`"
            :src="music.img"
            class="w-[20%] h-[20%] rounded-xl object-cover"
            @click="musicIndex = index"
          />
        </figure>
      </section>
    </div>

    <div class="pt-4">
      <h2 class="text-fuchsia-200 px-[10vw] font-bold text-base leading-none">
        Une Symphonie qui s'accorde lentement
      </h2>

      <div
        class="shadow-xl flex justify-center items-center gap-2 mx-[8vw] mt-2 text-fuchsia-950 text-xs leading-none p-2 text-sm bg-fuchsia-100 rounded-xl"
      >
        <figure class="w-[48px] h-[48px] invert">
          <img alt="" class="w-full h-full" src="/quatuor/cta-play.png" />
        </figure>
        <p class="basis-full">
          Chacune joue sa propre partition, à son propre tempo. C'est dans cette
          désynchronisation que réside la beauté de leur cohabitation - une
          métaphore de ces voix féminines qui, à travers l'histoire, n'ont pas
          toujours marché au même pas mais ont toujours avancé ensemble.
        </p>
      </div>
    </div>

    <div class="pt-2">
      <figure>
        <img
          alt="L'histoire de Cacaille"
          src="/quatuor/cacaille-story.png"
          class="w-[102vw] h-auto relative left[-10px]"
        />
      </figure>
      <h2
        class="text-fuchsia-200 px-[10vw] font-bold text-center mt-[-4vh] text-base leading-none"
      >
        L'histoire de Cacaille
      </h2>

      <p
        class="shadow-xl flex justify-center items-center gap-2 mx-[8vw] mt-2 text-fuchsia-100 text-xs text-center leading-none p-2 text-sm bg-fuchsia-900 rounded-xl"
      >
        Il y a 8 ans, Cacaille et Rufus arrivaient terrifiés à notre foyer. Lui
        se figeait, elle feulait et montrait les crocs. Aujourd'hui, Rufus a
        trouvé sa famille tandis que Cacaille, moins méfiante mais toujours
        indépendante, attend encore la sienne. Témoin de tant d'histoires, elle
        mérite désormais d'écrire la suite de la sienne au-delà des murs du
        foyer.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";

import AuroraBackground from "~/components/AuroraBackground.vue";
import CardContainer from "@/components/ThreeDeeCard/CardContainer.vue";
import CardBody from "@/components/ThreeDeeCard/CardBody.vue";
import CardItem from "@/components/ThreeDeeCard/CardItem.vue";

const emits = defineEmits(["animation-init-done"]);

const musicIndex = ref(0);

const musics = [
  {
    name: "Praline",
    subtitle: "L'Allegro Curieux",
    highlight: "Incarne la curiosité et l'audace",
    description:
      "Notre détective féline observe, enquête et participe à la vie du foyer, mais toujours selon ses propres règles. Elle ne peut résister à une enquête : un bruit mystérieux ? Elle sera la première sur les lieux !",
    img: "/quatuor/praline.jpg",
    link: "https://www.lespetitsclochards.fr/adoptions?id=ZsYjZBEAACIAY3tU",
  },
  {
    name: "Melba",
    subtitle: "L'Adagio Délicat'",
    highlight: "Représente la force tranquille",
    description:
      "Derrière sa douceur silencieuse se cache une profondeur insoupçonnée. Elle avance à son propre rythme, montrant que sensibilité et force peuvent coexister parfaitement. On la surprend souvent à observer le monde avec des yeux pleins d'envie, surtout en compagnie de ses amis.",
    img: "/quatuor/melba.jpg",
    link: "https://www.lespetitsclochards.fr/adoptions?id=ZsYjlBEAACUAY3uf",
  },
  {
    name: "Tagada",
    subtitle: "L'Andante Résilient",
    highlight: "Témoigne d'une résilience exceptionnelle",
    description:
      "Ayant perdu son frère Snoop, elle poursuit son chemin avec courage. Peureuse mais très joueuse et gourmande, elle continue sa socialisation avec une détermination touchante. Elle est déjà copine avec les caisses de transport - une petite victoire qui en dit long sur son chemin parcouru.",
    img: "/quatuor/tagada.jpg",
    link: "https://www.lespetitsclochards.fr/adoptions/snoop-tagada",
  },
  {
    name: "Cacaille",
    subtitle: "Le Capriccioso Sage",
    highlight: "Porte la richesse de l'expérience",
    description:
      "Rescapée d'un site d'empoisonnement, arrivée il y a 8 ans, elle est la mémoire vivante du foyer. Elle a transformé sa peur en prudence, sa méfiance en discernement. Tandis que son ancien compagnon Rufus a trouvé sa famille, elle attend encore la sienne, avec une patience profonde et une présence apaisante.",
    img: "/quatuor/cacaille.jpg",
    link: "https://www.lespetitsclochards.fr/adoptions?id=ZsYjfBEAACMAY3t5",
  },
];

const incrementIndex = () => {
  const tempIndex = musicIndex.value + 1;
  musicIndex.value = tempIndex === 4 ? 0 : tempIndex;
  console.log(musicIndex.value);
};

const decrementIndex = () => {
  const tempIndex = musicIndex.value - 1;
  musicIndex.value = tempIndex === -1 ? 3 : tempIndex;
};

const animateText = (el, done) => {
  const tl = gsap.timeline({
    onComplete: done,
  });

  // Split the elements you want to animate
  const name = document.querySelector("h3");
  const subtitle = document.querySelector("h3 + p");
  const highlight = document.querySelector(".highlight-text");
  const description = document.querySelector(".description-text");

  // Reset initial state
  gsap.set([name, subtitle, highlight, description], {
    opacity: 0,
    y: 20,
  });

  // Animate text elements
  tl.to(name, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.out",
  })
    .to(
      subtitle,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    )
    .to(
      highlight,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    )
    .to(
      description,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );
};
onMounted(() => {
  nextTick(() => emits("animation-init-done"));
});

definePageMeta({
  layout: "discover",
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

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
