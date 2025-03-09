<template>
  <div class="fixed bg">
    <AuroraBackground
      class="aurora-background bg-fuchsia-950"
    ></AuroraBackground>
  </div>
  <div class="adoptions quatuor min-w-[100vw] min-h-[100vh] font">
    <div class="h-[100dvh]">
      <section class="quatuor__cover relative flex flex-col items-center">
        <figure class="w-[50vh] md:w-[50vw] h-[50vh] md:h-[50vw]">
          <img
            src="/quatuor/quatuor-cover.png"
            alt="Adoptez Notre Quatuor !"
            class="w-full h-full aspect-square object-cover relative rotate-[-2.4deg] top-[-8vh] left-[6vw] md:left-[-16vw]"
          />
        </figure>
        <figure
          class="w-[50vh] h-[50vh] absolute top-[38%] md:top-[24%] left-[8%] md:left-[56vw] rotate-[24deg] md:rotate-[-24deg] scale-[0.8] md:scale-[1.6] mix-blend-hard-light"
        >
          <img
            src="/quatuor/quatuor-h1.png"
            alt=""
            class="w-full h-full object-contain"
          />
        </figure>
        <figure
          class="music-player w-[100vw] md:w-[100vw] flex justify-around md:justify-end items-center rotate-[24deg] md:rotate-[-24deg] relative top-[5vh] md:top-[-8vh] md:gap-[10%] mix-blend-hard-light"
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

      <section
        class="quatuor__title md:rotate-[-24deg] relative md:top-[-30vh] md:translate-x-[44vw] md:w-[50vw]"
      >
        <h1
          class="w-[72vw] md:w-full text-fuchsia-200 font-bold font-serif text-xl"
        >
          Nouvelle mélodie unique chez Les Petits Clochards, ce 2025...!
        </h1>
        <p
          class="px-[10vw] md:px-[4vw] md:pl-[10vw] pt-1 pb-4 w-full text-fuchsia-400 font-normal text-xs"
        >
          Quatre chattes, quatre histoires, quatre notes distinctes mais
          harmonieuses. Pour cette Journée internationale des femmes, découvrez
          notre quatuor féminin : Praline, Melba, Tagada et Cacaille.
        </p>
      </section>
    </div>

    <div class="containered flex flex-col md:flex-row md:w-full relative">
      <div class="mt-0 md:w-[100%] md:mt-[32vh]">
        <h2 class="text-fuchsia-200 px-[10vw] font-bold text-base">
          Nos Quatre Mélodies de Féminité
        </h2>

        <div
          class="flex flex-col containered containered__cards md:flex-row md:w-full md:px-20"
        >
          <section class="basis-full md:basis-auto md:px-10 relative">
            <CardContainer>
              <CardBody
                class="flex flex-row flex-wrap justify-center items-center w-full md:w-[50vh] max-h-[50vh] p-4 gap-2 rounded-2xl"
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
                      class="shadow-xl font-bold text-left bg-fuchsia-200 pl-2 rounded-tr-3xl"
                    >
                      <h3 class="text-xl">{{ musics[musicIndex].name }}</h3>
                      <p
                        class="text-sm leading-[0.2rem] tracking-[-0.2px] pb-3 font-serif"
                      >
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
              class="music-player--small my-2 py-2 relative border-b-[2px] md:border-b-0 border-fuchsia-200 w-[80vw] md:w-[64%] m-auto mt-[-20px] flex justify-around items-center"
            >
              <img
                alt=""
                src="/quatuor/cta-left.png"
                class="w-[24px] md:w-[40px] h-[24px] md:h-[40px] scale-x-[-1]"
                @click="incrementIndex"
              />
              <img
                alt=""
                src="/quatuor/cta-play.png"
                class="w-[24px] md:w-[40px] h-[24px] md:h-[40px] invert"
              />
              <img
                alt=""
                src="/quatuor/cta-right.png"
                class="w-[24px] md:w-[40px] h-[24px] md:h-[40px]"
                @click="decrementIndex"
              />
            </figure>
          </section>

          <section class="quatuor__cards md:basis-full">
            <figure
              class="flex w-[80vw] md:w-[100%] xs-w-90vw m-auto md:ml-0 py-4 flex-wrap gap-[20px] md:gap-4 justify-center items-center"
            >
              <img
                v-for="(music, index) in musics"
                :key="`music-thumbnail-${music.name}`"
                :alt="`Découvrez notre ${music.name}`"
                :src="music.img"
                class="w-[20%] md:w-[10vw] h-[20%] md:h-[32vh] rounded-xl object-cover"
                @click="musicIndex = index"
              />
            </figure>
          </section>
        </div>
      </div>

      <div
        class="quatuor__symphony mt-8 md:absolute md:w-[64vw] md:bottom-[2vh] md:right-0"
      >
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
            Chacune joue sa propre partition, à son propre tempo. C'est dans
            cette désynchronisation que réside la beauté de leur cohabitation -
            une métaphore de ces voix féminines qui, à travers l'histoire, n'ont
            pas toujours marché au même pas mais ont toujours avancé ensemble.
          </p>
        </div>
      </div>
    </div>

    <div
      class="containered containered__has-cacaille flex flex-col md:flex-row w-full md:mt-[24vh]"
    >
      <div class="mt-4 md-w-[40%]">
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
          Il y a 8 ans, Cacaille et Rufus arrivaient terrifiés à notre foyer.
          Lui se figeait, elle feulait et montrait les crocs. Aujourd'hui, Rufus
          a trouvé sa famille tandis que Cacaille, moins méfiante mais toujours
          indépendante, attend encore la sienne. Témoin de tant d'histoires,
          elle mérite désormais d'écrire la suite de la sienne au-delà des murs
          du foyer.
        </p>
      </div>

      <div
        class="quatuor__complexe mt-10 md:w-[60%] flex flex-col md:flex-row flex-wrap"
      >
        <h2
          class="text-fuchsia-200 px-[10vw] md:px-0 md:basis-full font-bold text-base leading-none"
        >
          Pourquoi choisir une Mélodie Complexe?
        </h2>

        <figure class="md:w-[50%]">
          <video
            alt=""
            src="/quatuor/rufus.mp4"
            controls
            loop
            muted
            autoplay
            class="mt-2 shadow-xl"
          />
        </figure>

        <div
          class="flex flex-col md:w-[50%] justify-center items-center gap-2 mx-[8vw] md:mx-0 md:px-10 md:mt-[-2vh]"
        >
          <p class="text-fuchsia-100 mt-4 text-center text-sm leading-tight">
            Adopter l'une de nos musiciennes, c'est faire le choix d'une
            composition qui se dévoile progressivement:
          </p>

          <div
            class="w-full shadow-xl mt-3 p-4 text-xs leading-none flex flex-col gap-2 justify-start items-start bg-pink-900 text-fuchsia-200 rounded-2xl"
          >
            <span class="font-serif font-bold">Victoires partagées</span>

            <div class="flex w-full">
              <figure
                class="music-player--small relative w-[10vw] flex justify-between items-center"
              >
                <img
                  alt=""
                  src="/quatuor/cta-left.png"
                  class="w-[16px] h-[16px] scale-x-[-1]"
                  @click="incrementIndex"
                />
                <img
                  alt=""
                  src="/quatuor/cta-play.png"
                  class="w-[16px] h-[16px] invert"
                />
                <img
                  alt=""
                  src="/quatuor/cta-right.png"
                  class="w-[16px] h-[16px]"
                  @click="decrementIndex"
                />
              </figure>
              <span
                class="shadow-xl ml-6 w-[56vw] h-[3px] rounded-3xl bg-pink-200 relative self-center"
              >
                <span
                  class="shadow-xl w-[12%] h-[3px] absolute top-0 left-0 bg-pink-600 rounded-3xl"
                ></span>
                <span
                  class="shadow-xl w-[8px] h-[8px] absolute left-[12%] top-[50%] translate-y-[-50%] bg-pink-500 rounded-3xl"
                ></span>
              </span>
            </div>
            <span class="text-[12px]"
              >Chaque progrès devient un moment de joie mutuelle.</span
            >
          </div>

          <div
            class="w-full shadow-xl mt-2 p-4 text-xs leading-none flex flex-col gap-2 justify-start items-start bg-pink-900 text-fuchsia-200 rounded-2xl"
          >
            <span class="font-serif font-bold">Confiance précieuse</span>
            <div class="flex w-full">
              <figure
                class="music-player--small relative w-[10vw] flex justify-between items-center"
              >
                <img
                  alt=""
                  src="/quatuor/cta-left.png"
                  class="w-[16px] h-[16px] scale-x-[-1]"
                  @click="incrementIndex"
                />
                <img
                  alt=""
                  src="/quatuor/cta-play.png"
                  class="w-[16px] h-[16px] invert"
                />
                <img
                  alt=""
                  src="/quatuor/cta-right.png"
                  class="w-[16px] h-[16px]"
                  @click="decrementIndex"
                />
              </figure>
              <span
                class="shadow-xl ml-6 w-[56vw] h-[3px] rounded-3xl bg-pink-200 relative self-center"
              >
                <span
                  class="shadow-xl w-[24%] h-[3px] absolute top-0 left-0 bg-pink-600 rounded-3xl"
                ></span>
                <span
                  class="shadow-xl w-[8px] h-[8px] absolute left-[24%] top-[50%] translate-y-[-50%] bg-pink-500 rounded-3xl"
                ></span>
              </span>
            </div>
            <span class="text-[12px]"
              >Une fois gagnée, elle crée un lien unique.</span
            >
          </div>

          <div
            class="w-full shadow-xl mt-2 p-4 text-xs leading-none flex flex-col gap-2 justify-start items-start bg-pink-900 text-fuchsia-200 rounded-2xl"
          >
            <span class="font-serif font-bold">Personnalités établies</span>
            <div class="flex w-full">
              <figure
                class="music-player--small relative w-[10vw] flex justify-between items-center"
              >
                <img
                  alt=""
                  src="/quatuor/cta-left.png"
                  class="w-[16px] h-[16px] scale-x-[-1]"
                  @click="incrementIndex"
                />
                <img
                  alt=""
                  src="/quatuor/cta-play.png"
                  class="w-[16px] h-[16px] invert"
                />
                <img
                  alt=""
                  src="/quatuor/cta-right.png"
                  class="w-[16px] h-[16px]"
                  @click="decrementIndex"
                />
              </figure>
              <span
                class="shadow-xl ml-6 w-[56vw] h-[3px] rounded-3xl bg-pink-200 relative self-center"
              >
                <span
                  class="shadow-xl w-[36%] h-[3px] absolute top-0 left-0 bg-pink-600 rounded-3xl"
                ></span>
                <span
                  class="shadow-xl w-[8px] h-[8px] absolute left-[36%] top-[50%] translate-y-[-50%] bg-pink-500 rounded-3xl"
                ></span>
              </span>
            </div>
            <span class="text-[12px]"
              >Des compagnes matures sans surprises de comportement.</span
            >
          </div>

          <div
            class="w-full shadow-xl mt-2 p-4 text-xs leading-none flex flex-col gap-2 justify-start items-start bg-pink-900 text-fuchsia-200 rounded-2xl"
          >
            <span class="font-serif font-bold">Amour profond</span>
            <div class="flex w-full">
              <figure
                class="music-player--small relative w-[10vw] flex justify-between items-center"
              >
                <img
                  alt=""
                  src="/quatuor/cta-left.png"
                  class="w-[16px] h-[16px] scale-x-[-1]"
                  @click="incrementIndex"
                />
                <img
                  alt=""
                  src="/quatuor/cta-play.png"
                  class="w-[16px] h-[16px] invert"
                />
                <img
                  alt=""
                  src="/quatuor/cta-right.png"
                  class="w-[16px] h-[16px]"
                  @click="decrementIndex"
                />
              </figure>
              <span
                class="shadow-xl ml-6 w-[56vw] h-[3px] rounded-3xl bg-pink-200 relative self-center"
              >
                <span
                  class="shadow-xl w-[48%] h-[3px] absolute top-0 left-0 bg-pink-600 rounded-3xl"
                ></span>
                <span
                  class="shadow-xl w-[8px] h-[8px] absolute left-[48%] top-[50%] translate-y-[-50%] bg-pink-500 rounded-3xl"
                ></span>
              </span>
            </div>
            <span class="text-[12px]"
              >Différent mais d'une intensité incomparable.</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="containered flex flex-col md:flex-row w-full md:mt-[24vh]">
      <div class="mt-8">
        <h2 class="text-fuchsia-200 px-[10vw] font-bold text-base leading-none">
          Adoption ou Accueil
        </h2>

        <div class="mx-[10vw] flex flex-col items-start justify-start md:mt-4">
          <div class="text-xs mt-2">
            <a
              href="https://lespetitsclochards.fillout.com/pre-adoption"
              target="_blank"
            >
              <Badge>Formulaire d'adoption</Badge>
            </a>
          </div>

          <div class="text-xs mt-2">
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

      <div class="mt-8 md:basis-full">
        <h2 class="text-fuchsia-200 px-[10vw] font-bold text-base leading-none">
          Chat'Parrainage
        </h2>

        <div
          class="mx-[10vw] flex flex-col md:flex-row md:flex-wrap md:gap-10 items-start md:items-center justify-start"
        >
          <div class="text-xs mt-2 text-fuchsia-100">
            <p class="font-bold text-fuchsia-200">Pourquoi parrainer ?</p>
            <p>
              Depuis plus de 5 ans, nous travaillons à leur socialisation avec
              patience. Les adoptions sont rares et le coût du foyer est souvent
              couvert par nos bénévoles.
            </p>
          </div>

          <div class="text-xs mt-2 text-fuchsia-100 md-w-[50%]">
            <p class="font-bold text-fuchsia-200">Comment soutenir ?</p>
            <p class="mt-2">
              <a
                href="https://www.helloasso.com/associations/les-petits-clochards/formulaires/2"
                target="_blank"
              >
                <Badge>Chat'Parrainage sur HelloAsso</Badge>
              </a>
            </p>
            <p class="mt-2">
              <a
                href="https://www.teaming.net/lespetitsclochards"
                target="_blank"
              >
                <Badge>Rejoindre Teaming (1€/mois)</Badge>
              </a>
            </p>
          </div>

          <div class="text-xs mt-2 text-fuchsia-100">
            <p class="font-bold text-fuchsia-200">Notre engagement...!</p>
            <p>- Photos et nouvelles régulières</p>
            <p>- Suivi de leur évolution</p>
            <p>- Pâtée gourmande spéciale Journée des Femmes & Anniversaire</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 containered__containing-heartnote md:mt-[24vh]">
      <h2
        class="text-fuchsia-200 px-[10vw] relative md:z-[100] font-bold text-base md:text-2xl md:text-center leading-none"
      >
        Un Mot du Cœur...
      </h2>

      <figure
        class="w-[50vh] h-[50vh] absolute z-50 md:z-[2] left-[-56vw] md:left-0 md:scale-[2.4]"
      >
        <img alt="" class="w-full h-full turning" src="/quatuor/cd.png" />
      </figure>

      <div
        class="containered containered__heartnote flex flex-col md:flex-row w-full justify-stretch items-stretch"
      >
        <div
          class="shadow-xl flex min-h-[50vh] w-[104vw] md:w-[100vw] relative left-[-2vw] md:left-0 flex flex-col justify-center items-center gap-2 mt-2 md:mt-0 text-fuchsia-950 text-xs leading-none pl-[48%] md:pl-[44%] pr-[24px] text-sm md:text-base bg-fuchsia-100"
        >
          <p class="font-bold">
            Dans l'orchestre de nos vies, ces quatre chattes jouent des mélodies
            subtiles :
          </p>

          <p>Praline, une sonate vive aux mouvements imprévisibles;</p>
          <p>Melba, une berceuse aux nuances délicates;</p>
          <p>Tagada, un requiem devenu hymne d'espoir;</p>
          <p>et Cacaille, une ballade ancienne riche d'histoire.</p>
          <p class="font-bold">
            Devenir leur famille, parrain, marraine, c'est choisir de comprendre
            que parfois, les plus belles mélodies sont celles qui demandent de
            l'attention pour être appréciées.
          </p>
        </div>

        <figure class="shadow-xl w-full aspect-square h-auto mt-0">
          <img
            alt=""
            src="/quatuor/quatuor-finale.jpg"
            class="w-full h-full rounded-none"
          />
        </figure>
      </div>
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

