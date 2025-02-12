<template>
  <div class="fixed bg">
    <AuroraBackground class="aurora-background bg-rose-950"></AuroraBackground>
  </div>
  <div
    class="adoptions desserts flex flex-col space-y-3 px-8 pb-8 pt-0 text-orange-100"
  >
    <h1 class="text-lg md:w-1/2 text-left m-auto">
      <img
        src="/desserts/banner.png"
        alt="Adoption de Nougat, Praline et Melba"
        class="banner md:w-[200px] rounded-xl mb-10 md:mb-4"
      />
      <div class="title">
        <span class="text-base md:text-2xl">
          <span class="font-normal uppercase">Spéciale Saint-Valentin : </span>
        </span>
        <br />

        <span class="font-bold">
          <TextHighlight
            :delay="320"
            text-end-color="hsl(var(--accent))"
            class="rounded-lg bg-gradient-to-r text-2xl md:text-7xl from-rose-500 to-yellow-900"
            >Trio de Desserts</TextHighlight
          ></span
        >
      </div>
    </h1>

    <div class="m-auto flex flex-col space-y-3 md:w-1/2 w-72">
      <div class="flex md:flex-row flex-col">
        <div class="md:basis-1/3 basis-full md:mr-10">
          <h2 class="text-left text-base mt-4">
            <span class="font-bold">Nougat</span>
          </h2>
          <p class="text-xs">Mâle adulte, 6 ans, né en 2019.</p>
          <div class="h-px bg-slate-400 mb-4"></div>
          <p class="text-xs min-h-24 flex flex-col items-start justify-around">
            <span class="inline-block">- Castré, identifié.</span>
            <span class="inline-block"
              >- <span class="font-semibold">Tempérament : </span>Craintif mais
              joueur. <br
            /></span>
            <span class="inline-block"
              >- <span class="font-semibold">Particularité : </span>Le plus
              expressif du trio avec ses yeux mélancoliques.</span
            >
          </p>
          <div class="h-px bg-slate-400 mt-4 mb-2"></div>
        </div>

        <div class="md:basis-1/3 basis-full md:mr-10">
          <h2 class="text-left text-base mt-4">
            <span class="font-bold">Praline</span>
          </h2>
          <p class="text-xs">Femelle adulte, 6 ans, née en 2019.</p>
          <div class="h-px bg-slate-400 mb-4"></div>
          <p class="text-xs min-h-24 flex flex-col items-start justify-around">
            <span class="inline-block">- Stérélisée, identifiée.</span>
            <span class="inline-block"
              >- <span class="font-semibold">Tempérament : </span> Curieuse et
              indépendante.
            </span>
            <span class="inline-block"
              >- <span class="font-semibold">Particularité : </span>La détective
              du groupe !</span
            >
          </p>
          <div class="h-px bg-slate-400 mt-4 mb-2"></div>
        </div>

        <div class="md:basis-1/3 basis-full">
          <h2 class="text-left text-base mt-4">
            <span class="font-bold">Melba</span>
          </h2>
          <p class="text-xs">Femelle adulte, 6 ans, née en 2019.</p>
          <div class="h-px bg-slate-400 mb-4"></div>
          <p class="text-xs min-h-24 flex flex-col items-start justify-around">
            <span class="inline-block">- Stérélisée, identifiée.</span>
            <span class="inline-block"
              >- <span class="font-semibold">Tempérament : </span> Timide et
              Observatrice.</span
            >
            <span class="inline-block"
              >- <span class="font-semibold">Particularité : </span>La plus
              délicate du trio.</span
            >
          </p>
          <div class="h-px bg-slate-400 mt-4 mb-2"></div>
        </div>
      </div>

      <div class="flex md:flex-row flex-col items-center w-100">
        <div class="md:basis-1/2 basis-full md:mr-10">
          <div class="">
            <h2 class="text-left text-xl mt-10 mb-6">
              <span class="font-bold">Une histoire de complicité :</span>
            </h2>
            <p class="text-sm">
              Ils sont arrivés ensemble au foyer, ces trois-là. <br />
              <span class="font-bold"
                >Une bande de chats sauvages qui s'est transformée en trio de
                desserts gourmands.</span
              >
              Chacun avec sa
              <span class="font-bold text-rose-900">
                <TextHighlight
                  :delay="640"
                  class="rounded-lg bg-gradient-to-r from-pink-200 to-orange-100"
                  >personnalité unique</TextHighlight
                ></span
              >, ils forment ensemble un assortiment parfait : Nougat avec sa
              douceur mélancolique, Praline et sa curiosité pétillante, et Melba
              avec sa timidité fondante.
            </p>
            <p class="text-sm mt-3">
              Dans le foyer, ils ont créé leur propre petit monde. On les voit
              souvent se retrouver dans leurs coins préférés, partageant des
              moments de jeux ou de repos. Bien que chacun ait son caractère
              bien trempé, leur lien est évident -
              <span class="font-bold text-rose-900">
                <TextHighlight
                  :delay="640"
                  class="rounded-lg bg-gradient-to-r from-pink-200 to-orange-100"
                  >une amitié</TextHighlight
                ></span
              >
              née dans leur vie sauvage et qui s'épanouit jour après jour dans
              la sécurité du foyer.
            </p>
          </div>
        </div>
        <div class="basis-1/2 ml-5 relative scale-125 top-[32px]">
          <img
            alt="Portrait de Nougat, Praline et Melba"
            src="/desserts/portrait.png"
          />
        </div>
      </div>

      <div class="w-100">
        <h2 class="text-left text-xl mt-10 mb-6">
          <span class="font-bold">Leur histoire individuelle :</span>
        </h2>

        <div
          class="flex md:flex-row flex-col items-center md:w-[90vw] relative md:left-[-20vw]"
        >
          <div class="md:basis-1/3 basis-full mb-10 md:mr-10 z-30 relative">
            <ClientOnly>
              <CardContainer>
                <CardBody
                  class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-rose-50 p-6 w-[80vw] md:w-full"
                >
                  <CardItem
                    :translate-z="50"
                    class="text-2xl uppercase font-bold text-rose-700"
                  >
                    Nougat<span class="text-lg font-bold">an</span>
                  </CardItem>
                  <CardItem
                    as="p"
                    translate-z="60"
                    class="max-w-sm mt-[-4px] text-base text-orange-700"
                  >
                    le Tendre Mélancolique
                  </CardItem>

                  <CardItem
                    :translate-z="20"
                    :translate-x="-40"
                    as="p"
                    class="rounded-xl my-5 bg-neutral-50 text-rose-800 font-serif px-4 py-2 text-sm w-full md:w-80"
                  >
                    Notre Nougatan est un chat plein de contrastes touchants.
                    <span class="font-bold font-serif"
                      >Ses yeux perpétuellement chagrinés</span
                    >
                    lui donnent un air de poète incompris,
                    <span class="font-bold font-serif"
                      >mais ne vous y trompez pas - c'est un véritable gourmet
                      qui s'anime</span
                    >
                    dès qu'il entend le bruit d'une boîte de pâtée ! Un fin
                    connaisseur qui choisit soigneusement ses coins douillets,
                    loin des regards indiscrets, pour savourer ses moments de
                    paix.
                    <span class="font-bold font-serif"
                      >Des yeux tristes mais un cœur joyeux</span
                    >, un air dépressif mais une énergie de chaton - c'est notre
                    Nougat !
                  </CardItem>

                  <CardItem
                    :translate-z="100"
                    :translate-y="20"
                    :translate-x="40"
                    :rotate-x="10"
                    :rotate-z="16"
                    class="mt-4 w-full"
                  >
                    <img
                      src="/desserts/nougat.png"
                      height="320"
                      width="320"
                      class="img-heart absolute rounded-xl object-cover"
                      alt="thumbnail"
                    />
                  </CardItem>

                  <CardItem
                    :translate-z="10"
                    :translate-x="20"
                    as="a"
                    href="https://www.lespetitsclochards.fr/adoptions?id=ZsYjOhEAACMAY3sS"
                    target="__blank"
                    class="rounded-xl px-4 py-2 text-xs font-normal text-rose-500 hover:underline decoration-wavy"
                  >
                    Sa fiche d'adoption →
                  </CardItem>
                </CardBody>
              </CardContainer>
            </ClientOnly>
          </div>

          <div class="md:basis-1/3 basis-full mb-10 md:mr-10 z-20 relative">
            <ClientOnly>
              <CardContainer>
                <CardBody
                  class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-rose-50 p-6 w-[80vw] md:w-full"
                >
                  <CardItem
                    :translate-z="50"
                    class="text-2xl uppercase font-bold text-rose-700"
                  >
                    Praline<span class="text-lg font-bold">tte</span>
                  </CardItem>
                  <CardItem
                    as="p"
                    translate-z="60"
                    class="max-w-sm mt-[-4px] text-base text-orange-700"
                  >
                    la Détective en Chef
                  </CardItem>

                  <CardItem
                    :translate-z="20"
                    :translate-x="-40"
                    as="p"
                    class="rounded-xl my-5 bg-neutral-50 text-rose-800 font-serif px-4 py-2 text-sm w-full md:w-80"
                  >
                    <span class="font-bold font-serif"
                      >Cette fine enquêtrice ne peut résister à un mystère
                      !</span
                    >
                    Un bruit suspect ? Elle sera la première sur place. Un
                    nouveau jouet ? Elle mènera l'enquête !
                    <span class="font-bold font-serif"
                      >Praline défie toute définition : la moins peureuse de nos
                      timides, la plus audacieuse de nos craintives.</span
                    >
                    Elle a ses règles : c'est ELLE qui décide si vous méritez
                    son attention. Un reniflage minutieux, un examen approfondi,
                    et peut-être, vous serez admis dans son cercle très select !
                  </CardItem>

                  <CardItem
                    :translate-z="100"
                    :translate-y="20"
                    :translate-x="40"
                    :rotate-x="10"
                    :rotate-z="16"
                    class="mt-4 w-full"
                  >
                    <img
                      src="/desserts/praline.png"
                      height="320"
                      width="320"
                      class="img-heart absolute rounded-xl object-cover"
                      alt="thumbnail"
                    />
                  </CardItem>

                  <CardItem
                    :translate-z="10"
                    :translate-x="20"
                    as="a"
                    href="https://www.lespetitsclochards.fr/adoptions?id=ZsYjZBEAACIAY3tU"
                    target="__blank"
                    class="rounded-xl text-xs font-normal text-rose-500 hover:underline decoration-wavy"
                  >
                    Sa fiche d'adoption →
                  </CardItem>
                </CardBody>
              </CardContainer>
            </ClientOnly>
          </div>

          <div class="md:basis-1/3 basis-full mb-10 md:mr-10 z-10 relative">
            <ClientOnly>
              <CardContainer>
                <CardBody
                  class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-rose-50 p-6 w-[80vw] md:w-full"
                >
                  <CardItem
                    :translate-z="50"
                    class="text-2xl uppercase font-bold text-rose-700"
                  >
                    Melba<span class="text-lg font-bold">nette</span>
                  </CardItem>
                  <CardItem
                    as="p"
                    translate-z="60"
                    class="max-w-sm mt-[-4px] text-base text-orange-700"
                  >
                    notre Dessert Glacé au Cœur Fondant
                  </CardItem>

                  <CardItem
                    :translate-z="20"
                    :translate-x="-40"
                    as="p"
                    class="rounded-xl my-5 bg-neutral-50 text-rose-800 font-serif px-4 py-2 text-sm w-full md:w-80"
                  >
                    Comme son dessert homonyme, Melba est un délicieux mélange
                    de saveurs :
                    <span class="font-bold font-serif"
                      >timide comme une pêche</span
                    >
                    qui se cache sous la glace,
                    <span class="font-bold font-serif"
                      >joueuse comme une framboise</span
                    >
                    qui pétille,
                    <span class="font-bold font-serif"
                      >calme comme une crème glacée</span
                    >
                    qui fond doucement. Sa curiosité l'emporte souvent sur sa
                    timidité, et
                    <span class="font-bold font-serif"
                      >on la surprend à observer le monde avec des yeux pleins
                      d'envie,</span
                    >
                    surtout quand elle est en compagnie de ses amis Praline ou
                    Nougat.
                  </CardItem>

                  <CardItem
                    :translate-z="100"
                    :translate-y="20"
                    :translate-x="40"
                    :rotate-x="10"
                    :rotate-z="16"
                    class="mt-4 w-full"
                  >
                    <img
                      src="/desserts/melba.png"
                      height="320"
                      width="320"
                      class="img-heart absolute rounded-xl object-cover"
                      alt="thumbnail"
                    />
                  </CardItem>

                  <div class="mt-10 flex items-center justify-between">
                    <CardItem
                      :translate-z="10"
                      :translate-x="20"
                      as="a"
                      href="https://www.lespetitsclochards.fr/adoptions?id=ZsYjlBEAACUAY3uf"
                      target="__blank"
                      class="rounded-xl px-4 py-2 text-xs font-normal text-rose-500 hover:underline decoration-wavy"
                    >
                      Sa fiche d'adoption →
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </ClientOnly>
          </div>
        </div>
      </div>

      <div
        class="adopt-reasons flex md:flex-row flex-col w-[80vw] relative left-[-16px] md:left-[-12vw] text-xs md:flex-wrap flex-nowrap"
      >
        <h2 class="basis-full text-center text-xl mt-10 md:mt-20 relative">
          <span class="font-bold"
            >"Mais pourquoi adopter un chat
            <span class="text-orange-700">
              <TextHighlight
                :delay="640"
                class="rounded-lg bg-gradient-to-r from-yellow-200 to-rose-300"
                >adulte, craintif</TextHighlight
              >
            </span>
            ?"
          </span>
        </h2>

        <p class="basis-full mb-2 relative text-center">
          Laissez-nous vous raconter pourquoi chacun de notre Bande de Desserts
          est un trésor unique :
        </p>

        <div class="basis-full flex md:flex-row flex-col">
          <div class="basis-1/2 md:p-4 flex justify-center items-center">
            <video
              src="/snoop-tagada/e00.mp4"
              class="w-auto h-[500px] m-auto"
              controls
            ></video>
          </div>

          <div class="basis-1/2 p-4 flex flex-col justify-between">
            <p class="flex flex-col my-2">
              <span class="inline-block font-bold">L'âge de la sagesse :</span>
              <span class="inline-block mx-2">
                - Ils ont déjà leurs repères
              </span>
              <span class="inline-bloc mx-2">
                - Plus de surprises de caractère - vous savez déjà qui ils sont
              </span>
              <span class="inline-block mx-2">
                - Fini les belles bêtises de chatons !
              </span>
              <span class="inline-block mx-2">
                - La maturité leur a appris la patience
              </span>
            </p>

            <p class="flex flex-col my-2">
              <span class="inline-block font-bold"
                >La magie des chats timides :</span
              >
              <span class="inline-block mx-2">
                - Chaque progrès est une victoire émouvante
              </span>
              <span class="inline-bloc mx-2">
                - Leur confiance, une fois gagnée, est inestimable
              </span>
              <span class="inline-block mx-2">
                - Leur gratitude se manifeste de façon unique
              </span>
              <span class="inline-block mx-2">
                - SLeur amour, plus discret, n'en est que plus précieux
              </span>
            </p>

            <p class="flex flex-col my-2">
              <span class="inline-block font-bold text-orange-700">
                <TextHighlight
                  :delay="640"
                  class="rounded-lg bg-gradient-to-r from-yellow-200 to-rose-300"
                  >Leur santé, suivie avec soin :</TextHighlight
                ></span
              >
              <span class="inline-block mx-2">
                - Déjà identifiés et stérilisées (castré pour Nougat)
              </span>
              <span class="inline-block mx-2">
                - Régulièrement déparasités et vermifugés
              </span>
              <span class="inline-block mx-2">
                - En bonne santé et propre
              </span>

              <span class="mt-2">
                Chez Les Petits Clochards, l'adoption responsable commence par
                nous : nous garantissons la santé et le bien-être de chaque
                chat, de son arrivée au foyer jusqu'à son départ vers sa famille
                pour la vie. Chaque adoption est précédée d'examens vétérinaires
                complets, et nous accompagnons ce processus :
                <span class="inline-block mx-2 mt-2">
                  - Vaccination à prévoir, avec notre aide*
                </span>
                <span class="inline-block mx-2">
                  - Bilan de santé complet avant adoption
                </span>
                <span class="inline-block mx-2">
                  - Conseils et suivi post-adoption
                </span>
              </span>

              <span class="inline-block mx-2 mt-4" style="font-size: 0.64rem">
                (*)Remboursement des soins de base à l'adoption.<br />
                L'association vous accompagne pour la vaccination.
              </span>
            </p>
          </div>
        </div>

        <div
          class="basis-full md:text-sm text-xs mt-2 text-center md:p-6 p-0 font-semibold"
          ref="textRef"
        >
          <TextGenerateEffect
            v-if="isVisible"
            :duration="1.2"
            words="Adopter l'un de nos desserts, c'est choisir une aventure différente, peut-être plus lente, mais infiniment enrichissante : telle que l'avait choisie l'adoptante de Rufus - ancien pensionnaire du foyer d'accueil (cf. vidéo ci-dessus). Comme lui, comme tous nos minous craintifs, notre trio a connu la vie sauvage avant de découvrir la douceur du foyer d'accueil. Ils savent mieux que quiconque la valeur d'un foyer aimant, et leur amour, une fois gagné, est comme la dégustation d'un dessert rare et précieux - une expérience d'une pureté incomparable."
          ></TextGenerateEffect>
        </div>
      </div>
      <div class="flex md:flex-row flex-col w-100">
        <div class="md:basis-1/2 basis-full md:mr-10 flex flex-col">
          <h2 class="font-normal text-xl mt-10 mb-2">
            Programme <span class="font-bold">Chat'Parrainage</span>
          </h2>

          <img
            alt="Réalité du Foyer d"
            class="mt-4"
            src="/desserts/chat-p.jpg"
          />
        </div>

        <div class="md:basis-1/2 basis-full md:mr-5 mt-12 flex flex-col">
          <h3 class="font-normal text-base text-center mt-10 mb-2 leading-none">
            <span class="font-bold">Soutenons notre trio</span>,<br />
            et les humains derrière eux !
          </h3>

          <div class="flex flex-col justofy-center items-center">
            <div class="text-sm mt-2">
              <a
                href="https://www.helloasso.com/associations/les-petits-clochards"
                target="_blank"
              >
                <Badge>Campagne Parrainage sur HelloAsso</Badge>
              </a>
            </div>

            <div class="text-sm mt-2">
              <a
                href="https://www.teaming.net/lespetitsclochards"
                target="_blank"
              >
                <Badge>Campagne Teaming (1€/mois)</Badge>
              </a>
            </div>
          </div>

          <h3 class="font-normal text-base text-center mt-10 mb-2 leading-none">
            Notre engagement <br /><span class="font-bold">envers vous :</span>
          </h3>

          <div class="text-sm mt-2 text-center">
            En devenant parrain/marraine, vous entrez dans notre famille
            élargie, et nous tenons à vous dire ce que cela signifie
            concrètement.

            <div
              class="flex flex-col justify-start text-left items-start pl-10 mt-4 text-xs md:text-sm mb-4"
            >
              <p class="mt2">✨ Photos et nouvelles régulières</p>
              <p class="mt2">
                ✨ Updates sur leur évolution en socialisation et/ou en accueil
                / adoption
              </p>
              <p class="mt2">
                ✨ Lien priviligié avec le foyer d'accueil des chats craintifs à
                Sainte-Geneviève-des-Bois (91)
              </p>
              <p class="mt2">✨ Pâtée gourmande spéciale Saint Valentin</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center w-100 text-center">
        <p class="mt-5 font-serif w-[80%]">
          <span class="font-bold"
            >Ensemble, nous écrivons une nouvelle page de leur histoire.</span
          >
          <br />
          Votre soutien nous permet de continuer notre mission auprès de ces
          chats qui ont tant à donner, même si leur chemin demande parfois plus
          de temps et de patience.
        </p>
      </div>

      <div class="flex md:flex-row flex-col w-100">
        <div
          class="md:basis-1/2 basis-full flex flex-col justify-center md:ml-10 md:mr-5"
        >
          <h3 class="font-bold text-xl mt-10 mb-2 text-center">
            Un mot du cœur :
          </h3>

          <div class="mt-5 basis-full flex flex-col justify-around text-center">
            <p class="text-sm font-serif">
              Par leur âge, leur timidité, leurs traumatismes, ils ne sont pas
              les plus démonstratifs. Pourtant, chacun possède une beauté
              unique, tant dans leur apparence que dans leur personnalité :
              Nougatan, une confiserie mélancoliquement garnie de noix de joie,
              Praline, une friandise coquine fourrée de curiosité, et Melba, une
              glace de présence timide et délicate, nappée d’observation vanille
            </p>

            <p class="text-sm font-serif mt-4">
              Devenir leur famille, parrain, marraine, c'est choisir de
              comprendre que parfois, les plus beaux cadeaux sont ceux qui
              prennent du temps à se dévoiler. Comme des desserts qui révèlent
              leurs saveurs doucement, nos trois compagnons n'attendent que la
              bonne personne pour partager leur délicieuse affection.
            </p>

            <p class="text-base font-serif font-bold text-center mt-4">
              <TextGenerateEffect
                v-if="isVisible"
                :duration="1.2"
                words="Cette Saint-Valentin, ou au cours de ce doux quotidien, choisiriez-vous devenir leur valentin - valentine ?"
              ></TextGenerateEffect>
            </p>
          </div>
        </div>
        <div
          class="md:basis-1/2 basis-full flex flex-col justify-between md:ml-10"
        >
          <div class="flex flex-col aligns-center items-center mb-4 mt-10">
            <h2 class="text-left text-xl">
              <span class="font-bold">Adoption ou Accueil :</span>
            </h2>

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
          <img
            alt="Notre Bande de Desserts"
            class="mt-4"
            src="/desserts/main-tendue.jpg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuroraBackground from "@/components/AuroraBackground.vue";
import TextGenerateEffect from "@/components/TextGenerateEffect.vue";
import TextHighlight from "@/components/TextHighlight.vue";
import CardContainer from "@/components/ThreeDeeCard/CardContainer.vue";
import CardBody from "@/components/ThreeDeeCard/CardBody.vue";
import CardItem from "@/components/ThreeDeeCard/CardItem.vue";
import { Badge } from "@/components/ui/badge";

import { ref, onMounted, onUnmounted } from "vue";

const emits = defineEmits(["animation-init-done"]);

const textRef = ref(null);
const isVisible = ref(false);

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      isVisible.value = true;
      // Optional: Disconnect observer after first appearance
      // observer.disconnect();
    }
  });
};

let observer;

onMounted(() => {
  observer = new IntersectionObserver(observerCallback, {
    // Adjust these options as needed
    threshold: 0.1, // Triggers when 10% of the element is visible
    rootMargin: "50px", // Adds 50px margin to trigger slightly before the element is in view
  });

  if (textRef.value) {
    observer.observe(textRef.value);
  }

  nextTick(() => emits("animation-init-done"));
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
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
      #fcd34d 10%,
      #fda4af 15%,
      #fecdd3 20%,
      #fda4af 25%,
      #fcd34d 30%
    );
  }
}

#__nuxt:has(.desserts) {
  footer {
    filter: invert(1);
  }
}

.adoptions.desserts {
  width: 100%;
  height: auto;
  padding-bottom: 16vh;
  overflow-y: scroll;
  overflow-x: hidden;

  @media screen and (max-width: 480px) {
    margin-bottom: 0;
  }

  h1 {
    position: relative;
    height: 100dvh;

    @media screen and (max-width: 480px) {
      height: unset;
    }

    .title {
      position: absolute;
      bottom: 12vh;
      right: 0;
      transform: rotate(-2.4deg);

      @media screen and (max-width: 480px) {
        bottom: -16px;
        transform: rotate(2.4deg);
      }
    }
  }

  .adopt-reasons {
    @media screen and (max-width: 320px) {
      transform: translateX(3.2vw);
      padding: 0 24px;
      width: 100vw;
    }
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;

    &.banner {
      transform: scale(1.2) translateY(24px);

      @media screen and (max-width: 480px) {
        width: 100vw;
        transform: scale(1.4) translateY(24px);
      }
    }

    &.img-heart {
      position: absolute;
      bottom: -160px;
      right: -160px;
      height: 480px;
      width: auto;

      @media screen and (max-width: 480px) {
        height: 320px;
        width: auto;
        bottom: -100px;
        right: -80px;
      }
    }
  }
}
</style>