.--adoptions-quatuor + footer {
  position: relative;
  z-index: 999;
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

  .xs-w-90vw {
    @media screen and (max-width: 320px) {
      width: 90vw !important;
      gap: 8px;
    }
  }
}

.turning {
  animation: turning 10s ease-in-out infinite;
}

@keyframes turning {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 1000px) and (min-width: 480px) and (max-height: 1100px) {
  .discover .quatuor {
    figure.music-player {
      top: 18vh;
    }

    .quatuor {
      &__cover {
        figure:first-child {
          width: 50vh;
          height: 50vh;

          img {
            left: 10vw;
            top: 2vh;
            transform: rotate(6deg);
          }
        }
        figure:nth-child(2) {
          left: 8vw;
          top: 30vh;
          transform: scale(1.2) rotate(-24deg) !important;
        }
      }

      &__title {
        left: -36vw;
        top: 11vh;
        width: 86vw;
      }
    }

    .containered {
      flex-direction: column;
      margin-top: 10vh;

      .music-player--small {
        border-bottom-width: 2px;
        width: 100%;
      }

      .quatuor__cards {
        figure {
          img {
            width: 12vw;
            height: 12vw;
          }
        }
      }

      .quatuor__symphony {
        width: 80%;
        margin: 40px auto;
        position: relative;
      }

      .quatuor__complexe {
        width: 100%;

        h2 {
          transform: translate(2vw, 2vh);
        }

        & > div:last-child {
          padding-right: 0;
        }

        & > figure {
          margin-top: 5vh;
        }
      }

      &__containing-heartnote {
        margin-top: 10vh;

        h2 {
          transform: translateY(8vh);
          text-align: right;
        }
      }

      &__heartnote {
        & > div:first-child {
          padding-left: 50%;
          padding-right: 10%;
        }

        figure {
          width: 100vw;
          transform: translateX(-4vw);
        }
      }
    }

    .turning {
      left: -6vw;
      width: 50vw;
      height: 50vw;
      top: 10vh;
      position: relative;
    }
  }
}

@media screen and (max-height: 1000px) and (min-height: 480px) and (max-width: 1100px) and (orientation: landscape) {
  .discover .quatuor {
    figure.music-player {
      top: 18vh;
    }

    .quatuor {
      &__cover {
        figure:first-child {
          width: 50vw;
          height: 50vh;

          img {
            left: 17vw;
            top: 0vh;
            transform: rotate(6deg);
          }
        }
        figure:nth-child(2) {
          left: 18vw;
          top: 38vh;
          transform: scale(1.6) rotate(-24deg) !important;
        }
      }

      &__title {
        left: -14vw;
        top: -2vh;
        width: 86vw;
      }
    }

    .containered {
      flex-direction: column;
      margin-top: 10vh;

      &__cards {
        flex-direction: row;
        margin-top: 4vh;
      }

      &__has-cacaille {
        flex-direction: row;

        & > div:first-child {
          transform: scale(1.12) translateX(-1vw) translateY(9vh);
        }
      }

      .music-player--small {
        border-bottom-width: 2px;
        width: 80%;
      }

      .quatuor__cards {
        margin-left: 6vw;

        figure {
          img {
            width: 12vw;
            height: 12vw;
          }
        }
      }

      .quatuor__symphony {
        position: absolute;
        width: 50%;
        bottom: -5vh;
      }

      .quatuor__complexe {
        width: 100%;

        h2 {
          transform: translate(2vw, 2vh);
        }

        & > div:last-child {
          padding-right: 0;
        }

        & > figure {
          margin-top: 5vh;
        }
      }

      &__containing-heartnote {
        margin-top: 10vh;

        h2 {
          transform: translateY(8vh);
          text-align: center;
        }
      }

      &__heartnote {
        & > div:first-child {
          padding-left: 44%;
          padding-right: 5%;
        }

        figure {
          width: 102vw;
          transform: translateX(-4vw) !important;
        }
      }
    }

    .turning {
      left: -6vw;
      width: 50vh;
      height: 50vh;
      top: 6vh;
      position: relative;
    }
  }
}
</style>
